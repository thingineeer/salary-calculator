'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateSalary } from '@/lib/salary-calculator';
import { formatNumber, parseFormattedNumber } from '@/lib/format';
import { trackNavigation } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

// 2026년 최저임금 상수
const MINIMUM_WAGE_2026 = 10_320; // 시급
const MONTHLY_WORK_HOURS = 209; // 주 40시간 + 주휴 8시간
const MONTHLY_WAGE = MINIMUM_WAGE_2026 * MONTHLY_WORK_HOURS; // 2,156,880원
const ANNUAL_WAGE = MONTHLY_WAGE * 12; // 25,882,560원

// 최저임금 세후 실수령액 계산
const minWageResult = calculateSalary({
  annualSalary: ANNUAL_WAGE,
  dependents: 1,
  childrenUnder20: 0,
  nonTaxableAllowance: 200_000,
});

// 연도별 최저임금 데이터 (환율: 각 연도 1월 첫 영업일 KRW/USD)
const WAGE_HISTORY = [
  { year: 2026, wage: 10_320, rate: 2.9, exchangeRate: 1_471 },
  { year: 2025, wage: 10_030, rate: 1.7, exchangeRate: 1_472 },
  { year: 2024, wage: 9_860, rate: 2.5, exchangeRate: 1_305 },
  { year: 2023, wage: 9_620, rate: 5.0, exchangeRate: 1_267 },
  { year: 2022, wage: 9_160, rate: 5.1, exchangeRate: 1_189 },
  { year: 2021, wage: 8_720, rate: 1.5, exchangeRate: 1_088 },
  { year: 2020, wage: 8_590, rate: 2.9, exchangeRate: 1_158 },
  { year: 2019, wage: 8_350, rate: 10.9, exchangeRate: 1_116 },
  { year: 2018, wage: 7_530, rate: 16.4, exchangeRate: 1_071 },
  { year: 2017, wage: 6_470, rate: 7.3, exchangeRate: 1_209 },
  { year: 2016, wage: 6_030, rate: 8.1, exchangeRate: 1_172 },
  { year: 2015, wage: 5_580, rate: 7.1, exchangeRate: 1_099 },
  { year: 2014, wage: 5_210, rate: 7.2, exchangeRate: 1_050 },
  { year: 2013, wage: 4_860, rate: 6.1, exchangeRate: 1_064 },
  { year: 2012, wage: 4_580, rate: 6.0, exchangeRate: 1_153 },
  { year: 2011, wage: 4_320, rate: 5.1, exchangeRate: 1_117 },
  { year: 2010, wage: 4_110, rate: 2.8, exchangeRate: 1_168 },
  { year: 2009, wage: 4_000, rate: 6.1, exchangeRate: 1_262 },
  { year: 2008, wage: 3_770, rate: 8.3, exchangeRate: 938 },
  { year: 2007, wage: 3_480, rate: 12.3, exchangeRate: 930 },
  { year: 2006, wage: 3_100, rate: 9.2, exchangeRate: 1_013 },
  { year: 2005, wage: 2_840, rate: 13.1, exchangeRate: 1_043 },
  { year: 2004, wage: 2_510, rate: 10.3, exchangeRate: 1_192 },
  { year: 2003, wage: 2_275, rate: 8.3, exchangeRate: 1_200 },
  { year: 2002, wage: 2_100, rate: 12.6, exchangeRate: 1_314 },
  { year: 2001, wage: 1_865, rate: 16.6, exchangeRate: 1_271 },
  { year: 2000, wage: 1_600, rate: 4.9, exchangeRate: 1_145 },
];

export default function MinimumWagePage() {
  const [salaryInput, setSalaryInput] = useState('');
  const parsedSalary = parseFormattedNumber(salaryInput);
  const ratio = parsedSalary > 0 ? Math.round((parsedSalary / ANNUAL_WAGE) * 100) / 100 : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 space-y-8">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              전년 대비 +2.9% 인상
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              2026년 최저임금
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-4 sm:p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-[10px] sm:text-xs text-emerald-200 mb-1 sm:mb-2 font-medium">시급</p>
              <p className="text-2xl sm:text-3xl font-extrabold tabular-nums">
                {formatNumber(MINIMUM_WAGE_2026)}
                <span className="text-xs sm:text-sm font-normal ml-0.5 text-emerald-200">원</span>
              </p>
            </div>
            <div className="text-center p-4 sm:p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-[10px] sm:text-xs text-emerald-200 mb-1 sm:mb-2 font-medium">월급 (209시간)</p>
              <p className="text-2xl sm:text-3xl font-extrabold tabular-nums">
                {formatNumber(MONTHLY_WAGE)}
                <span className="text-xs sm:text-sm font-normal ml-0.5 text-emerald-200">원</span>
              </p>
            </div>
            <div className="col-span-2 text-center p-4 sm:p-5 bg-white/15 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-[10px] sm:text-xs text-emerald-200 mb-1 sm:mb-2 font-medium">연봉</p>
              <p className="text-3xl sm:text-4xl font-extrabold tabular-nums">
                {formatNumber(ANNUAL_WAGE)}
                <span className="text-sm sm:text-base font-normal ml-1 text-emerald-200">원</span>
              </p>
            </div>
          </div>

          <div className="mt-4 text-center space-y-1">
            <p className="text-[11px] text-emerald-200/70">
              주 40시간, 주휴수당 포함 기준 (월 209시간)
            </p>
            <p className="text-xs text-emerald-100">
              세후 월 실수령 약{' '}
              <span className="font-bold text-white">
                {formatNumber(minWageResult.netSalary)}원
              </span>
              {' '}(부양가족 1인, 비과세 20만원 기준)
            </p>
          </div>
        </section>

        {/* 섹션 2: 연도별 최저임금 추이 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-1">
            연도별 최저임금 추이
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
            2000년~2026년, 달러 환산은 각 연도 1월 첫 영업일 환율 기준
          </p>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2.5 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs">연도</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs">시급</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs hidden sm:table-cell">인상률</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs">시급 USD</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs hidden sm:table-cell">월급</th>
                  <th className="text-right py-2.5 px-2 text-gray-500 dark:text-gray-400 font-medium text-xs hidden sm:table-cell">월급 USD</th>
                </tr>
              </thead>
              <tbody>
                {WAGE_HISTORY.map((row) => {
                  const monthly = row.wage * MONTHLY_WORK_HOURS;
                  const hourlyUsd = (row.wage / row.exchangeRate).toFixed(2);
                  const monthlyUsd = Math.round(monthly / row.exchangeRate);
                  const isCurrent = row.year === 2026;
                  return (
                    <tr
                      key={row.year}
                      className={`border-b border-gray-100 dark:border-gray-700/50 ${
                        isCurrent ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''
                      }`}
                    >
                      <td className={`py-2.5 px-2 tabular-nums ${isCurrent ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>
                        {row.year}
                      </td>
                      <td className={`text-right py-2.5 px-2 tabular-nums ${isCurrent ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {formatNumber(row.wage)}원
                      </td>
                      <td className="text-right py-2.5 px-2 tabular-nums text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                        +{row.rate}%
                      </td>
                      <td className={`text-right py-2.5 px-2 tabular-nums ${isCurrent ? 'font-semibold text-emerald-700 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        ${hourlyUsd}
                      </td>
                      <td className="text-right py-2.5 px-2 tabular-nums text-gray-700 dark:text-gray-300 hidden sm:table-cell">
                        {formatNumber(Math.round(monthly / 10_000))}만원
                      </td>
                      <td className="text-right py-2.5 px-2 tabular-nums text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                        ${formatNumber(monthlyUsd)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            * 월급 = 시급 × 209시간(주 40시간 + 주휴수당) 기준
          </p>
        </div>

        {/* 섹션 3: 내 연봉은 최저임금의 몇 배? */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">
            내 연봉은 최저임금의 몇 배?
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="my-salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                내 연봉 (세전)
              </label>
              <div className="relative">
                <input
                  id="my-salary"
                  type="text"
                  inputMode="numeric"
                  value={salaryInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    const num = Number(raw) || 0;
                    setSalaryInput(num > 0 ? formatNumber(num) : '');
                  }}
                  placeholder="예: 50,000,000"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl text-lg font-semibold tabular-nums bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">원</span>
              </div>
            </div>

            {ratio > 0 && (
              <div className="text-center p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  2026 최저임금 연봉({formatNumber(ANNUAL_WAGE)}원) 대비
                </p>
                <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {ratio}배
                </p>
                <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 max-w-md mx-auto">
                  <div
                    className="h-2.5 rounded-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${Math.min(ratio * 20, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/"
                onClick={() => trackNavigation('main_calculator_from_minimum_wage')}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                내 연봉 상세 계산하기 &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 섹션 4: FAQ */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">
            자주 묻는 질문
          </h2>
          <MinimumWageFAQ />
        </div>

        {/* 하단 광고 */}
        <AdBanner format="auto" adPosition="footer_above" className="w-full min-h-[90px]" />
      </main>

      <Footer />
    </div>
  );
}

function MinimumWageFAQ() {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const faqs = [
    {
      q: '주휴수당이란 무엇인가요?',
      a: '주휴수당은 1주 소정근로일을 개근한 근로자에게 유급 휴일(주휴일)에 대해 지급하는 수당입니다. 주 15시간 이상 근무하면 주 1회 유급휴일이 발생하며, 주 40시간 근무 기준 8시간분의 임금이 추가됩니다. 월 소정근로시간 209시간에는 주휴수당이 이미 포함되어 있습니다.',
    },
    {
      q: '최저임금은 언제 바뀌나요?',
      a: '최저임금은 매년 1월 1일부터 12월 31일까지 적용됩니다. 최저임금위원회가 매년 6~7월경 다음 해 최저임금을 심의·의결하고, 고용노동부 장관이 8월 5일까지 고시합니다. 2026년 최저임금은 2025년 7월에 확정되었습니다.',
    },
    {
      q: '최저임금 미만으로 급여를 받고 있다면?',
      a: '최저임금법에 따라 사업주는 최저임금 이상을 지급해야 합니다. 최저임금 미만 지급 시 3년 이하의 징역 또는 2천만원 이하의 벌금에 처해질 수 있습니다. 고용노동부(1350)에 신고할 수 있습니다.',
    },
  ];

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <button
            onClick={() => toggle(i)}
            className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            aria-expanded={openIndexes.has(i)}
          >
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 pr-4">
              {faq.q}
            </span>
            <span className={`text-gray-400 transition-transform duration-200 shrink-0 ${openIndexes.has(i) ? 'rotate-180' : ''}`}>
              &#9662;
            </span>
          </button>
          {openIndexes.has(i) && (
            <div className="px-4 pb-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
