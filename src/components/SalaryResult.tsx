'use client';

import { SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { formatNumber } from '@/lib/format';

interface Props {
  result: SalaryResultType;
}

export default function SalaryResult({ result }: Props) {
  const insuranceItems = [
    { label: '국민연금', value: result.nationalPension, color: 'text-blue-600 dark:text-blue-400' },
    { label: '건강보험', value: result.healthInsurance, color: 'text-green-600 dark:text-green-400' },
    { label: '장기요양보험', value: result.longTermCare, color: 'text-teal-600 dark:text-teal-400' },
    { label: '고용보험', value: result.employmentInsurance, color: 'text-purple-600 dark:text-purple-400' },
  ];

  const taxItems = [
    { label: '소득세', value: result.incomeTax, color: 'text-orange-600 dark:text-orange-400' },
    { label: '지방소득세', value: result.localIncomeTax, color: 'text-red-600 dark:text-red-400' },
  ];

  const insuranceSubtotal = result.nationalPension + result.healthInsurance + result.longTermCare + result.employmentInsurance;
  const taxSubtotal = result.incomeTax + result.localIncomeTax;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-5 card-hover" aria-label="급여 계산 결과" role="region">
      {/* 실수령액 */}
      <div className="text-center py-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl" aria-live="polite">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          월 실수령액
        </p>
        <p className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-300 tabular-nums value-transition">
          {formatNumber(result.netSalary)}
          <span className="text-lg font-normal ml-1">{'\u00A0'}원</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          연간 약 {formatNumber(Math.round(result.netSalary * 12 / 10000))}만원
        </p>
        <p className="text-xs text-gray-400 mt-2">
          세전 월급 {formatNumber(result.monthlySalary)}{'\u00A0'}원 · 실효세율{' '}
          {result.effectiveTaxRate}%
        </p>
      </div>

      {/* 공제 내역 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
          공제 내역
        </h3>

        {/* 4대보험 그룹 */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">4대보험</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
              -{formatNumber(insuranceSubtotal)}{'\u00A0'}원
            </span>
          </div>
          <ul className="space-y-1.5 pl-3 border-l-2 border-gray-200 dark:border-gray-600">
            {insuranceItems.map((item) => (
              <li key={item.label} className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.label}
                </span>
                <span className={`text-xs tabular-nums ${item.color}`}>
                  -{formatNumber(item.value)}{'\u00A0'}원
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 세금 그룹 */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">세금</span>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 tabular-nums">
              -{formatNumber(taxSubtotal)}{'\u00A0'}원
            </span>
          </div>
          <ul className="space-y-1.5 pl-3 border-l-2 border-gray-200 dark:border-gray-600">
            {taxItems.map((item) => (
              <li key={item.label} className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.label}
                </span>
                <span className={`text-xs tabular-nums ${item.color}`}>
                  -{formatNumber(item.value)}{'\u00A0'}원
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            공제 합계
          </span>
          <span className="text-base font-bold text-red-600 dark:text-red-400 tabular-nums">
            -{formatNumber(result.totalDeduction)}{'\u00A0'}원
          </span>
        </div>
      </div>
    </div>
  );
}
