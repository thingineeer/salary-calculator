'use client';

import { Suspense, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { calculateSalary } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { formatNumber } from '@/lib/format';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TABS = [
  { label: '2,400~4,000만', min: 2400, max: 4000 },
  { label: '4,100~5,000만', min: 4100, max: 5000 },
  { label: '5,100~7,000만', min: 5100, max: 7000 },
  { label: '7,100~9,000만', min: 7100, max: 9000 },
  { label: '9,100~1억1천', min: 9100, max: 11000 },
  { label: '1억1천~1억3천', min: 11100, max: 13000 },
  { label: '1억3천~1억5천', min: 13100, max: 15000 },
];

const REPRESENTATIVE_AMOUNTS = [2400, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000];

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
  return (
    <Suspense fallback={null}>
      <SalaryTableContent />
    </Suspense>
  );
}

function SalaryTableContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabFromUrl = Number(searchParams.get('tab') ?? 0);
  const activeTab = tabFromUrl >= 0 && tabFromUrl < TABS.length ? tabFromUrl : 0;

  const handleTabChange = useCallback((idx: number) => {
    const params = new URLSearchParams(window.location.search);
    if (idx === 0) {
      params.delete('tab');
    } else {
      params.set('tab', String(idx));
    }
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : '/salary', { scroll: false });
  }, [router]);

  const tab = TABS[activeTab];
  const rows = generateRows(tab.min, tab.max);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            2026년 연봉별 실수령액 비교표
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            100만원 단위 · 부양가족 1명(본인) · 비과세 월 20만원 기준
          </p>
        </div>

        {/* 구간 탭 */}
        <div className="relative">
          <div className="flex gap-2 pb-3 overflow-x-auto snap-x snap-mandatory touch-action-manipulation" role="tablist" aria-label="연봉 구간 선택" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {TABS.map((t, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={activeTab === idx}
                onClick={() => handleTabChange(idx)}
                className={`flex-shrink-0 snap-start px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors touch-action-manipulation focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  activeTab === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t.label}
              </button>
            ))}
            <div className="flex-shrink-0 w-1" aria-hidden="true" />
          </div>
          {/* 스크롤 인디케이터 */}
          <div className="flex justify-center gap-1 mt-1" aria-hidden="true">
            {TABS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleTabChange(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  activeTab === idx
                    ? 'w-6 bg-blue-500'
                    : 'w-1.5 bg-gray-300 dark:bg-gray-600'
                }`}
                tabIndex={-1}
              />
            ))}
          </div>
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
                <th className="text-right py-2 px-2 font-medium">실효세율</th>
                <th className="py-2 pl-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                  <tr
                    key={row.salary}
                    className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                  >
                    <td className="py-2 pr-2 font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {formatNumber(row.salary)}만원
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
                    <td className="py-2 px-2 text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {row.effectiveTaxRate}%
                    </td>
                    <td className="py-2 pl-2 whitespace-nowrap">
                      <Link
                        href={`/salary/${row.salary}`}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline inline-block py-1 px-2 -my-1 -mx-2 rounded focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        자세히
                      </Link>
                    </td>
                  </tr>
              ))}
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
            {REPRESENTATIVE_AMOUNTS.map((a) => (
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

      <Footer />
    </div>
  );
}
