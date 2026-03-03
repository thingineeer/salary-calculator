'use client';

import { getSalaryPercentile } from '@/lib/percentile';

interface Props {
  annualSalary: number;
}

export default function SalaryPercentile({ annualSalary }: Props) {
  if (annualSalary < 10_000_000) return null;

  const percentile = getSalaryPercentile(annualSalary);
  const barWidth = Math.max(2, Math.min(98, 100 - percentile));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
        나의 연봉 위치
      </h3>
      <div className="text-center mb-3">
        <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
          상위 {percentile}%
        </span>
        <p className="text-xs text-gray-400 mt-1">
          전체 근로자 기준 (통계청 임금구조 기본통계 참고)
        </p>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
          style={{ width: `${barWidth}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>하위</span>
        <span>상위</span>
      </div>
    </div>
  );
}
