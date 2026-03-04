'use client';

import { SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { formatNumber } from '@/lib/format';

interface DollarResultProps {
  currentSalaryResult: SalaryResultType;
  pastSalaryResult: SalaryResultType;
  currentRate: number;
  pastRate: number;
  currentAnnualSalary: number;
  pastAnnualSalary: number;
}

export default function DollarResult({
  currentSalaryResult,
  pastSalaryResult,
  currentRate,
  pastRate,
  currentAnnualSalary,
  pastAnnualSalary,
}: DollarResultProps) {
  const currentDollar = currentRate > 0 ? Math.floor(currentSalaryResult.netSalary / currentRate) : 0;
  const pastDollar = pastRate > 0 ? Math.floor(pastSalaryResult.netSalary / pastRate) : 0;
  const dollarDiff = currentDollar - pastDollar;
  const diffPercent = pastDollar > 0 ? ((dollarDiff / pastDollar) * 100).toFixed(1) : '0.0';

  const diffColor =
    dollarDiff > 0
      ? 'text-green-600 dark:text-green-400'
      : dollarDiff < 0
        ? 'text-red-600 dark:text-red-400'
        : 'text-gray-500 dark:text-gray-400';

  const diffBg =
    dollarDiff > 0
      ? 'bg-green-50 dark:bg-green-900/30'
      : dollarDiff < 0
        ? 'bg-red-50 dark:bg-red-900/30'
        : 'bg-gray-50 dark:bg-gray-700';

  const diffLabel =
    dollarDiff > 0
      ? '달러 가치 증가'
      : dollarDiff < 0
        ? '달러 가치 감소'
        : '달러 가치 유지';

  const deductionItems = [
    { label: '국민연금', color: 'text-blue-600 dark:text-blue-400' },
    { label: '건강보험', color: 'text-green-600 dark:text-green-400' },
    { label: '장기요양보험', color: 'text-teal-600 dark:text-teal-400' },
    { label: '고용보험', color: 'text-purple-600 dark:text-purple-400' },
    { label: '소득세', color: 'text-orange-600 dark:text-orange-400' },
    { label: '지방소득세', color: 'text-red-600 dark:text-red-400' },
  ] as const;

  type DeductionKey = 'nationalPension' | 'healthInsurance' | 'longTermCare' | 'employmentInsurance' | 'incomeTax' | 'localIncomeTax';
  const deductionKeys: DeductionKey[] = [
    'nationalPension',
    'healthInsurance',
    'longTermCare',
    'employmentInsurance',
    'incomeTax',
    'localIncomeTax',
  ];

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
      aria-label="달러 환산 비교 결과"
      role="region"
    >
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
        달러 환산 비교 결과
      </h3>

      {/* 이전/현재 비교 카드 */}
      <div className="grid grid-cols-2 gap-3" aria-live="polite">
        {/* 이전 카드 */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">이전</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 tabular-nums">
            {formatNumber(pastAnnualSalary / 10000)}만원
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
            {formatNumber(pastRate)}원/USD
          </p>
          <p className="text-xl font-bold text-gray-700 dark:text-gray-200 mt-2 tabular-nums">
            ${formatNumber(pastDollar)}
          </p>
        </div>

        {/* 현재 카드 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">현재</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 tabular-nums">
            {formatNumber(currentAnnualSalary / 10000)}만원
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
            {formatNumber(currentRate)}원/USD
          </p>
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300 mt-2 tabular-nums">
            ${formatNumber(currentDollar)}
          </p>
        </div>
      </div>

      {/* 차이 표시 (핵심) */}
      <div className={`text-center py-4 rounded-xl ${diffBg}`}>
        <p className={`text-3xl sm:text-4xl font-extrabold tabular-nums ${diffColor}`}>
          {dollarDiff >= 0 ? '+' : '-'}${formatNumber(Math.abs(dollarDiff))}
        </p>
        <p className={`text-lg font-semibold tabular-nums ${diffColor}`}>
          ({dollarDiff >= 0 ? '+' : ''}{diffPercent}%)
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {diffLabel}
        </p>
      </div>

      {/* 원화 상세 (접기 가능) */}
      <details className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 select-none hover:text-blue-600 dark:hover:text-blue-400 transition">
          원화 상세 비교
        </summary>
        <div className="mt-4 space-y-4">
          {/* 이전/현재 월 실수령액 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center py-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">이전 월 실수령</p>
              <p className="text-lg font-bold text-gray-700 dark:text-gray-200 tabular-nums">
                {formatNumber(pastSalaryResult.netSalary)}
                <span className="text-sm font-normal ml-0.5">원</span>
              </p>
              <p className="text-xs text-gray-400 mt-1 tabular-nums">
                세전 {formatNumber(pastSalaryResult.monthlySalary)}원
              </p>
            </div>
            <div className="text-center py-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">현재 월 실수령</p>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300 tabular-nums">
                {formatNumber(currentSalaryResult.netSalary)}
                <span className="text-sm font-normal ml-0.5">원</span>
              </p>
              <p className="text-xs text-gray-400 mt-1 tabular-nums">
                세전 {formatNumber(currentSalaryResult.monthlySalary)}원
              </p>
            </div>
          </div>

          {/* 공제 내역 비교 */}
          <div>
            <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
              공제 내역 비교
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label="공제 내역 비교 테이블">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">항목</th>
                    <th className="text-right py-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">이전</th>
                    <th className="text-right py-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">현재</th>
                  </tr>
                </thead>
                <tbody>
                  {deductionItems.map((item, i) => {
                    const key = deductionKeys[i];
                    return (
                      <tr key={item.label} className="border-b border-gray-100 dark:border-gray-700/50">
                        <td className="py-1.5 text-gray-600 dark:text-gray-400">{item.label}</td>
                        <td className={`py-1.5 text-right font-semibold tabular-nums ${item.color}`}>
                          -{formatNumber(pastSalaryResult[key])}원
                        </td>
                        <td className={`py-1.5 text-right font-semibold tabular-nums ${item.color}`}>
                          -{formatNumber(currentSalaryResult[key])}원
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-2 font-semibold text-gray-700 dark:text-gray-200">공제 합계</td>
                    <td className="py-2 text-right font-bold text-red-600 dark:text-red-400 tabular-nums">
                      -{formatNumber(pastSalaryResult.totalDeduction)}원
                    </td>
                    <td className="py-2 text-right font-bold text-red-600 dark:text-red-400 tabular-nums">
                      -{formatNumber(currentSalaryResult.totalDeduction)}원
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
