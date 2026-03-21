'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { calculateSalary, SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { trackSalaryCalculation, trackScrollDepth, trackNavigation, sendGAEvent } from '@/lib/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalaryForm from '@/components/SalaryForm';
import SalaryResultCard from '@/components/SalaryResult';
import SalaryPercentile from '@/components/SalaryPercentile';
import AdBanner from '@/components/AdBanner';

const DeductionChart = dynamic(() => import('@/components/DeductionChart'), {
  loading: () => <div className="h-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse" />,
  ssr: false,
});
const JobChangeSimulator = dynamic(() => import('@/components/JobChangeSimulator'), {
  loading: () => <div className="h-48 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse" />,
});
const SalaryTable = dynamic(() => import('@/components/SalaryTable'), {
  loading: () => <div className="h-64 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse" />,
});
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="h-48 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse" />,
});

export default function Home() {
  const [formData, setFormData] = useState({
    annualSalary: 50_000_000,
    dependents: 1,
    childrenUnder20: 0,
    nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
  });

  const [showToast, setShowToast] = useState(false);

  // URL 파라미터에서 초기값 복원
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    const d = params.get('d');
    const c = params.get('c');
    const n = params.get('n');

    if (s || d || c || n) {
      setFormData({
        annualSalary: s ? Number(s) || 50_000_000 : 50_000_000,
        dependents: d ? Math.max(1, Math.min(10, Number(d) || 1)) : 1,
        childrenUnder20: c ? Math.max(0, Math.min(5, Number(c) || 0)) : 0,
        nonTaxableAllowance: n ? Number(n) || DEFAULT_NON_TAXABLE_ALLOWANCE : DEFAULT_NON_TAXABLE_ALLOWANCE,
      });
    }
  }, []);

  const handleChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 공유 URL 생성 및 클립보드 복사
  const handleShare = useCallback(() => {
    const params = new URLSearchParams({
      s: String(formData.annualSalary),
      d: String(formData.dependents),
      c: String(formData.childrenUnder20),
      n: String(formData.nonTaxableAllowance),
    });
    const url = `${window.location.origin}?${params.toString()}`;

    navigator.clipboard.writeText(url).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      sendGAEvent('share_result', {
        annual_salary: formData.annualSalary,
        method: 'clipboard',
      });
    }).catch(() => {
      // fallback: 구형 브라우저
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    });
  }, [formData]);

  const effectiveFormData = formData.annualSalary > 0
    ? formData
    : { ...formData, nonTaxableAllowance: 0 };
  const result: SalaryResultType = calculateSalary(effectiveFormData);

  // GA4: 계산 결과 변경 시 트래킹 (디바운스 500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      trackSalaryCalculation({
        annualSalary: formData.annualSalary,
        dependents: formData.dependents,
        childrenUnder20: formData.childrenUnder20,
        nonTaxableAllowance: formData.nonTaxableAllowance,
        netSalary: result.netSalary,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [formData, result.netSalary]);

  // GA4: 스크롤 깊이 추적
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      thresholds.forEach((t) => {
        if (scrollPercent >= t && !tracked.has(t)) {
          tracked.add(t);
          trackScrollDepth(t);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
        {/* 입력 + 사이드 광고 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalaryForm
              annualSalary={formData.annualSalary}
              dependents={formData.dependents}
              childrenUnder20={formData.childrenUnder20}
              nonTaxableAllowance={formData.nonTaxableAllowance}
              onChange={handleChange}
            />
          </div>
          <div className="hidden lg:flex lg:flex-col lg:items-center">
            <AdBanner format="rectangle" adPosition="sidebar_top" className="w-[300px] min-h-[250px] sticky top-8" />
          </div>
        </div>

        {/* 결과 + 차트 + 백분위 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <SalaryResultCard result={result} onShare={handleShare} />
            <SalaryPercentile annualSalary={formData.annualSalary} />
          </div>
          <div>
            <DeductionChart result={result} />
            {formData.annualSalary > 0 && (
              <a
                href={`https://mysnowball.kr/simulator?stock=SCHD&monthly=${Math.round(result.netSalary * 0.15 / 10000) * 10000}&years=20&drip=1&utm_source=salary-calc&utm_medium=cross-promo&utm_campaign=main`}
                target="_blank"
                rel="noopener"
                className="block mt-3 text-sm text-emerald-600 dark:text-emerald-400 hover:underline text-center"
              >
                실수령액으로 투자하면? 배당금 시뮬레이터 &rarr;
              </a>
            )}
          </div>
        </div>

        {/* 결과 아래 광고 - 모든 디바이스 반응형 (CTR 황금 구간) */}
        <AdBanner format="auto" adPosition="after_result" className="w-full min-h-[90px]" />

        {/* 이직 시뮬레이터 */}
        <div className="content-auto">
          <JobChangeSimulator
            currentSalary={formData.annualSalary}
            dependents={formData.dependents}
            childrenUnder20={formData.childrenUnder20}
            nonTaxableAllowance={formData.nonTaxableAllowance}
          />
        </div>

        {/* 달러 환산 유도 배너 */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            내 연봉, 달러로는 얼마일까?
          </p>
          <Link href={`/dollar?salary=${formData.annualSalary}`} className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => trackNavigation('dollar_calculator_banner')}>
            연봉 달러 환산 →
          </Link>
        </div>

        {/* 비교 테이블 */}
        <div className="content-auto">
          <SalaryTable />
        </div>

        {/* 비교표 아래 광고 */}
        <AdBanner format="auto" adPosition="after_table" className="w-full min-h-[90px]" />

        {/* FAQ */}
        <div className="content-auto">
          <FAQ />
        </div>

        {/* 2026년 계산기 안내 교육 콘텐츠 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover space-y-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            2026년 연봉 실수령액, 어떻게 계산되나요?
          </h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              매달 월급에서 빠지는 공제 항목은 크게 <strong>4대보험료</strong>와{' '}
              <strong>소득세·지방소득세</strong> 두 가지로 나뉩니다. 4대보험은 국민연금(4.75%),
              건강보험(3.595%), 장기요양보험(건강보험의 13.14%), 고용보험(0.9%)으로 구성되며,
              비과세 금액을 뺀 과세 소득에 각 요율을 곱해 산출합니다.
            </p>
            <p>
              소득세는 연간 총급여에서 근로소득공제와 인적공제를 차감한 &lsquo;과세표준&rsquo;에 따라
              6%~45%의 누진세율이 적용됩니다. 2026년에는 국민연금 요율이 9%에서 9.5%로 인상되어
              근로자 부담분이 4.5%에서 4.75%로 변경되었습니다.
            </p>
            <p>
              지방소득세는 소득세의 10%이며, 이 모든 공제를 차감한 금액이 실제로 통장에 입금되는
              &lsquo;실수령액&rsquo;입니다. 연말정산을 통해 최종 세금이 정산되므로, 매월 원천징수되는
              금액은 추정치이며 환급이나 추가 납부가 발생할 수 있습니다.
            </p>
          </div>

          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 pt-2">
            2026년 주요 변경사항
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">1</span>
              <span><strong>국민연금 요율 인상</strong> — 연금개혁으로 전체 요율이 9%→9.5%로 인상. 근로자 부담분은 4.5%→4.75%가 되었습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">2</span>
              <span><strong>건강보험 요율</strong> — 7.19%(근로자 3.595%)로 소폭 조정되었습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">3</span>
              <span><strong>장기요양보험 요율</strong> — 건강보험료의 13.14%로 조정. 고령화에 따라 꾸준히 상승 추세입니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">4</span>
              <span><strong>국민연금 상한 소득월액</strong> — 637만원으로 상향되어, 고소득자의 연금 부담이 증가합니다.</span>
            </li>
          </ul>
        </section>

        {/* 가이드 배너 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            급여·세금 가이드
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            계산기만으로는 알 수 없는 세금과 보험의 원리를 이해해 보세요.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guide/income-tax" className="block p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">근로소득세 가이드</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">과세표준·세율·공제 총정리</p>
            </Link>
            <Link href="/guide/social-insurance" className="block p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
              <p className="text-sm font-semibold text-green-800 dark:text-green-200">4대보험 가이드</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">국민연금·건강보험·고용보험</p>
            </Link>
            <Link href="/guide/tax-saving" className="block p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">절세 전략 10가지</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">연말정산 환급 극대화</p>
            </Link>
            <Link href="/guide/salary-negotiation" className="block p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
              <p className="text-sm font-semibold text-purple-800 dark:text-purple-200">연봉 협상 가이드</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">이직·연봉인상 실전 전략</p>
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link href="/guide" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              전체 가이드 보기 →
            </Link>
          </div>
        </section>

        {/* 하단 광고 배너 */}
        <AdBanner format="auto" adPosition="footer_above" className="w-full min-h-[90px]" />
      </main>

      <Footer />

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-5 py-2.5 rounded-full text-sm font-medium shadow-lg">
            링크가 복사되었습니다 ✓
          </div>
        </div>
      )}
    </div>
  );
}
