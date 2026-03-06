'use client';

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { HISTORICAL_RATES } from '@/lib/exchange-rates';

// 시간프레임 정의
const TIMEFRAMES = [
  { key: '1M', label: '1개월' },
  { key: '6M', label: '6개월' },
  { key: '1Y', label: '1년' },
  { key: 'ALL', label: '전체' },
] as const;

type TimeframeKey = (typeof TIMEFRAMES)[number]['key'];

interface ChartDataPoint {
  label: string;
  rate: number;
}

// 전체 월별 데이터를 시간순으로 정렬하여 추출
function getAllMonthlyPoints(): { year: number; month: number; rate: number }[] {
  const points: { year: number; month: number; rate: number }[] = [];
  const years = Object.keys(HISTORICAL_RATES).map(Number).sort();

  for (const year of years) {
    const months = Object.keys(HISTORICAL_RATES[year.toString()])
      .map(Number)
      .sort((a, b) => a - b);
    for (const month of months) {
      points.push({
        year,
        month,
        rate: HISTORICAL_RATES[year.toString()][month.toString()],
      });
    }
  }

  return points;
}

// 1개월: 최근 2개 월 데이터 사이를 30일로 선형 보간
function build1MData(
  allPoints: { year: number; month: number; rate: number }[]
): ChartDataPoint[] {
  if (allPoints.length < 2) return [];

  const last = allPoints[allPoints.length - 1];
  const prev = allPoints[allPoints.length - 2];

  const startRate = prev.rate;
  const endRate = last.rate;
  const totalDays = 30;

  // 시작 날짜 계산 (이전 달의 1일부터 현재 달의 마지막 날짜)
  const startMonth = prev.month;
  const startYear = prev.year;

  const result: ChartDataPoint[] = [];

  for (let d = 0; d <= totalDays; d++) {
    const progress = d / totalDays;
    // 약간의 자연스러운 곡선을 위해 사인 보간 적용
    const smoothProgress =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const rate = Math.round(startRate + (endRate - startRate) * smoothProgress);

    // 날짜 라벨 생성
    const date = new Date(startYear, startMonth - 1, 1);
    date.setDate(date.getDate() + d);
    const label = `${date.getMonth() + 1}/${date.getDate()}`;

    // 3일 간격으로 데이터 포인트 생성 (너무 많으면 차트가 복잡)
    if (d % 3 === 0 || d === totalDays) {
      result.push({ label, rate });
    }
  }

  return result;
}

// 6개월: 최근 6개 월별 포인트
function build6MData(
  allPoints: { year: number; month: number; rate: number }[]
): ChartDataPoint[] {
  const sliced = allPoints.slice(-6);
  return sliced.map((p) => ({
    label: `${p.year}.${String(p.month).padStart(2, '0')}`,
    rate: p.rate,
  }));
}

// 1년: 최근 12개 월별 포인트
function build1YData(
  allPoints: { year: number; month: number; rate: number }[]
): ChartDataPoint[] {
  const sliced = allPoints.slice(-12);
  return sliced.map((p) => ({
    label: `${p.year}.${String(p.month).padStart(2, '0')}`,
    rate: p.rate,
  }));
}

// 전체: 연 평균으로 집계
function buildAllData(): ChartDataPoint[] {
  const years = Object.keys(HISTORICAL_RATES)
    .map(Number)
    .sort();

  return years.map((year) => {
    const yearData = HISTORICAL_RATES[year.toString()];
    const monthValues = Object.values(yearData) as number[];
    const avg = Math.round(
      monthValues.reduce((sum, v) => sum + v, 0) / monthValues.length
    );
    return { label: `${year}`, rate: avg };
  });
}

// timeframe에 따라 Y축 domain 패딩 결정
function getYAxisPadding(timeframe: TimeframeKey): number {
  switch (timeframe) {
    case '1M':
      return 5;
    case '6M':
      return 10;
    case '1Y':
      return 20;
    case 'ALL':
      return 50;
  }
}

// 차트 데이터 빌드
function buildChartData(timeframe: TimeframeKey): ChartDataPoint[] {
  const allPoints = getAllMonthlyPoints();

  switch (timeframe) {
    case '1M':
      return build1MData(allPoints);
    case '6M':
      return build6MData(allPoints);
    case '1Y':
      return build1YData(allPoints);
    case 'ALL':
      return buildAllData();
  }
}

export default function ExchangeRateChart() {
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeKey>('1Y');

  const chartData = useMemo(
    () => buildChartData(activeTimeframe),
    [activeTimeframe]
  );

  const yAxisPadding = getYAxisPadding(activeTimeframe);

  // 변동률 계산
  const rateChange = useMemo(() => {
    if (chartData.length < 2) return null;
    const first = chartData[0].rate;
    const last = chartData[chartData.length - 1].rate;
    const diff = last - first;
    const pct = ((diff / first) * 100).toFixed(1);
    return { diff, pct, isUp: diff > 0 };
  }, [chartData]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            환율 추이 (KRW/USD)
          </h3>
          {rateChange && (
            <p className="text-sm mt-0.5">
              <span className="text-gray-500 dark:text-gray-400">
                기간 변동{' '}
              </span>
              <span
                className={
                  rateChange.isUp
                    ? 'text-red-500 dark:text-red-400 font-medium'
                    : 'text-blue-500 dark:text-blue-400 font-medium'
                }
              >
                {rateChange.isUp ? '+' : ''}
                {rateChange.diff}원 ({rateChange.isUp ? '+' : ''}
                {rateChange.pct}%)
              </span>
            </p>
          )}
        </div>

        {/* 시간프레임 탭 */}
        <div
          className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1"
          role="tablist"
          aria-label="환율 차트 시간프레임 선택"
        >
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.key}
              role="tab"
              aria-selected={activeTimeframe === tf.key}
              onClick={() => setActiveTimeframe(tf.key)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
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

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:opacity-20"
          />
          <XAxis
            dataKey="label"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#d1d5db"
            interval={activeTimeframe === '1M' ? 1 : 'preserveStartEnd'}
            angle={activeTimeframe === 'ALL' ? -45 : 0}
            textAnchor={activeTimeframe === 'ALL' ? 'end' : 'middle'}
            height={activeTimeframe === 'ALL' ? 50 : 30}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#d1d5db"
            domain={[
              (dataMin: number) => Math.floor((dataMin - yAxisPadding) / 10) * 10,
              (dataMax: number) => Math.ceil((dataMax + yAxisPadding) / 10) * 10,
            ]}
            tickFormatter={(value: number) =>
              value.toLocaleString('ko-KR')
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value) => [
              `${Number(value).toLocaleString('ko-KR')}원`,
              '환율',
            ]}
            labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#3b82f6"
            dot={
              activeTimeframe === '1M'
                ? false
                : { fill: '#3b82f6', r: activeTimeframe === 'ALL' ? 4 : 5 }
            }
            activeDot={{ r: 7 }}
            strokeWidth={2}
            name="환율 (원/달러)"
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {activeTimeframe === '1M'
          ? '최근 1개월 추정 추이 (월별 데이터 기반 보간)'
          : activeTimeframe === 'ALL'
            ? '2015~2026년 연 평균 환율 (과거 데이터 기반)'
            : '과거 데이터 기반 추이 (실제 환율과 다를 수 있습니다)'}
      </p>
    </div>
  );
}
