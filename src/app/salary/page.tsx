'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateSalary } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { formatNumber } from '@/lib/format';
import { SALARY_AMOUNTS } from '@/lib/salary-seo-data';

const TABS = [
  { label: '2,400~4,000만', min: 2400, max: 4000 },
  { label: '4,100~6,000만', min: 4100, max: 6000 },
  { label: '6,100~8,000만', min: 6100, max: 8000 },
  { label: '8,100~1억', min: 8100, max: 10000 },
];

function generateRows(min: number, max: number) {
  const rows = [];
  for (let s = min; s <= max; s += 100) {
    const result = calculateSalary({
      annualSalary: s * 10_000,
      dependents: 1,
      childrenUnder20: 0,
      nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
    });
    rows.push({ salary: s, ...result });
  }
  return rows;
}

export default function SalaryTablePage() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];
  const rows = generateRows(tab.min, tab.max);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🧮</span>
            <span className="text-lg font-bold text-blue-800 dark:text-blue-300">
              2026 연봉 실수령액 계산기
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            2026년 연봉별 실수령액 비교표
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            100만원 단위 · 부양가족 1명(본인) · 비과세 월 20만원 기준
          </p>
        </div>

        {/* 구간 탭 */}
        <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="연봉 구간 선택">
          {TABS.map((t, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={activeTab === idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                activeTab === idx
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 비교 테이블 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-sm tabular-nums" aria-label={`연봉 ${tab.label} 구간 실수령액 비교표`}>
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <th className="text-left py-2 pr-2 font-medium">연봉</th>
                <th className="text-right py-2 px-2 font-medium">월급(세전)</th>
                <th className="text-right py-2 px-2 font-medium hidden sm:table-cell">국민연금</th>
                <th className="text-right py-2 px-2 font-medium hidden sm:table-cell">건강보험</th>
                <th className="text-right py-2 px-2 font-medium">공제합계</th>
                <th className="text-right py-2 px-2 font-medium">실수령액</th>
                <th className="text-right py-2 pl-2 font-medium">실효세율</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const hasDetailPage = SALARY_AMOUNTS.includes(row.salary);
                const salaryLabel = `${formatNumber(row.salary)}만원`;

                return (
                  <tr
                    key={row.salary}
                    className={`border-b border-gray-100 dark:border-gray-700/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors ${
                      hasDetailPage ? 'bg-blue-50/30 dark:bg-blue-900/5' : ''
                    }`}
                  >
                    <td className="py-2 pr-2 font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {hasDetailPage ? (
                        <Link href={`/salary/${row.salary}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                          {salaryLabel}
                        </Link>
                      ) : (
                        salaryLabel
                      )}
                    </td>
                    <td className="py-2 px-2 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {formatNumber(row.monthlySalary)}
                    </td>
                    <td className="py-2 px-2 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap hidden sm:table-cell">
                      {formatNumber(row.nationalPension)}
                    </td>
                    <td className="py-2 px-2 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap hidden sm:table-cell">
                      {formatNumber(row.healthInsurance)}
                    </td>
                    <td className="py-2 px-2 text-right text-red-500 dark:text-red-400 whitespace-nowrap">
                      -{formatNumber(row.totalDeduction)}
                    </td>
                    <td className="py-2 px-2 text-right font-semibold text-blue-700 dark:text-blue-300 whitespace-nowrap">
                      {formatNumber(row.netSalary)}
                    </td>
                    <td className="py-2 pl-2 text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {row.effectiveTaxRate}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 상세 페이지 바로가기 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            연봉별 상세 분석 페이지
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            대표 직종, 절세 방법, 생활비 분석이 포함된 상세 페이지입니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {SALARY_AMOUNTS.map((a) => (
              <Link
                key={a}
                href={`/salary/${a}`}
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                {formatNumber(a)}만원
              </Link>
            ))}
          </div>
        </div>

        {/* 메인 계산기 CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            내 연봉으로 직접 계산하기
          </Link>
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-gray-400 dark:text-gray-500">
        <Link href="/" className="hover:underline">salary-calc.kr</Link> · 2026년 세율 기준
      </footer>
    </div>
  );
}
