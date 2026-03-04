'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 샘플 환율 데이터 (최근 12개월)
const exchangeData = [
  { month: '2024.03', rate: 1200 },
  { month: '2024.06', rate: 1210 },
  { month: '2024.09', rate: 1240 },
  { month: '2024.12', rate: 1310 },
  { month: '2025.01', rate: 1330 },
  { month: '2025.02', rate: 1350 },
  { month: '2025.03', rate: 1380 },
  { month: '2025.06', rate: 1365 },
  { month: '2025.09', rate: 1390 },
  { month: '2025.12', rate: 1410 },
  { month: '2026.01', rate: 1395 },
  { month: '2026.03', rate: 1380 },
];

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
