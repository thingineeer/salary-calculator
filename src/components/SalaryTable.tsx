'use client';

import { calculateSalary } from '@/lib/salary-calculator';
import { SALARY_COMPARISON_LIST, DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { formatNumber } from '@/lib/format';

export default function SalaryTable() {
  const rows = SALARY_COMPARISON_LIST.map((salaryMan) => {
    const annual = salaryMan * 10_000;
    const result = calculateSalary({
      annualSalary: annual,
      dependents: 1,
      childrenUnder20: 0,
      nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
    });
    return { salary: salaryMan, ...result };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 overflow-x-auto">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        📊 연봉별 실수령액 비교표
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        부양가족 1명(본인), 비과세 월 20만원 기준
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
            <th className="text-left py-2 pr-2 font-medium">연봉</th>
            <th className="text-right py-2 px-2 font-medium">월 급여</th>
            <th className="text-right py-2 px-2 font-medium">공제 합계</th>
            <th className="text-right py-2 px-2 font-medium">실수령액</th>
            <th className="text-right py-2 pl-2 font-medium">실효세율</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.salary}
              className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
            >
              <td className="py-2.5 pr-2 font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                {formatNumber(row.salary)}만원
              </td>
              <td className="py-2.5 px-2 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap">
                {formatNumber(row.monthlySalary)}
              </td>
              <td className="py-2.5 px-2 text-right text-red-500 dark:text-red-400 whitespace-nowrap">
                -{formatNumber(row.totalDeduction)}
              </td>
              <td className="py-2.5 px-2 text-right font-semibold text-blue-700 dark:text-blue-300 whitespace-nowrap">
                {formatNumber(row.netSalary)}
              </td>
              <td className="py-2.5 pl-2 text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {row.effectiveTaxRate}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
