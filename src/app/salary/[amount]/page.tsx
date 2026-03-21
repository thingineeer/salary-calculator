import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { calculateSalary } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE, NATIONAL_PENSION_UPPER_LIMIT, INSURANCE_RATES } from '@/lib/constants';
import { formatNumber } from '@/lib/format';
import { getSalaryPercentile } from '@/lib/percentile';
import { getSalaryPageData, SALARY_AMOUNTS } from '@/lib/salary-seo-data';
import AdBanner from '@/components/AdBanner';
import InvestmentCTA from '@/components/InvestmentCTA';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDownIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';

/** 과세표준 구간에서 해당 연봉의 세율/구간명을 반환 */
function getTaxBracketInfo(annualSalary: number) {
  const nonTaxable = DEFAULT_NON_TAXABLE_ALLOWANCE * 12;
  const taxableAnnual = Math.max(0, annualSalary - nonTaxable);

  // 근로소득공제 (간이)
  let earnedDeduction = 0;
  if (taxableAnnual <= 5_000_000) earnedDeduction = taxableAnnual * 0.7;
  else if (taxableAnnual <= 15_000_000) earnedDeduction = 3_500_000 + (taxableAnnual - 5_000_000) * 0.4;
  else if (taxableAnnual <= 45_000_000) earnedDeduction = 7_500_000 + (taxableAnnual - 15_000_000) * 0.15;
  else if (taxableAnnual <= 100_000_000) earnedDeduction = 12_000_000 + (taxableAnnual - 45_000_000) * 0.05;
  else earnedDeduction = 14_750_000 + (taxableAnnual - 100_000_000) * 0.02;

  const earnedIncome = taxableAnnual - earnedDeduction;
  const personalDeduction = 1_500_000; // 본인 1명
  const taxableIncome = Math.max(0, earnedIncome - personalDeduction);

  const bracketLabels = [
    { limit: 14_000_000, rate: 6, label: '1,400만원 이하 (6%)' },
    { limit: 50_000_000, rate: 15, label: '1,400만원 초과 ~ 5,000만원 이하 (15%)' },
    { limit: 88_000_000, rate: 24, label: '5,000만원 초과 ~ 8,800만원 이하 (24%)' },
    { limit: 150_000_000, rate: 35, label: '8,800만원 초과 ~ 1억 5천만원 이하 (35%)' },
    { limit: 300_000_000, rate: 38, label: '1억 5천만원 초과 ~ 3억원 이하 (38%)' },
    { limit: 500_000_000, rate: 40, label: '3억원 초과 ~ 5억원 이하 (40%)' },
    { limit: 1_000_000_000, rate: 42, label: '5억원 초과 ~ 10억원 이하 (42%)' },
    { limit: Infinity, rate: 45, label: '10억원 초과 (45%)' },
  ];

  for (const b of bracketLabels) {
    if (taxableIncome <= b.limit) {
      return { taxableIncome, rate: b.rate, label: b.label };
    }
  }
  return { taxableIncome, rate: 45, label: '10억원 초과 (45%)' };
}

/** 소득 수준에 따른 권장 저축률 */
function getRecommendedSavingsRate(amount: number): { min: number; max: number; label: string } {
  if (amount <= 2800) return { min: 10, max: 15, label: '필수 지출 비중이 높으므로 소액이라도 꾸준히 저축하는 습관이 중요합니다' };
  if (amount <= 3500) return { min: 15, max: 20, label: '생활비를 절약하면서 목표 저축률을 달성할 수 있는 구간입니다' };
  if (amount <= 5000) return { min: 20, max: 30, label: '적극적인 저축과 투자를 병행하기 좋은 소득 구간입니다' };
  if (amount <= 7000) return { min: 25, max: 35, label: '여유 자금을 활용해 다양한 투자 포트폴리오를 구성할 수 있습니다' };
  return { min: 30, max: 40, label: '고소득 구간으로, 절세 전략과 함께 자산 증식에 집중할 수 있습니다' };
}

interface PageProps {
  params: Promise<{ amount: string }>;
}

export function generateStaticParams() {
  return SALARY_AMOUNTS.map((amount) => ({ amount: String(amount) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { amount: amountStr } = await params;
  const amount = Number(amountStr);
  const data = getSalaryPageData(amount);
  if (!data) return {};

  const result = calculateSalary({
    annualSalary: amount * 10_000,
    dependents: 1,
    childrenUnder20: 0,
    nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
  });

  return {
    title: `연봉 ${amount}만원 실수령액 - 2026 세후 월급 ${Math.round(result.netSalary / 10000)}만원`,
    description: `${data.description} 4대보험·소득세 공제 후 월 실수령액 ${formatNumber(result.netSalary)}원, 실효세율 ${result.effectiveTaxRate}%.`,
    keywords: `연봉 ${formatNumber(amount)}만원, ${formatNumber(amount)}만원 실수령액, 연봉 ${formatNumber(amount)} 세후, 월급 실수령액`,
    alternates: { canonical: `/salary/${amount}` },
    openGraph: {
      title: `연봉 ${formatNumber(amount)}만원 실수령액 | 세후 월급 ${formatNumber(result.netSalary)}원`,
      description: `2026년 기준 연봉 ${formatNumber(amount)}만원의 세후 월급은 ${formatNumber(result.netSalary)}원입니다. 4대보험·소득세 공제 내역을 확인하세요.`,
      type: 'article',
      locale: 'ko_KR',
      url: `/salary/${amount}`,
      siteName: '2026 연봉 실수령액 계산기',
    },
    twitter: {
      card: 'summary_large_image',
      title: `연봉 ${formatNumber(amount)}만원 실수령액 - 2026 세후 월급 ${Math.round(result.netSalary / 10000)}만원`,
      description: `2026년 기준 연봉 ${formatNumber(amount)}만원의 세후 월급은 ${formatNumber(result.netSalary)}원입니다. 4대보험·소득세 공제 내역을 확인하세요.`,
    },
  };
}

export default async function SalaryDetailPage({ params }: PageProps) {
  const { amount: amountStr } = await params;
  const amount = Number(amountStr);
  const data = getSalaryPageData(amount);

  if (!data) notFound();

  const annualSalary = amount * 10_000;
  const result = calculateSalary({
    annualSalary,
    dependents: 1,
    childrenUnder20: 0,
    nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
  });

  const percentile = getSalaryPercentile(annualSalary);

  // 인접 구간 링크 계산
  const currentIdx = SALARY_AMOUNTS.indexOf(amount);
  const prevAmount = currentIdx > 0 ? SALARY_AMOUNTS[currentIdx - 1] : null;
  const nextAmount = currentIdx < SALARY_AMOUNTS.length - 1 ? SALARY_AMOUNTS[currentIdx + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <article>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            2026년 {data.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            부양가족 1명(본인), 비과세 월 20만원 기준 | 2026년 세율 적용
          </p>

          {/* 핵심 결과 카드 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 card-hover">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">월 실수령액</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {formatNumber(result.netSalary)}원
              </p>
              <p className="text-xs text-gray-400 mt-1">
                세전 월급 {formatNumber(result.monthlySalary)}원 기준
              </p>
            </div>

            <table className="w-full text-sm tabular-nums" aria-label="공제 내역 상세">
              <tbody>
                <tr className="border-t border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">국민연금</td>
                  <td className="py-2 text-right text-gray-800 dark:text-gray-200">{formatNumber(result.nationalPension)}원</td>
                </tr>
                <tr className="border-t border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">건강보험</td>
                  <td className="py-2 text-right text-gray-800 dark:text-gray-200">{formatNumber(result.healthInsurance)}원</td>
                </tr>
                <tr className="border-t border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">장기요양보험</td>
                  <td className="py-2 text-right text-gray-800 dark:text-gray-200">{formatNumber(result.longTermCare)}원</td>
                </tr>
                <tr className="border-t border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">고용보험</td>
                  <td className="py-2 text-right text-gray-800 dark:text-gray-200">{formatNumber(result.employmentInsurance)}원</td>
                </tr>
                <tr className="border-t border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">소득세</td>
                  <td className="py-2 text-right text-gray-800 dark:text-gray-200">{formatNumber(result.incomeTax)}원</td>
                </tr>
                <tr className="border-t border-gray-100 dark:border-gray-700">
                  <td className="py-2 text-gray-600 dark:text-gray-400">지방소득세</td>
                  <td className="py-2 text-right text-gray-800 dark:text-gray-200">{formatNumber(result.localIncomeTax)}원</td>
                </tr>
                <tr className="border-t-2 border-gray-300 dark:border-gray-600 font-semibold">
                  <td className="py-2 text-red-600 dark:text-red-400">공제 합계</td>
                  <td className="py-2 text-right text-red-600 dark:text-red-400">-{formatNumber(result.totalDeduction)}원</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              실효세율 {result.effectiveTaxRate}% · 전체 근로자 상위 {percentile}%
            </div>
          </div>

          {/* 광고 - 결과 카드 아래 */}
          <AdBanner format="auto" className="w-full min-h-[90px] mb-6" />

          {/* 공제 항목 상세 해설 */}
          {(() => {
            const bracketInfo = getTaxBracketInfo(annualSalary);
            const monthlySalary = result.monthlySalary;
            const taxableMonthly = monthlySalary - DEFAULT_NON_TAXABLE_ALLOWANCE;
            const pensionBase = Math.min(taxableMonthly, NATIONAL_PENSION_UPPER_LIMIT);
            const isPensionCapped = taxableMonthly > NATIONAL_PENSION_UPPER_LIMIT;
            return (
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 card-hover">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                  연봉 {formatNumber(amount)}만원 공제 항목 상세 해설
                </h2>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      국민연금 — 월 {formatNumber(result.nationalPension)}원
                    </h3>
                    <p>
                      국민연금은 과세 대상 월 소득(비과세 제외)의 {(INSURANCE_RATES.nationalPension * 100).toFixed(2)}%를 근로자가 부담합니다.
                      연봉 {formatNumber(amount)}만원의 경우 과세 월 소득 {formatNumber(taxableMonthly)}원{isPensionCapped ? (
                        <>에 대해 상한 소득월액 {formatNumber(NATIONAL_PENSION_UPPER_LIMIT)}원이 적용되어, 기준소득월액 {formatNumber(pensionBase)}원의 {(INSURANCE_RATES.nationalPension * 100).toFixed(2)}%인 <strong>{formatNumber(result.nationalPension)}원</strong>을 납부합니다. 상한액 초과분에 대해서는 추가 보험료가 부과되지 않습니다.</>
                      ) : (
                        <>의 {(INSURANCE_RATES.nationalPension * 100).toFixed(2)}%인 <strong>{formatNumber(result.nationalPension)}원</strong>을 납부합니다. 상한 소득월액({formatNumber(NATIONAL_PENSION_UPPER_LIMIT)}원) 이하이므로 소득 전액이 기준소득월액으로 적용됩니다.</>
                      )}
                      {' '}국민연금은 만 60세까지 납부하며, 10년 이상 가입 시 노령연금을 수령할 수 있습니다.
                    </p>
                    <Link href="/guide/social-insurance" className="text-blue-600 dark:text-blue-400 hover:underline text-xs mt-1 inline-block">
                      4대 보험 상세 가이드 →
                    </Link>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      건강보험 — 월 {formatNumber(result.healthInsurance)}원
                    </h3>
                    <p>
                      건강보험료는 과세 월 소득 {formatNumber(taxableMonthly)}원의 {(INSURANCE_RATES.healthInsurance * 100).toFixed(3)}%(2026년 근로자 부담분)를 적용하여 <strong>{formatNumber(result.healthInsurance)}원</strong>을 납부합니다.
                      건강보험은 의료비 급여, 건강검진, 출산 급여 등 의료 서비스 전반을 보장하며, 사업주가 동일한 금액을 추가로 부담합니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      장기요양보험 — 월 {formatNumber(result.longTermCare)}원
                    </h3>
                    <p>
                      장기요양보험료는 건강보험료({formatNumber(result.healthInsurance)}원)의 {(INSURANCE_RATES.longTermCare * 100).toFixed(2)}%를 적용하여 <strong>{formatNumber(result.longTermCare)}원</strong>을 납부합니다.
                      이 보험은 고령이나 노인성 질병으로 일상생활이 어려운 분들에게 신체활동·가사활동 지원 등의 서비스를 제공하는 사회보험입니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      고용보험 — 월 {formatNumber(result.employmentInsurance)}원
                    </h3>
                    <p>
                      고용보험료는 과세 월 소득의 {(INSURANCE_RATES.employmentInsurance * 100).toFixed(1)}%인 <strong>{formatNumber(result.employmentInsurance)}원</strong>을 납부합니다.
                      실직 시 구직급여(실업급여)를 받을 수 있으며, 180일 이상 가입하고 비자발적으로 퇴직한 경우 퇴직 전 평균임금의 60%를 최대 270일간 수령할 수 있습니다.
                      또한 육아휴직 급여, 출산전후 휴가 급여 등도 고용보험에서 지급됩니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      소득세 — 월 {formatNumber(result.incomeTax)}원
                    </h3>
                    <p>
                      연봉 {formatNumber(amount)}만원의 과세표준은 약 {formatNumber(Math.round(bracketInfo.taxableIncome / 10000))}만원으로,{' '}
                      <strong>{bracketInfo.label}</strong> 세율 구간에 해당합니다.
                      근로소득공제, 인적공제(본인 150만원) 등을 적용한 후 산출세액에서 근로소득세액공제를 차감하여 연간 결정세액을 산출하고, 이를 12개월로 나눈 <strong>월 {formatNumber(result.incomeTax)}원</strong>을 원천징수합니다.
                      {result.incomeTax === 0 && ' 이 소득 수준에서는 각종 공제를 적용하면 소득세가 면제됩니다.'}
                    </p>
                    <Link href="/guide/income-tax" className="text-blue-600 dark:text-blue-400 hover:underline text-xs mt-1 inline-block">
                      소득세 계산 구조 상세 가이드 →
                    </Link>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      지방소득세 — 월 {formatNumber(result.localIncomeTax)}원
                    </h3>
                    <p>
                      지방소득세는 소득세({formatNumber(result.incomeTax)}원)의 10%인 <strong>{formatNumber(result.localIncomeTax)}원</strong>을 납부합니다.
                      이 세금은 거주지 지방자치단체의 재원으로 사용되며, 소득세와 함께 자동으로 원천징수됩니다.
                    </p>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* 대표 직종 */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 card-hover">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              연봉 {formatNumber(amount)}만원은 어떤 수준인가요?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              <strong>대표 직종:</strong> {data.representativeJobs}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {data.lifestyleNote}
            </p>
          </section>

          {/* 연봉 구간별 특징 */}
          {(() => {
            const bracketInfo = getTaxBracketInfo(annualSalary);
            const medianSalary = 3600; // 중위소득 약 3,600만원
            const diffFromMedian = amount - medianSalary;
            const diffPercent = Math.round((diffFromMedian / medianSalary) * 100);
            const taxableMonthly = result.monthlySalary - DEFAULT_NON_TAXABLE_ALLOWANCE;
            const isPensionCapped = taxableMonthly > NATIONAL_PENSION_UPPER_LIMIT;
            const annualPension = result.nationalPension * 12;

            const salaryLevel = amount <= 3000
              ? '사회 초년생 및 경력 초기 단계'
              : amount <= 4500
                ? '중간 소득 구간'
                : amount <= 7000
                  ? '중상위 소득 구간'
                  : amount <= 10000
                    ? '상위 소득 구간'
                    : '최상위 소득 구간';

            const levelDescription = amount <= 3000
              ? '필수 생활비 비중이 높아 체계적인 재무 계획이 특히 중요합니다. 소득공제와 세액공제를 최대한 활용하면 연말정산에서 환급을 받을 가능성이 높습니다.'
              : amount <= 4500
                ? '한국 근로자 중위소득에 근접한 구간으로, 4대보험과 소득세 부담이 본격적으로 느껴지기 시작합니다. 연금저축과 IRP를 통한 세액공제 활용이 효과적입니다.'
                : amount <= 7000
                  ? '소득세 부담이 본격적으로 커지는 구간입니다. 연금저축(연 600만원)과 IRP(추가 300만원)를 합산한 최대 900만원 세액공제를 적극 활용해야 합니다.'
                  : amount <= 10000
                    ? '높은 세율 구간이 적용되어 실효세율이 크게 상승합니다. 절세 전략이 실수령액에 큰 영향을 미치므로, 전문 세무사 상담을 고려할 만합니다.'
                    : '최고 세율 구간에 가까워지므로 종합적인 세무 전략이 필수입니다. 법인 설립, 퇴직연금 활용, 기부금 공제 등 다양한 절세 수단을 검토해 보세요.';

            return (
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 card-hover">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                  연봉 {formatNumber(amount)}만원 구간의 특징
                </h2>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">소득 수준 분류</h3>
                    <p>
                      연봉 {formatNumber(amount)}만원은 <strong>{salaryLevel}</strong>에 해당합니다.
                      2026년 한국 근로자 중위소득(약 {formatNumber(medianSalary)}만원) 대비{' '}
                      {diffFromMedian > 0 ? (
                        <>{formatNumber(Math.abs(diffFromMedian))}만원({diffPercent}%) 높은 수준</>
                      ) : diffFromMedian < 0 ? (
                        <>{formatNumber(Math.abs(diffFromMedian))}만원({Math.abs(diffPercent)}%) 낮은 수준</>
                      ) : (
                        <>동일한 수준</>
                      )}이며, 전체 근로자 중 <strong>상위 {percentile}%</strong>에 위치합니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">적용 세율 구간</h3>
                    <p>
                      과세표준 약 {formatNumber(Math.round(bracketInfo.taxableIncome / 10000))}만원으로{' '}
                      <strong>{bracketInfo.label}</strong> 구간이 적용됩니다.
                      다만 실제 실효세율은 {result.effectiveTaxRate}%로, 누진세 구조와 각종 공제 덕분에 명목 세율보다 낮습니다.
                      {bracketInfo.rate >= 24 && ' 이 구간에서는 연금저축·IRP 세액공제, 신용카드 소득공제 등을 적극 활용하여 과세표준을 낮추는 전략이 중요합니다.'}
                    </p>
                    <Link href="/guide/income-tax" className="text-blue-600 dark:text-blue-400 hover:underline text-xs mt-1 inline-block">
                      소득세 구간별 세율 자세히 보기 →
                    </Link>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">국민연금 영향</h3>
                    <p>
                      월 국민연금 납부액 {formatNumber(result.nationalPension)}원으로, 연간 약 {formatNumber(annualPension)}원을 적립합니다.
                      {isPensionCapped ? (
                        <> 상한 소득월액({formatNumber(NATIONAL_PENSION_UPPER_LIMIT)}원)이 적용되어 소득이 더 높아져도 국민연금 납부액은 동일합니다. 추가 노후 대비를 위해 개인연금이나 퇴직연금(IRP)을 활용하는 것이 좋습니다.</>
                      ) : (
                        <> 소득이 증가하면 국민연금 납부액도 비례하여 증가하지만, 상한 소득월액({formatNumber(NATIONAL_PENSION_UPPER_LIMIT)}원)까지만 적용됩니다. 납부한 국민연금 보험료는 전액 소득공제 대상입니다.</>
                      )}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">구간 종합 평가</h3>
                    <p>{levelDescription}</p>
                    <Link href="/guide/tax-saving" className="text-blue-600 dark:text-blue-400 hover:underline text-xs mt-1 inline-block">
                      절세 전략 가이드 보기 →
                    </Link>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* 절세 팁 */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 card-hover">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              연봉 {formatNumber(amount)}만원 절세 방법
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {data.taxTip}
            </p>
          </section>

          {/* 실수령액 활용 가이드 */}
          {(() => {
            const savings = getRecommendedSavingsRate(amount);
            const netSalary = result.netSalary;
            const housingBudget = Math.round(netSalary * 0.3);
            const savingsMin = Math.round(netSalary * savings.min / 100);
            const savingsMax = Math.round(netSalary * savings.max / 100);
            const emergencyFund3 = netSalary * 3;
            const emergencyFund6 = netSalary * 6;
            const livingExpense = netSalary - housingBudget - Math.round((savingsMin + savingsMax) / 2);

            return (
              <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 card-hover">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                  월 실수령액 {formatNumber(netSalary)}원 활용 가이드
                </h2>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      권장 저축률 — {savings.min}~{savings.max}%
                    </h3>
                    <p>
                      연봉 {formatNumber(amount)}만원(월 실수령액 {formatNumber(netSalary)}원) 기준으로{' '}
                      <strong>월 {formatNumber(savingsMin)}원 ~ {formatNumber(savingsMax)}원</strong>의 저축·투자를 권장합니다.
                      {' '}{savings.label}.
                      연금저축(월 최대 50만원)과 적립식 펀드를 병행하면 세제 혜택과 자산 증식을 동시에 달성할 수 있습니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      주거비 가이드라인 — 월 {formatNumber(housingBudget)}원 이내
                    </h3>
                    <p>
                      재무 전문가들이 권장하는 &ldquo;소득의 30% 규칙&rdquo;을 적용하면, 월세·주택담보대출 상환액을 합산하여{' '}
                      <strong>월 {formatNumber(housingBudget)}원 이내</strong>로 유지하는 것이 바람직합니다.
                      이 경우 나머지 {formatNumber(livingExpense > 0 ? livingExpense : 0)}원으로 식비, 교통비, 통신비 등 생활비와 여가를 충당할 수 있습니다.
                      {amount >= 5000 && ' 소득이 높을수록 주거비 비율을 25% 이하로 낮추고 투자 비중을 높이는 전략도 고려해 보세요.'}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      비상자금 목표 — {formatNumber(emergencyFund3)}원 ~ {formatNumber(emergencyFund6)}원
                    </h3>
                    <p>
                      예상치 못한 실직, 질병, 긴급 수리 등에 대비하여 <strong>생활비 3~6개월분</strong>의 비상자금을 마련해 두는 것이 안전합니다.
                      월 실수령액 {formatNumber(netSalary)}원 기준으로{' '}
                      <strong>{formatNumber(emergencyFund3)}원에서 {formatNumber(emergencyFund6)}원</strong> 사이를 목표로 설정하세요.
                      이 자금은 CMA, MMF 등 유동성이 높은 상품에 보관하여 필요 시 즉시 인출할 수 있도록 하는 것이 좋습니다.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                      예산 배분 요약
                    </h3>
                    <div className="mt-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span>주거비 (30%)</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{formatNumber(housingBudget)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span>저축·투자 ({savings.min}~{savings.max}%)</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{formatNumber(savingsMin)}~{formatNumber(savingsMax)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span>생활비·여가</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{formatNumber(livingExpense > 0 ? livingExpense : 0)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span>비상자금 목표</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{formatNumber(emergencyFund3)}~{formatNumber(emergencyFund6)}원</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      ※ 개인의 상황(부채, 부양가족, 거주지역 등)에 따라 비율은 조정이 필요합니다.
                    </p>
                    <Link href="/guide/tax-saving" className="text-blue-600 dark:text-blue-400 hover:underline text-xs mt-1 inline-block">
                      소득별 절세·재무 전략 가이드 →
                    </Link>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* 배당 투자 크로스 프로모션 */}
          <InvestmentCTA amount={amount} netSalary={result.netSalary} />

          {/* 광고 - 절세 팁 아래 */}
          <AdBanner format="auto" className="w-full min-h-[90px] mb-6" />

          {/* FAQ */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 card-hover">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              자주 묻는 질문
            </h2>
            <div className="space-y-3">
              {data.faq.map((f, idx) => (
                <details key={idx} className="group border border-gray-200 dark:border-gray-700 rounded-lg">
                  <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                    <span>Q. {f.question}</span>
                    <ChevronDownIcon size={16} className="ml-2 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {f.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* 인접 구간 네비게이션 */}
          <nav className="flex justify-between items-center gap-4" aria-label="다른 연봉 구간">
            {prevAmount ? (
              <Link href={`/salary/${prevAmount}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline py-2 px-3 -mx-3 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                <ArrowLeftIcon size={14} className="inline mr-1" />연봉 {formatNumber(prevAmount)}만원
              </Link>
            ) : <span />}
            {nextAmount ? (
              <Link href={`/salary/${nextAmount}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline py-2 px-3 -mx-3 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                연봉 {formatNumber(nextAmount)}만원 <ArrowRightIcon size={14} className="inline ml-1" />
              </Link>
            ) : <span />}
          </nav>

          {/* 메인 계산기 CTA */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 sm:p-6 text-center shadow-lg">
            <p className="text-white/90 text-sm mb-2">
              나만의 조건으로 정확하게 계산해보세요
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl text-base hover:bg-blue-50 transition-colors shadow-md"
            >
              내 연봉으로 직접 계산하기 →
            </Link>
          </div>
        </article>

        {/* 주요 연봉 구간 바로가기 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            연봉별 실수령액 바로가기
          </h2>
          <div className="flex flex-wrap gap-2">
            {[2400, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000].map((a) => (
              <Link
                key={a}
                href={`/salary/${a}`}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  a === amount
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {formatNumber(a)}만원
              </Link>
            ))}
          </div>
          <div className="mt-3">
            <Link href="/salary" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              전체 연봉 비교표 보기 →
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
