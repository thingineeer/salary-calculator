'use client';

import { SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { formatNumber } from '@/lib/format';

interface DollarResultProps {
  salaryResult: SalaryResultType;
  currentRate: number;
  pastRate: number;
}

export default function DollarResult({
  salaryResult,
  currentRate,
  pastRate,
}: DollarResultProps) {
  const currentDollar = Math.floor(salaryResult.netSalary / currentRate);
  const pastDollar = pastRate > 0 ? Math.floor(salaryResult.netSalary / pastRate) : 0;
  const dollarDiff = currentDollar - pastDollar;

  const items = [
    { label: '국민연금', value: salaryResult.nationalPension, color: 'text-blue-600 dark:text-blue-400' },
    { label: '건강보험', value: salaryResult.healthInsurance, color: 'text-green-600 dark:text-green-400' },
    { label: '장기요양보험', value: salaryResult.longTermCare, color: 'text-teal-600 dark:text-teal-400' },
    { label: '고용보험', value: salaryResult.employmentInsurance, color: 'text-purple-600 dark:text-purple-400' },
    { label: '소득세', value: salaryResult.incomeTax, color: 'text-orange-600 dark:text-orange-400' },
    { label: '지방소득세', value: salaryResult.localIncomeTax, color: 'text-red-600 dark:text-red-400' },
  ];

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
      aria-label="환율 환산 결과"
      role="region"
    >
      {/* 현재 환율 기준 달러 환산 */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">현재 환율 기준</h3>
        <div className="text-center py-4 bg-green-50 dark:bg-green-900/30 rounded-xl" aria-live="polite">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            월 실수령액 (USD)
          </p>
          <p className="text-3xl sm:text-4xl font-extrabold text-green-700 dark:text-green-300 tabular-nums">
            ${formatNumber(currentDollar)}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            1 USD = {formatNumber(currentRate)}원 기준
          </p>
        </div>
      </div>

      {/* 비교 환율 기준 달러 환산 */}
      {pastRate > 0 && (
        <div className="space-y-4 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">비교 환율 기준</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center py-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                월 실수령액 (USD)
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300 tabular-nums">
                ${formatNumber(pastDollar)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatNumber(pastRate)}원 기준
              </p>
            </div>

            <div className={`text-center py-3 rounded-xl ${dollarDiff >= 0 ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                차이
              </p>
              <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${dollarDiff >= 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                {dollarDiff >= 0 ? '+' : '-'}${formatNumber(Math.abs(dollarDiff))}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {dollarDiff >= 0 ? '환율 상승' : '환율 하강'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 원화 기준 정보 */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">원화 상세 정보</h3>
        <div className="text-center py-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            월 실수령액 (원)
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-300 tabular-nums">
            {formatNumber(salaryResult.netSalary)}
            <span className="text-lg font-normal ml-1">원</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            세전 월급 {formatNumber(salaryResult.monthlySalary)}원 · 실효세율{' '}
            {salaryResult.effectiveTaxRate}%
          </p>
        </div>
      </div>

      {/* 공제 내역 */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
          공제 내역
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.label} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
              <span className={`text-sm font-semibold tabular-nums ${item.color}`}>
                -{formatNumber(item.value)}원
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            공제 합계
          </span>
          <span className="text-base font-bold text-red-600 dark:text-red-400 tabular-nums">
            -{formatNumber(salaryResult.totalDeduction)}원
          </span>
        </div>
      </div>
    </div>
  );
}
