'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { calculateSalary, SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { formatNumber } from '@/lib/format';
import { trackScrollDepth, trackNavigation, sendGAEvent } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

// 상수
const MINIMUM_HOURLY_WAGE_2026 = 10_320; // 2026년 최저시급 (고용노동부 확정)
const DAYS_IN_YEAR = 365;
const WEEKS_PER_MONTH = 365 / 12 / 7; // 4.345주

function calcMonthlyHours(dailyHours: number, weeklyDays: number, includeWeeklyHoliday: boolean) {
  const weeklyHours = dailyHours * weeklyDays;
  const holidayHours = includeWeeklyHoliday ? dailyHours : 0; // 주휴 = 1일치
  return Math.round((weeklyHours + holidayHours) * WEEKS_PER_MONTH);
}

type CalcMode = 'salary-to-hourly' | 'hourly-to-salary';

export default function HourlyPage() {
  const [mode, setMode] = useState<CalcMode>('salary-to-hourly');
  const [annualSalary, setAnnualSalary] = useState(50_000_000);
  const [hourlyWage, setHourlyWage] = useState(0);

  // 근무 조건
  const [dailyHours, setDailyHours] = useState(8);
  const [weeklyDays, setWeeklyDays] = useState(5);
  const [includeWeeklyHoliday, setIncludeWeeklyHoliday] = useState(true);

  const monthlyWorkHours = calcMonthlyHours(dailyHours, weeklyDays, includeWeeklyHoliday);

  // 연봉 → 시급 계산
  const salaryResult: SalaryResultType = calculateSalary({
    annualSalary,
    dependents: 1,
    childrenUnder20: 0,
    nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
  });

  const preTaxHourly = monthlyWorkHours > 0 ? Math.floor(annualSalary / 12 / monthlyWorkHours) : 0;
  const postTaxHourly = monthlyWorkHours > 0 ? Math.floor(salaryResult.netSalary / monthlyWorkHours) : 0;
  const preTaxDaily = Math.floor(annualSalary / DAYS_IN_YEAR);
  const postTaxDaily = Math.floor((salaryResult.netSalary * 12) / DAYS_IN_YEAR);
  const minimumWageRatio = preTaxHourly > 0
    ? Math.round((preTaxHourly / MINIMUM_HOURLY_WAGE_2026) * 100) / 100
    : 0;

  // 시급 → 연봉 역산
  const reversedAnnualSalary = hourlyWage * monthlyWorkHours * 12;
  const reversedResult: SalaryResultType = calculateSalary({
    annualSalary: reversedAnnualSalary,
    dependents: 1,
    childrenUnder20: 0,
    nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
  });

  const reversedPreTaxDaily = Math.floor(reversedAnnualSalary / DAYS_IN_YEAR);
  const reversedPostTaxHourly = monthlyWorkHours > 0 ? Math.floor(reversedResult.netSalary / monthlyWorkHours) : 0;
  const reversedPostTaxDaily = Math.floor((reversedResult.netSalary * 12) / DAYS_IN_YEAR);
  const reversedMinimumWageRatio = hourlyWage > 0
    ? Math.round((hourlyWage / MINIMUM_HOURLY_WAGE_2026) * 100) / 100
    : 0;

  // GA4 트래킹
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mode === 'salary-to-hourly' && annualSalary > 0) {
        sendGAEvent('hourly_calculated', {
          mode: 'salary_to_hourly',
          annual_salary: annualSalary,
          hourly_wage: preTaxHourly,
        });
      } else if (mode === 'hourly-to-salary' && hourlyWage > 0) {
        sendGAEvent('hourly_calculated', {
          mode: 'hourly_to_salary',
          hourly_wage: hourlyWage,
          annual_salary: reversedAnnualSalary,
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [mode, annualSalary, hourlyWage, preTaxHourly, reversedAnnualSalary]);

  // 스크롤 깊이 추적
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set<number>();
    const handleScroll = () => {
      const pct = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      thresholds.forEach((t) => {
        if (pct >= t && !tracked.has(t)) {
          tracked.add(t);
          trackScrollDepth(t);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSalaryInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setAnnualSalary(Number(raw) || 0);
  }, []);

  const handleHourlyInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setHourlyWage(Number(raw) || 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
        {/* 타이틀 */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
            시급 계산기 2026
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            연봉 &harr; 시급 양방향 변환 | 세전·세후 비교
          </p>
        </div>

        {/* 모드 선택 탭 */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setMode('salary-to-hourly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'salary-to-hourly'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              연봉 → 시급
            </button>
            <button
              onClick={() => setMode('hourly-to-salary')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mode === 'hourly-to-salary'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              시급 → 연봉
            </button>
          </div>
        </div>

        {/* 입력 영역 + 사이드 광고 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
              {mode === 'salary-to-hourly' ? (
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      연봉 (세전)
                    </span>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={annualSalary > 0 ? formatNumber(annualSalary) : ''}
                        onChange={handleSalaryInput}
                        placeholder="연봉을 입력하세요"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl text-lg font-semibold tabular-nums bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        원
                      </span>
                    </div>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={200_000_000}
                    step={1_000_000}
                    value={annualSalary}
                    onChange={(e) => setAnnualSalary(Number(e.target.value))}
                    className="w-full"
                    aria-label="연봉 슬라이더"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0원</span>
                    <span>2억원</span>
                  </div>
                  {/* 빠른 선택 */}
                  <div className="flex flex-wrap gap-2">
                    {[3000, 4000, 5000, 6000, 7000, 8000, 10000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAnnualSalary(v * 10_000)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          annualSalary === v * 10_000
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                        }`}
                      >
                        {formatNumber(v)}만원
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      시급 (세전)
                    </span>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={hourlyWage > 0 ? formatNumber(hourlyWage) : ''}
                        onChange={handleHourlyInput}
                        placeholder="시급을 입력하세요"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl text-lg font-semibold tabular-nums bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        원
                      </span>
                    </div>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={200_000}
                    step={1_000}
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(Number(e.target.value))}
                    className="w-full"
                    aria-label="시급 슬라이더"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0원</span>
                    <span>200,000원</span>
                  </div>
                  {/* 빠른 선택 */}
                  <div className="flex flex-wrap gap-2">
                    {[10320, 12000, 15000, 20000, 30000, 50000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setHourlyWage(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          hourlyWage === v
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/30'
                        }`}
                      >
                        {v === 10320 ? '최저시급' : `${formatNumber(v)}원`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 근무 조건 */}
              <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">근무 조건</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <label className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-xs text-gray-500 dark:text-gray-400">일</span>
                    <select
                      value={dailyHours}
                      onChange={(e) => setDailyHours(Number(e.target.value))}
                      className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500"
                    >
                      {[4, 5, 6, 7, 8, 9, 10, 12].map((h) => (
                        <option key={h} value={h}>{h}시간</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-xs text-gray-500 dark:text-gray-400">주</span>
                    <select
                      value={weeklyDays}
                      onChange={(e) => setWeeklyDays(Number(e.target.value))}
                      className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map((d) => (
                        <option key={d} value={d}>{d}일</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeWeeklyHoliday}
                      onChange={(e) => setIncludeWeeklyHoliday(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="text-xs">주휴수당 포함</span>
                  </label>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  월 소정근로시간: <span className="font-medium tabular-nums">{monthlyWorkHours}시간</span> · 부양가족 1명(본인) · 비과세 월 20만원
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col lg:items-center">
            <AdBanner format="rectangle" adPosition="sidebar_top" className="w-[300px] min-h-[250px] sticky top-8" />
          </div>
        </div>

        {/* 결과 영역 */}
        {mode === 'salary-to-hourly' ? (
          <SalaryToHourlyResult
            annualSalary={annualSalary}
            salaryResult={salaryResult}
            preTaxHourly={preTaxHourly}
            postTaxHourly={postTaxHourly}
            preTaxDaily={preTaxDaily}
            postTaxDaily={postTaxDaily}
            minimumWageRatio={minimumWageRatio}
          />
        ) : (
          <HourlyToSalaryResult
            hourlyWage={hourlyWage}
            reversedAnnualSalary={reversedAnnualSalary}
            reversedResult={reversedResult}
            reversedPreTaxDaily={reversedPreTaxDaily}
            reversedPostTaxHourly={reversedPostTaxHourly}
            reversedPostTaxDaily={reversedPostTaxDaily}
            reversedMinimumWageRatio={reversedMinimumWageRatio}
          />
        )}

        {/* 결과 아래 광고 */}
        <AdBanner format="auto" adPosition="after_result" className="w-full min-h-[90px]" />

        {/* 최저시급 안내 카드 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">
            2026년 최저시급 안내
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">최저시급</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                {formatNumber(MINIMUM_HOURLY_WAGE_2026)}원
              </p>
            </div>
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">월 환산액 ({monthlyWorkHours}시간)</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                {formatNumber(MINIMUM_HOURLY_WAGE_2026 * monthlyWorkHours)}원
              </p>
            </div>
            <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">연 환산액</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                {formatNumber(MINIMUM_HOURLY_WAGE_2026 * monthlyWorkHours * 12)}원
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-center">
            * 위 근무 조건 설정에 따라 월 환산액이 달라집니다.
          </p>
          <div className="mt-3 text-center">
            <Link
              href="/minimum-wage"
              onClick={() => trackNavigation('minimum_wage_from_hourly')}
              className="text-sm text-amber-600 dark:text-amber-400 hover:underline font-medium"
            >
              최저임금 상세 정보 &rarr;
            </Link>
          </div>
        </div>

        {/* 연봉 계산기 유도 배너 */}
        <div className="bg-gradient-to-r from-blue-50 to-amber-50 dark:from-blue-900/20 dark:to-amber-900/20 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            4대보험·소득세 공제 상세 내역이 궁금하다면?
          </p>
          <Link
            href={mode === 'salary-to-hourly' ? '/' : `/`}
            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => trackNavigation('main_calculator_from_hourly')}
          >
            연봉 실수령액 계산기 &rarr;
          </Link>
        </div>

        {/* FAQ */}
        <div className="content-auto">
          <HourlyFAQ />
        </div>

        {/* 하단 광고 */}
        <AdBanner format="auto" adPosition="footer_above" className="w-full min-h-[90px]" />
      </main>

      <Footer />
    </div>
  );
}

/* =============================================
   결과 컴포넌트: 연봉 → 시급
============================================= */
function SalaryToHourlyResult({
  annualSalary,
  salaryResult,
  preTaxHourly,
  postTaxHourly,
  preTaxDaily,
  postTaxDaily,
  minimumWageRatio,
}: {
  annualSalary: number;
  salaryResult: SalaryResultType;
  preTaxHourly: number;
  postTaxHourly: number;
  preTaxDaily: number;
  postTaxDaily: number;
  minimumWageRatio: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 시급/일급 결과 카드 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover" role="region" aria-label="시급 계산 결과">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">시급 · 일급</h2>

        <div className="grid grid-cols-2 gap-4">
          <ResultBox label="세전 시급" value={preTaxHourly} highlight />
          <ResultBox label="세후 시급" value={postTaxHourly} />
          <ResultBox label="세전 일급" value={preTaxDaily} />
          <ResultBox label="세후 일급" value={postTaxDaily} />
        </div>

        {/* 최저시급 대비 */}
        {annualSalary > 0 && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              2026년 최저시급 ({formatNumber(MINIMUM_HOURLY_WAGE_2026)}원) 대비
            </p>
            <p className="text-lg font-bold text-amber-600 dark:text-amber-400 tabular-nums">
              {minimumWageRatio}배
            </p>
            <MinimumWageBar ratio={minimumWageRatio} />
          </div>
        )}
      </div>

      {/* 월급/연봉 요약 카드 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover" role="region" aria-label="월급 연봉 요약">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">월급 · 연봉</h2>

        <div className="grid grid-cols-2 gap-4">
          <ResultBox label="세전 월급" value={salaryResult.monthlySalary} />
          <ResultBox label="세후 월급" value={salaryResult.netSalary} highlight />
          <ResultBox label="세전 연봉" value={annualSalary} />
          <ResultBox label="세후 연봉" value={salaryResult.netSalary * 12} />
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>공제 합계</span>
            <span className="text-red-500 dark:text-red-400 font-medium tabular-nums">
              -{formatNumber(salaryResult.totalDeduction)}원/월
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>실효세율</span>
            <span className="font-medium tabular-nums">{salaryResult.effectiveTaxRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================
   결과 컴포넌트: 시급 → 연봉
============================================= */
function HourlyToSalaryResult({
  hourlyWage,
  reversedAnnualSalary,
  reversedResult,
  reversedPreTaxDaily,
  reversedPostTaxHourly,
  reversedPostTaxDaily,
  reversedMinimumWageRatio,
}: {
  hourlyWage: number;
  reversedAnnualSalary: number;
  reversedResult: SalaryResultType;
  reversedPreTaxDaily: number;
  reversedPostTaxHourly: number;
  reversedPostTaxDaily: number;
  reversedMinimumWageRatio: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 연봉/월급 역산 결과 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover" role="region" aria-label="연봉 역산 결과">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">연봉 · 월급 (역산)</h2>

        <div className="grid grid-cols-2 gap-4">
          <ResultBox label="세전 연봉" value={reversedAnnualSalary} highlight />
          <ResultBox label="세후 연봉" value={reversedResult.netSalary * 12} />
          <ResultBox label="세전 월급" value={reversedResult.monthlySalary} />
          <ResultBox label="세후 월급" value={reversedResult.netSalary} />
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>공제 합계</span>
            <span className="text-red-500 dark:text-red-400 font-medium tabular-nums">
              -{formatNumber(reversedResult.totalDeduction)}원/월
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>실효세율</span>
            <span className="font-medium tabular-nums">{reversedResult.effectiveTaxRate}%</span>
          </div>
        </div>
      </div>

      {/* 시급/일급 요약 */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover" role="region" aria-label="시급 일급 요약">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-4">시급 · 일급</h2>

        <div className="grid grid-cols-2 gap-4">
          <ResultBox label="세전 시급" value={hourlyWage} />
          <ResultBox label="세후 시급" value={reversedPostTaxHourly} />
          <ResultBox label="세전 일급" value={reversedPreTaxDaily} />
          <ResultBox label="세후 일급" value={reversedPostTaxDaily} />
        </div>

        {/* 최저시급 대비 */}
        {hourlyWage > 0 && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              2026년 최저시급 ({formatNumber(MINIMUM_HOURLY_WAGE_2026)}원) 대비
            </p>
            <p className="text-lg font-bold text-amber-600 dark:text-amber-400 tabular-nums">
              {reversedMinimumWageRatio}배
            </p>
            <MinimumWageBar ratio={reversedMinimumWageRatio} />
          </div>
        )}
      </div>
    </div>
  );
}

/* =============================================
   공통 컴포넌트: 결과 박스
============================================= */
function ResultBox({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className={`text-center p-3 rounded-xl ${highlight ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-700/50'}`}>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className={`text-base sm:text-lg font-bold tabular-nums value-transition ${
        highlight
          ? 'text-blue-700 dark:text-blue-300'
          : 'text-gray-900 dark:text-gray-100'
      }`}>
        {formatNumber(value)}
        <span className="text-xs font-normal ml-0.5">원</span>
      </p>
    </div>
  );
}

/* =============================================
   공통 컴포넌트: 최저시급 대비 바
============================================= */
function MinimumWageBar({ ratio }: { ratio: number }) {
  const widthPercent = Math.min(ratio * 20, 100); // 5배 = 100%
  return (
    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className="h-2 rounded-full bg-amber-500 transition-all duration-300"
        style={{ width: `${widthPercent}%` }}
      />
    </div>
  );
}

/* =============================================
   FAQ 컴포넌트
============================================= */
function HourlyFAQ() {
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
      q: '시급은 어떻게 계산하나요?',
      a: '세전 시급 = 연봉 / 12개월 / 209시간(월 소정근로시간)으로 계산합니다. 209시간은 주 40시간 근무에 주휴 8시간을 포함한 주 48시간을 4.345주(365일/12개월/7일)로 곱한 값입니다.',
    },
    {
      q: '세후 시급은 어떻게 다른가요?',
      a: '세후 시급은 4대보험(국민연금, 건강보험, 장기요양보험, 고용보험)과 소득세, 지방소득세를 공제한 월 실수령액을 209시간으로 나눈 값입니다. 연봉이 높을수록 세전·세후 차이가 커집니다.',
    },
    {
      q: '2026년 최저시급은 얼마인가요?',
      a: '2026년 최저시급은 10,320원입니다. 월 소정근로시간(209시간) 기준 월 최저임금은 약 2,156,880원이며, 연봉으로 환산하면 약 25,882,560원입니다.',
    },
    {
      q: '주휴수당이 포함된 건가요?',
      a: '네, 월 소정근로시간 209시간에는 주휴수당이 포함되어 있습니다. 주 40시간 근무 시 주 8시간의 주휴수당이 추가되어 주 48시간이 됩니다.',
    },
    {
      q: '일급은 어떻게 계산하나요?',
      a: '세전 일급은 연봉을 365일로 나눈 값이고, 세후 일급은 월 실수령액을 12개월 곱한 후 365일로 나눈 값입니다. 공휴일·주말 포함 365일 기준입니다.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-4">
        자주 묻는 질문
      </h2>
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
    </div>
  );
}
