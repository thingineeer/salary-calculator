import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { calculateSalary } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { formatNumber } from '@/lib/format';
import { getSalaryPercentile } from '@/lib/percentile';
import { getSalaryPageData, SALARY_AMOUNTS } from '@/lib/salary-seo-data';
import AdBanner from '@/components/AdBanner';

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
    title: `${data.title} - 2026년 세후 월급 ${formatNumber(result.netSalary)}원`,
    description: data.description,
    alternates: { canonical: `/salary/${amount}` },
    openGraph: {
      title: `${data.title} | 월 실수령 ${formatNumber(result.netSalary)}원`,
      description: data.description,
      type: 'article',
      locale: 'ko_KR',
      url: `/salary/${amount}`,
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
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">🧮</span>
            <span className="text-lg font-bold text-blue-800 dark:text-blue-300">
              2026 연봉 실수령액 계산기
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <article>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            2026년 {data.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            부양가족 1명(본인), 비과세 월 20만원 기준 | 2026년 세율 적용
          </p>

          {/* 핵심 결과 카드 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
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

          {/* 대표 직종 */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
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

          {/* 절세 팁 */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
              연봉 {formatNumber(amount)}만원 절세 방법
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {data.taxTip}
            </p>
          </section>

          {/* 광고 - 절세 팁 아래 */}
          <AdBanner format="auto" className="w-full min-h-[90px] mb-6" />

          {/* FAQ */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              자주 묻는 질문
            </h2>
            <dl className="space-y-4">
              {data.faq.map((f, idx) => (
                <div key={idx}>
                  <dt className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Q. {f.question}
                  </dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* 인접 구간 네비게이션 */}
          <nav className="flex justify-between items-center gap-4" aria-label="다른 연봉 구간">
            {prevAmount ? (
              <Link href={`/salary/${prevAmount}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                ← 연봉 {formatNumber(prevAmount)}만원
              </Link>
            ) : <span />}
            {nextAmount ? (
              <Link href={`/salary/${nextAmount}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                연봉 {formatNumber(nextAmount)}만원 →
              </Link>
            ) : <span />}
          </nav>

          {/* 메인 계산기 CTA */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              내 연봉으로 직접 계산하기
            </Link>
          </div>
        </article>

        {/* 주요 연봉 구간 바로가기 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
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

      <footer className="text-center py-6 text-xs text-gray-400 dark:text-gray-500">
        <Link href="/" className="hover:underline">salary-calc.kr</Link> · 2026년 세율 기준
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
