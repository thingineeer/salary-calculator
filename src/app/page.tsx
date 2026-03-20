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
