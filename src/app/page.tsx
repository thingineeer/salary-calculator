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
import AdBanner from '@/components/AdBanner';

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
          <div className="hidden lg:block">
            <AdBanner format="rectangle" className="h-[250px] sticky top-8" />
          </div>
        </div>

        {/* 결과 + 차트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SalaryResultCard result={result} />
          <DeductionChart result={result} />
        </div>

        {/* 모바일 광고 */}
        <div className="lg:hidden">
          <AdBanner format="rectangle" className="h-[100px]" />
        </div>

        {/* 중간 광고 배너 */}
        <AdBanner format="horizontal" className="h-[90px] hidden sm:flex" />

        {/* 비교 테이블 */}
        <SalaryTable />

        {/* FAQ */}
        <FAQ />

        {/* 하단 광고 배너 */}
        <AdBanner format="horizontal" className="h-[90px]" />
      </main>

      <Footer />
    </div>
  );
}
