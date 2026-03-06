import { NextRequest, NextResponse } from 'next/server';

interface RateData {
  rates: Record<string, number>;
  high: { rate: number; date: string };
  low: { rate: number; date: string };
  latest: { rate: number; date: string };
  change: { diff: number; pct: string };
}

interface CacheEntry {
  data: RateData;
  timestamp: number;
}

// 기간별 캐시 (메모리)
const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6시간

function getDateRange(period: string): { start: string; end: string } {
  const now = new Date();
  const end = now.toISOString().split('T')[0];

  switch (period) {
    case '1M': {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 1);
      return { start: d.toISOString().split('T')[0], end };
    }
    case '3M': {
      const d = new Date(now);
      d.setMonth(d.getMonth() - 3);
      return { start: d.toISOString().split('T')[0], end };
    }
    case '1Y': {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      return { start: d.toISOString().split('T')[0], end };
    }
    case '3Y': {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 3);
      return { start: d.toISOString().split('T')[0], end };
    }
    case '5Y': {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 5);
      return { start: d.toISOString().split('T')[0], end };
    }
    default: {
      const d = new Date(now);
      d.setFullYear(d.getFullYear() - 1);
      return { start: d.toISOString().split('T')[0], end };
    }
  }
}

function buildRateData(rawRates: Record<string, Record<string, number>>): RateData {
  const rates: Record<string, number> = {};
  let highRate = -Infinity, highDate = '';
  let lowRate = Infinity, lowDate = '';

  for (const [date, currencies] of Object.entries(rawRates)) {
    const krw = currencies.KRW;
    if (!krw) continue;
    const rounded = Math.round(krw * 100) / 100;
    rates[date] = rounded;

    if (rounded > highRate) {
      highRate = rounded;
      highDate = date;
    }
    if (rounded < lowRate) {
      lowRate = rounded;
      lowDate = date;
    }
  }

  const sortedDates = Object.keys(rates).sort();
  const firstRate = rates[sortedDates[0]];
  const lastRate = rates[sortedDates[sortedDates.length - 1]];
  const lastDate = sortedDates[sortedDates.length - 1];
  const diff = Math.round((lastRate - firstRate) * 100) / 100;
  const pct = firstRate > 0 ? ((diff / firstRate) * 100).toFixed(2) : '0';

  return {
    rates,
    high: { rate: highRate, date: highDate },
    low: { rate: lowRate, date: lowDate },
    latest: { rate: lastRate, date: lastDate },
    change: { diff, pct },
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '1Y';

  if (!['1M', '3M', '1Y', '3Y', '5Y'].includes(period)) {
    return NextResponse.json({ error: 'Invalid period. Use: 1M, 3M, 1Y, 3Y, 5Y' }, { status: 400 });
  }

  // 캐시 확인
  const cached = cache.get(period);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json({ ...cached.data, period, source: 'cache' });
  }

  try {
    const { start, end } = getDateRange(period);

    const response = await fetch(
      `https://api.frankfurter.dev/v1/${start}..${end}?from=USD&to=KRW`,
      { next: { revalidate: 21600 } }
    );

    if (!response.ok) {
      throw new Error(`Frankfurter API error: ${response.status}`);
    }

    const data = await response.json();
    const rateData = buildRateData(data.rates);

    // 캐시 저장
    cache.set(period, { data: rateData, timestamp: Date.now() });

    return NextResponse.json({ ...rateData, period, source: 'api' });
  } catch (error) {
    console.warn(
      '환율 히스토리 API 실패:',
      error instanceof Error ? error.message : error
    );

    if (cached) {
      return NextResponse.json({ ...cached.data, period, source: 'stale-cache' });
    }

    return NextResponse.json(
      { error: 'Failed to fetch historical rates', period },
      { status: 500 }
    );
  }
}
