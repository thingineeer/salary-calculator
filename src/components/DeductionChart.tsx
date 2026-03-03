'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { SalaryResult } from '@/lib/salary-calculator';
import { formatNumber } from '@/lib/format';

interface Props {
  result: SalaryResult;
}

const COLORS = ['#3B82F6', '#10B981', '#14B8A6', '#8B5CF6', '#F97316', '#EF4444'];

const LABELS = [
  '국민연금',
  '건강보험',
  '장기요양보험',
  '고용보험',
  '소득세',
  '지방소득세',
];

export default function DeductionChart({ result }: Props) {
  const data = [
    { name: '국민연금', value: result.nationalPension },
    { name: '건강보험', value: result.healthInsurance },
    { name: '장기요양보험', value: result.longTermCare },
    { name: '고용보험', value: result.employmentInsurance },
    { name: '소득세', value: result.incomeTax },
    { name: '지방소득세', value: result.localIncomeTax },
  ].filter((d) => d.value > 0);

  if (data.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4 text-center">
        공제 항목 비율
      </h3>
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={COLORS[LABELS.indexOf(data[idx].name)] ?? COLORS[0]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | undefined) =>
                value !== undefined ? `${formatNumber(value)}원` : ''
              }
              contentStyle={{
                borderRadius: '8px',
                fontSize: '13px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
        {data.map((d, idx) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[LABELS.indexOf(d.name)] ?? COLORS[0] }}
            />
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}
