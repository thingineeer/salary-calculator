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
  const [salaryFormData, setSalaryFormData] = useState({
    annualSalary: 50_000_000,
    dependents: 1,
    childrenUnder20: 0,
    nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
  });

  const [exchangeData, setExchangeData] = useState({
    currentRate: 1500,
    pastRate: 1200,
    selectedPreset: 'custom',
  });

  // 실시간 환율 가져오기
  useEffect(() => {
    fetch('/api/exchange-rate')
      .then((res) => res.json())
      .then((data) => {
        if (data.rate && typeof data.rate === 'number') {
          setExchangeData((prev) => ({ ...prev, currentRate: data.rate }));
        }
      })
      .catch(() => {
        // 실패 시 기본값 유지
      });
  }, []);

  const handleSalaryChange = (field: string, value: number) => {
    setSalaryFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCurrentRateChange = (rate: number) => {
    setExchangeData((prev) => ({ ...prev, currentRate: rate }));
  };

  const handlePastRateChange = (rate: number) => {
    setExchangeData((prev) => ({ ...prev, pastRate: rate }));
  };

  const handlePresetChange = (preset: string) => {
    let pastRate = exchangeData.pastRate;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (preset === 'oneYearAgo') {
      pastRate = getHistoricalRate(currentYear - 1, currentMonth) ?? 1375;
    } else if (preset === 'threeYearsAgo') {
      pastRate = getHistoricalRate(currentYear - 3, currentMonth) ?? 1307;
    } else if (preset === 'fiveYearsAgo') {
      pastRate = getHistoricalRate(currentYear - 5, currentMonth) ?? 1116;
    }
    setExchangeData((prev) => ({ ...prev, selectedPreset: preset, pastRate }));
  };

  const salaryResult: SalaryResultType = calculateSalary(salaryFormData);

  // GA4: 달러 계산 이벤트 (연봉 변경 시)
  useEffect(() => {
    if (salaryFormData.annualSalary > 0 && exchangeData.currentRate > 0) {
      const currentMonthlyNetUSD = Math.floor(salaryResult.netSalary / exchangeData.currentRate);
      trackDollarCalculation({
        annualSalary: salaryFormData.annualSalary,
        currentRate: exchangeData.currentRate,
        pastRate: exchangeData.pastRate,
        annualUSD: salaryFormData.annualSalary / exchangeData.currentRate,
        monthlyNetUSD: currentMonthlyNetUSD,
      });
    }
  }, [salaryFormData.annualSalary, exchangeData.currentRate, exchangeData.pastRate, salaryResult.netSalary]);

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
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">
            연봉 달러 환산 계산기
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            세후 실수령액 기준 · 현재/과거 환율 비교
          </p>
        </div>

        {/* 입력 폼 */}
        <div>
          <ExchangeRateForm
            annualSalary={salaryFormData.annualSalary}
            dependents={salaryFormData.dependents}
            childrenUnder20={salaryFormData.childrenUnder20}
            nonTaxableAllowance={salaryFormData.nonTaxableAllowance}
            currentRate={exchangeData.currentRate }
            pastRate={exchangeData.pastRate }
            selectedPreset={exchangeData.selectedPreset }
            onSalaryChange={handleSalaryChange}
            onCurrentRateChange={handleCurrentRateChange}
            onPastRateChange={handlePastRateChange}
            onPresetChange={handlePresetChange}
          />
        </div>

        {/* 환산 결과 카드 */}
        <div>
          <DollarResult
            salaryResult={salaryResult}
            currentRate={exchangeData.currentRate }
            pastRate={exchangeData.pastRate }
          />
        </div>

        {/* 결과 아래 광고 */}
        <AdBanner format="auto" adPosition="after_result" className="w-full min-h-[90px]" />

        {/* 환율 추이 차트 */}
        <div className="content-auto">
          <ExchangeRateChart />
        </div>

        {/* 다중 통화 비교 테이블 */}
        <div className="content-auto">
          <MultiCurrencyTable
            netSalary={salaryResult.netSalary}
            currentRate={exchangeData.currentRate }
          />
        </div>

        {/* 테이블 아래 광고 */}
        <AdBanner format="auto" adPosition="after_table" className="w-full min-h-[90px]" />

        {/* FAQ */}
        <div className="content-auto">
          <DollarFAQ />
        </div>

        {/* 하단 광고 배너 */}
        <AdBanner format="auto" adPosition="footer_above" className="w-full min-h-[90px]" />
      </main>

      <Footer />
    </div>
  );
}
