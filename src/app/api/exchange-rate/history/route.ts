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

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 3 * 60 * 60 * 1000; // 3시간

// 기간별 필요 페이지 수 (한 페이지 = 10일, 영업일 기준)
function getPageCount(period: string): number {
  switch (period) {
    case '1M': return 3;    // ~22 영업일
    case '3M': return 7;    // ~65 영업일
    case '1Y': return 26;   // ~252 영업일
    case '3Y': return 78;   // ~756 영업일
    case '5Y': return 130;  // ~1260 영업일
    default: return 26;
  }
}

// 네이버 금융 일별 시세 파싱
async function fetchNaverRates(pages: number): Promise<Record<string, number>> {
  const rates: Record<string, number> = {};

  // 병렬 요청 (5페이지씩 배치)
  const batchSize = 5;
  for (let batch = 0; batch < pages; batch += batchSize) {
    const promises = [];
    for (let p = batch + 1; p <= Math.min(batch + batchSize, pages); p++) {
      promises.push(fetchNaverPage(p));
    }

    const results = await Promise.all(promises);
    for (const pageRates of results) {
      for (const [date, rate] of Object.entries(pageRates)) {
        rates[date] = rate;
      }
    }
  }

  return rates;
}

async function fetchNaverPage(page: number): Promise<Record<string, number>> {
  const rates: Record<string, number> = {};

  try {
    const url = `https://finance.naver.com/marketindex/exchangeDailyQuote.naver?marketindexCd=FX_USDKRW&page=${page}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SalaryCalcBot/1.0)' },
      next: { revalidate: 10800 },
    });

    if (!res.ok) return rates;

    const buffer = await res.arrayBuffer();
    const decoder = new TextDecoder('euc-kr');
    const html = decoder.decode(buffer);

    // 날짜 + 매매기준율 추출
    const rowRegex = /class="date">([\d.]+)<\/td>[\s\S]*?class="num">([\d,.]+)<\/td>/g;
    let match;
    while ((match = rowRegex.exec(html)) !== null) {
      const dateStr = match[1]; // "2026.03.06"
      const rateStr = match[2]; // "1,472.00"
      const rate = parseFloat(rateStr.replace(/,/g, ''));
      if (!isNaN(rate) && dateStr) {
        // "2026.03.06" → "2026-03-06"
        const isoDate = dateStr.replace(/\./g, '-');
        rates[isoDate] = rate;
      }
    }
  } catch {
    // 개별 페이지 실패 무시
  }

  return rates;
}

// Frankfurter API 폴백
async function fetchFrankfurterRates(period: string): Promise<Record<string, number>> {
  const now = new Date();
  const end = now.toISOString().split('T')[0];
  let start: Date;

  switch (period) {
    case '1M': start = new Date(now); start.setMonth(start.getMonth() - 1); break;
    case '3M': start = new Date(now); start.setMonth(start.getMonth() - 3); break;
    case '1Y': start = new Date(now); start.setFullYear(start.getFullYear() - 1); break;
    case '3Y': start = new Date(now); start.setFullYear(start.getFullYear() - 3); break;
    case '5Y': start = new Date(now); start.setFullYear(start.getFullYear() - 5); break;
    default: start = new Date(now); start.setFullYear(start.getFullYear() - 1);
  }

  const res = await fetch(
    `https://api.frankfurter.dev/v1/${start.toISOString().split('T')[0]}..${end}?from=USD&to=KRW`,
    { next: { revalidate: 21600 } }
  );

  if (!res.ok) throw new Error(`Frankfurter error: ${res.status}`);

  const data = await res.json();
  const rates: Record<string, number> = {};
  for (const [date, currencies] of Object.entries(data.rates)) {
    const krw = (currencies as Record<string, number>).KRW;
    if (krw) rates[date] = Math.round(krw * 100) / 100;
  }
  return rates;
}

function buildRateData(rates: Record<string, number>): RateData {
  let highRate = -Infinity, highDate = '';
  let lowRate = Infinity, lowDate = '';

  for (const [date, rate] of Object.entries(rates)) {
    if (rate > highRate) { highRate = rate; highDate = date; }
    if (rate < lowRate) { lowRate = rate; lowDate = date; }
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
    return NextResponse.json({ error: 'Invalid period' }, { status: 400 });
  }

  // 캐시 확인
  const cached = cache.get(period);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json({ ...cached.data, period, source: 'cache' });
  }

  try {
    // 1차: 네이버 금융 (한국 고시환율)
    const pages = getPageCount(period);
    const rates = await fetchNaverRates(pages);

    if (Object.keys(rates).length >= 5) {
      const rateData = buildRateData(rates);
      cache.set(period, { data: rateData, timestamp: Date.now() });
      return NextResponse.json({ ...rateData, period, source: 'naver' });
    }

    // 2차 폴백: Frankfurter API (ECB)
    const fallbackRates = await fetchFrankfurterRates(period);
    const rateData = buildRateData(fallbackRates);
    cache.set(period, { data: rateData, timestamp: Date.now() });
    return NextResponse.json({ ...rateData, period, source: 'ecb' });
  } catch (error) {
    console.warn('환율 히스토리 API 실패:', error instanceof Error ? error.message : error);

    // 3차 폴백: Frankfurter
    try {
      const fallbackRates = await fetchFrankfurterRates(period);
      const rateData = buildRateData(fallbackRates);
      cache.set(period, { data: rateData, timestamp: Date.now() });
      return NextResponse.json({ ...rateData, period, source: 'ecb-fallback' });
    } catch {
      if (cached) {
        return NextResponse.json({ ...cached.data, period, source: 'stale-cache' });
      }
      return NextResponse.json({ error: 'Failed to fetch rates', period }, { status: 500 });
    }
  }
}
