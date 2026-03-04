'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HISTORICAL_RATES } from '@/lib/exchange-rates';

// HISTORICAL_RATES에서 최근 12개 포인트 추출
function buildChartData() {
  const points: { month: string; rate: number }[] = [];
  const years = Object.keys(HISTORICAL_RATES).map(Number).sort();

  for (const year of years) {
    const months = Object.keys(HISTORICAL_RATES[year.toString()])
      .map(Number)
      .sort((a, b) => a - b);
    for (const month of months) {
      points.push({
        month: `${year}.${String(month).padStart(2, '0')}`,
        rate: HISTORICAL_RATES[year.toString()][month.toString()],
      });
    }
  }

  // 최근 12개만 반환
  return points.slice(-12);
}

const exchangeData = buildChartData();

export default function ExchangeRateChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        최근 환율 추이 (KRW/USD)
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={exchangeData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#d1d5db"
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            stroke="#d1d5db"
            domain={['dataMin - 20', 'dataMax + 20']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value) => `${value}원`}
            labelStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#3b82f6"
            dot={{ fill: '#3b82f6', r: 5 }}
            activeDot={{ r: 7 }}
            strokeWidth={2}
            name="환율 (원/달러)"
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        과거 데이터 기반 추이 (실제 환율과 다를 수 있습니다)
      </p>
    </div>
  );
}
