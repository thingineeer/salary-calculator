'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { calculateSalary, SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { trackSalaryCalculation, trackScrollDepth, trackNavigation } from '@/lib/analytics';
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

  const handleChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
            <SalaryResultCard result={result} />
            <SalaryPercentile annualSalary={formData.annualSalary} />
          </div>
          <DeductionChart result={result} />
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
    </div>
  );
}
