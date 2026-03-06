'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from 'recharts';

// 시간프레임 정의 (네이버 금융 스타일)
const TIMEFRAMES = [
  { key: '1M', label: '1개월' },
  { key: '3M', label: '3개월' },
  { key: '1Y', label: '1년' },
  { key: '3Y', label: '3년' },
  { key: '5Y', label: '5년' },
] as const;

type TimeframeKey = (typeof TIMEFRAMES)[number]['key'];

interface ChartDataPoint {
  date: string;
  label: string;
  rate: number;
}

interface HighLow {
  rate: number;
  date: string;
}

interface ApiResponse {
  rates: Record<string, number>;
  high: HighLow;
  low: HighLow;
  latest: { rate: number; date: string };
  change: { diff: number; pct: string };
  period: string;
  source: 'naver' | 'ecb' | 'ecb-fallback' | 'cache' | 'stale-cache' | string;
}

// API 응답 → 차트 데이터 변환
function apiDataToChart(
  rates: Record<string, number>,
  timeframe: TimeframeKey
): ChartDataPoint[] {
  const entries = Object.entries(rates).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length === 0) return [];

  // 기간별 샘플링 간격 결정
  let step: number;
  switch (timeframe) {
    case '1M': step = 1; break;          // 매일
    case '3M': step = Math.max(1, Math.floor(entries.length / 60)); break;  // ~60 포인트
    case '1Y': step = Math.max(1, Math.floor(entries.length / 52)); break;  // 주간 ~52 포인트
    case '3Y': step = Math.max(1, Math.floor(entries.length / 78)); break;  // 2주간 ~78 포인트
    case '5Y': step = Math.max(1, Math.floor(entries.length / 100)); break; // ~100 포인트
    default: step = 1;
  }

  const sampled: ChartDataPoint[] = [];
  for (let i = 0; i < entries.length; i += step) {
    const [date, rate] = entries[i];
    sampled.push({
      date,
      label: formatDateLabel(date, timeframe),
      rate,
    });
  }

  // 마지막 포인트 항상 포함
  const lastEntry = entries[entries.length - 1];
  if (sampled[sampled.length - 1]?.date !== lastEntry[0]) {
    sampled.push({
      date: lastEntry[0],
      label: formatDateLabel(lastEntry[0], timeframe),
      rate: lastEntry[1],
    });
  }

  return sampled;
}

function formatDateLabel(date: string, timeframe: TimeframeKey): string {
  const parts = date.split('-');
  const mm = parts[1];
  const dd = parts[2];

  switch (timeframe) {
    case '1M':
      return `${parseInt(mm)}/${parseInt(dd)}`;
    case '3M':
      return `${parseInt(mm)}/${parseInt(dd)}`;
    case '1Y':
      return `${parts[0].slice(2)}/${mm}`;
    case '3Y':
    case '5Y':
      return `${parts[0].slice(2)}/${mm}`;
    default:
      return `${mm}/${dd}`;
  }
}

function formatShortDate(date: string): string {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function ExchangeRateChart() {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeKey>('1Y');
  const [apiCache, setApiCache] = useState<Record<string, ApiResponse>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const fetchData = useCallback(async (tf: TimeframeKey) => {
    if (apiCache[tf]) return;

    setLoading((prev) => ({ ...prev, [tf]: true }));
    try {
      const res = await fetch(`/api/exchange-rate/history?period=${tf}`);
      if (!res.ok) throw new Error('API error');
      const json: ApiResponse = await res.json();
      setApiCache((prev) => ({ ...prev, [tf]: json }));
    } catch {
      // 실패 시 무시 - 로딩 상태만 해제
    } finally {
      setLoading((prev) => ({ ...prev, [tf]: false }));
    }
  }, [apiCache]);

  useEffect(() => {
    fetchData(activeTimeframe);
  }, [activeTimeframe, fetchData]);

  const apiData = apiCache[activeTimeframe];
  const isLoading = loading[activeTimeframe] && !apiData;

  const chartData = useMemo(() => {
    if (!apiData?.rates) return [];
    return apiDataToChart(apiData.rates, activeTimeframe);
  }, [apiData, activeTimeframe]);

  // 차트에서 최고/최저 포인트의 label 찾기
  const highLowLabels = useMemo(() => {
    if (!apiData) return null;
    const highPoint = chartData.find((p) => p.date === apiData.high.date);
    const lowPoint = chartData.find((p) => p.date === apiData.low.date);

    // 정확히 일치하는 포인트가 없으면 가장 가까운 포인트 찾기
    const findClosest = (targetDate: string) => {
      let closest = chartData[0];
      let minDiff = Infinity;
      for (const p of chartData) {
        const diff = Math.abs(new Date(p.date).getTime() - new Date(targetDate).getTime());
        if (diff < minDiff) {
          minDiff = diff;
          closest = p;
        }
      }
      return closest;
    };

    return {
      high: highPoint || findClosest(apiData.high.date),
      low: lowPoint || findClosest(apiData.low.date),
    };
  }, [chartData, apiData]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 space-y-4">
      {/* 헤더: 현재가 + 변동 */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            환율 추이 (USD/KRW)
          </h3>
          {apiData && (
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                {apiData.latest.rate.toLocaleString('ko-KR')}원
              </span>
              <span
                className={`text-sm font-medium ${
                  apiData.change.diff > 0
                    ? 'text-red-500 dark:text-red-400'
                    : apiData.change.diff < 0
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-gray-500'
                }`}
              >
                {apiData.change.diff > 0 ? '+' : ''}
                {apiData.change.diff}원 ({apiData.change.diff > 0 ? '+' : ''}
                {apiData.change.pct}%)
              </span>
            </div>
          )}
          {/* 최고/최저 요약 */}
          {apiData && (
            <div className="flex gap-4 mt-1.5 text-xs">
              <span className="text-red-500 dark:text-red-400">
                최고 {apiData.high.rate.toLocaleString('ko-KR')}원
                <span className="text-gray-400 dark:text-gray-500 ml-1">
                  ({formatShortDate(apiData.high.date)})
                </span>
              </span>
              <span className="text-blue-500 dark:text-blue-400">
                최저 {apiData.low.rate.toLocaleString('ko-KR')}원
                <span className="text-gray-400 dark:text-gray-500 ml-1">
                  ({formatShortDate(apiData.low.date)})
                </span>
              </span>
            </div>
          )}
        </div>

        {/* 시간프레임 탭 */}
        <div
          className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1"
          role="tablist"
          aria-label="환율 차트 기간 선택"
        >
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.key}
              role="tab"
              aria-selected={activeTimeframe === tf.key}
              onClick={() => setActiveTimeframe(tf.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 ${
                activeTimeframe === tf.key
                  ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* 차트 */}
      {isLoading ? (
        <div className="h-[350px] flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500 text-sm animate-pulse">
            환율 데이터를 불러오는 중...
          </div>
        </div>
      ) : chartData.length > 0 && apiData ? (
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={chartData}
            margin={{ top: 15, right: 10, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              className="dark:opacity-20"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              stroke="#d1d5db"
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 11 }}
              stroke="#d1d5db"
              tickLine={false}
              axisLine={false}
              domain={[
                (dataMin: number) => Math.floor((dataMin - 15) / 10) * 10,
                (dataMax: number) => Math.ceil((dataMax + 15) / 10) * 10,
              ]}
              tickFormatter={(v: number) => v.toLocaleString('ko-KR')}
              width={55}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
              }}
              formatter={(value) => [
                `${Number(value).toLocaleString('ko-KR')}원`,
                'USD/KRW',
              ]}
              labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
            />

            {/* 최고점 수평 점선 */}
            <ReferenceLine
              y={apiData.high.rate}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
            />
            {/* 최저점 수평 점선 */}
            <ReferenceLine
              y={apiData.low.rate}
              stroke="#3b82f6"
              strokeDasharray="4 4"
              strokeOpacity={0.5}
            />

            <Area
              type="monotone"
              dataKey="rate"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#rateGradient)"
              animationDuration={500}
              dot={false}
              activeDot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
            />

            {/* 최고점 마커 */}
            {highLowLabels?.high && (
              <ReferenceDot
                x={highLowLabels.high.label}
                y={apiData.high.rate}
                r={5}
                fill="#ef4444"
                stroke="#fff"
                strokeWidth={2}
                label={{
                  value: `최고 ${apiData.high.rate.toLocaleString('ko-KR')}`,
                  position: 'top',
                  fill: '#ef4444',
                  fontSize: 11,
                  fontWeight: 600,
                  offset: 10,
                }}
              />
            )}

            {/* 최저점 마커 */}
            {highLowLabels?.low && (
              <ReferenceDot
                x={highLowLabels.low.label}
                y={apiData.low.rate}
                r={5}
                fill="#3b82f6"
                stroke="#fff"
                strokeWidth={2}
                label={{
                  value: `최저 ${apiData.low.rate.toLocaleString('ko-KR')}`,
                  position: 'bottom',
                  fill: '#3b82f6',
                  fontSize: 11,
                  fontWeight: 600,
                  offset: 10,
                }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[350px] flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-500 text-sm">
            데이터를 불러올 수 없습니다
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        {apiData?.source === 'naver' || apiData?.source === 'cache'
          ? '하나은행 매매기준율 기준 · 장중 고가/저가와 차이가 있을 수 있습니다'
          : 'ECB(유럽중앙은행) 기준 환율 · 한국 시장 고시환율과 소폭 차이가 있을 수 있습니다'}
      </p>
    </div>
  );
}
