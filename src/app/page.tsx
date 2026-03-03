'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { calculateSalary, SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalaryForm from '@/components/SalaryForm';
import SalaryResultCard from '@/components/SalaryResult';
import DeductionChart from '@/components/DeductionChart';
import SalaryPercentile from '@/components/SalaryPercentile';
import AdBanner from '@/components/AdBanner';

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

  const result: SalaryResultType = calculateSalary(formData);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
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
            <AdBanner format="rectangle" className="w-[300px] min-h-[250px] sticky top-8" />
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
        <AdBanner format="auto" className="w-full min-h-[90px]" />

        {/* 이직 시뮬레이터 */}
        <JobChangeSimulator
          currentSalary={formData.annualSalary}
          dependents={formData.dependents}
          childrenUnder20={formData.childrenUnder20}
          nonTaxableAllowance={formData.nonTaxableAllowance}
        />

        {/* 비교 테이블 */}
        <SalaryTable />

        {/* 비교표 아래 광고 */}
        <AdBanner format="auto" className="w-full min-h-[90px]" />

        {/* FAQ */}
        <FAQ />

        {/* 하단 광고 배너 */}
        <AdBanner format="auto" className="w-full min-h-[90px]" />
      </main>

      <Footer />
    </div>
  );
}
