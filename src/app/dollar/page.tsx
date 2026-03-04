'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { calculateSalary, SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { trackScrollDepth, trackDollarCalculation } from '@/lib/analytics';
import { getHistoricalRate } from '@/lib/exchange-rates';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import ExchangeRateForm from '@/components/ExchangeRateForm';
import DollarResult from '@/components/DollarResult';

const ExchangeRateChart = dynamic(() => import('@/components/ExchangeRateChart'), {
  loading: () => <div className="h-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse" />,
  ssr: false,
});

const MultiCurrencyTable = dynamic(() => import('@/components/MultiCurrencyTable'), {
  loading: () => <div className="h-64 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse" />,
  ssr: false,
});

const DollarFAQ = dynamic(() => import('@/components/DollarFAQ'), {
  loading: () => <div className="h-48 bg-white dark:bg-gray-800 rounded-2xl shadow-lg animate-pulse" />,
});

export default function DollarPage() {
  const [currentSalary, setCurrentSalary] = useState(45_000_000);
  const [pastSalary, setPastSalary] = useState(41_000_000);
  const [currentRate, setCurrentRate] = useState(1500);
  const [pastRate, setPastRate] = useState(1380);
  const [selectedPreset, setSelectedPreset] = useState('custom');

  // 실시간 환율
  useEffect(() => {
    fetch('/api/exchange-rate')
      .then((res) => res.json())
      .then((data) => {
        if (data.rate && typeof data.rate === 'number') {
          setCurrentRate(data.rate);
        }
      })
      .catch(() => {});
  }, []);

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset);
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;

    if (preset === 'oneYearAgo') {
      setPastRate(getHistoricalRate(y - 1, m) ?? 1375);
    } else if (preset === 'threeYearsAgo') {
      setPastRate(getHistoricalRate(y - 3, m) ?? 1307);
    } else if (preset === 'fiveYearsAgo') {
      setPastRate(getHistoricalRate(y - 5, m) ?? 1116);
    }
  };

  // 세후 계산 (기본 부양가족 1명, 비과세 20만원)
  const salaryBase = { dependents: 1, childrenUnder20: 0, nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE };
  const currentEffective = currentSalary > 0
    ? { ...salaryBase, annualSalary: currentSalary }
    : { ...salaryBase, annualSalary: 0, nonTaxableAllowance: 0 };
  const pastEffective = pastSalary > 0
    ? { ...salaryBase, annualSalary: pastSalary }
    : { ...salaryBase, annualSalary: 0, nonTaxableAllowance: 0 };
  const currentResult: SalaryResultType = calculateSalary(currentEffective);
  const pastResult: SalaryResultType = calculateSalary(pastEffective);

  // GA4
  useEffect(() => {
    if (currentSalary > 0 && currentRate > 0) {
      trackDollarCalculation({
        annualSalary: currentSalary,
        currentRate,
        pastRate,
        annualUSD: currentSalary / currentRate,
        monthlyNetUSD: Math.floor(currentResult.netSalary / currentRate),
      });
    }
  }, [currentSalary, currentRate, pastRate, currentResult.netSalary]);

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set<number>();
    const handleScroll = () => {
      const pct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      thresholds.forEach((t) => {
        if (pct >= t && !tracked.has(t)) { tracked.add(t); trackScrollDepth(t); }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
            연봉 달러 환산 계산기
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            연봉이 올랐는데, 달러로는 얼마나 오른 걸까?
          </p>
        </div>

        <ExchangeRateForm
          annualSalary={currentSalary}
          pastAnnualSalary={pastSalary}
          currentRate={currentRate}
          pastRate={pastRate}
          selectedPreset={selectedPreset}
          onSalaryChange={setCurrentSalary}
          onPastSalaryChange={setPastSalary}
          onCurrentRateChange={setCurrentRate}
          onPastRateChange={setPastRate}
          onPresetChange={handlePresetChange}
        />

        <DollarResult
          currentSalaryResult={currentResult}
          pastSalaryResult={pastResult}
          currentRate={currentRate}
          pastRate={pastRate}
          currentAnnualSalary={currentSalary}
          pastAnnualSalary={pastSalary}
        />

        <AdBanner format="auto" adPosition="after_result" className="w-full min-h-[90px]" />

        <div className="content-auto">
          <ExchangeRateChart />
        </div>

        <div className="content-auto">
          <MultiCurrencyTable netSalary={currentResult.netSalary} currentRate={currentRate} />
        </div>

        <AdBanner format="auto" adPosition="after_table" className="w-full min-h-[90px]" />

        <div className="content-auto">
          <DollarFAQ />
        </div>

        <AdBanner format="auto" adPosition="footer_above" className="w-full min-h-[90px]" />
      </main>
      <Footer />
    </div>
  );
}
