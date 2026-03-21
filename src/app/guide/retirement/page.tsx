import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '퇴직금과 퇴직연금 완벽 가이드 - DB·DC·IRP 비교 및 계산법',
  description:
    '퇴직금 계산법, DB형과 DC형 퇴직연금의 차이, IRP 세액공제 혜택까지. 퇴직 후 자산을 지키기 위해 알아야 할 모든 것을 정리합니다.',
  alternates: { canonical: '/guide/retirement' },
  openGraph: {
    title: '퇴직금과 퇴직연금 완벽 가이드 - DB·DC·IRP 비교 및 계산법',
    description:
      '퇴직금 계산법, DB형과 DC형 퇴직연금의 차이, IRP 세액공제 혜택까지. 퇴직 후 자산을 지키기 위해 알아야 할 모든 것을 정리합니다.',
    type: 'article',
    locale: 'ko_KR',
    url: '/guide/retirement',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

const faqItems = [
  {
    question: '1년 미만 근무해도 퇴직금을 받을 수 있나요?',
    answer:
      '근로기준법상 퇴직금은 1년 이상 계속 근로하고, 주 15시간 이상(4주 평균) 근무한 근로자에게 지급됩니다. 따라서 1년 미만 근무 시에는 법적으로 퇴직금을 청구할 수 없습니다. 다만 일부 기업은 사규에 따라 근무 기간에 비례하여 지급하기도 하니, 취업규칙이나 근로계약서를 확인해 보시기 바랍니다.',
  },
  {
    question: 'DB형에서 DC형으로 전환하면 유리한가요?',
    answer:
      '일률적으로 유리하다고 말할 수 없습니다. 향후 임금 상승이 클 것으로 예상되면 DB형이 유리하고, 임금 상승이 정체되거나 본인이 투자에 자신이 있다면 DC형이 유리할 수 있습니다. 또한 DC형은 운용 실적에 따라 원금보다 줄어들 위험도 있으므로, 전환 전 본인의 상황을 종합적으로 고려해야 합니다. DB형에서 DC형으로의 전환은 가능하지만, DC형에서 DB형으로의 역전환은 불가능하다는 점도 유의하세요.',
  },
  {
    question: '퇴직금을 일시금으로 받으면 세금이 더 많나요?',
    answer:
      '퇴직금을 IRP 계좌로 이체한 뒤 연금으로 수령하면, 퇴직소득세의 60~70%만 부과됩니다. 즉 연금 수령 시 세금 감면 혜택이 있어 일시금보다 세금 부담이 적습니다. 55세 이후 연금으로 수령하면 10년 차까지는 퇴직소득세의 70%, 11년 차부터는 60%만 과세됩니다. 장기적으로 연금 수령이 절세에 유리합니다.',
  },
  {
    question: 'IRP에 추가 납입하면 어떤 세금 혜택이 있나요?',
    answer:
      'IRP에 추가 납입한 금액은 연간 900만원 한도(연금저축 합산)로 세액공제를 받을 수 있습니다. 총급여 5,500만원 이하(종합소득금액 4,500만원 이하)이면 납입액의 16.5%, 초과하면 13.2%의 세액공제율이 적용됩니다. 예를 들어 총급여 5,000만원인 근로자가 IRP에 연 700만원을 납입하면 약 115만 5천원의 세액공제를 받을 수 있습니다.',
  },
  {
    question: '퇴직금 중간정산을 받으면 불이익이 있나요?',
    answer:
      '중간정산을 받으면 그 시점까지의 퇴직금이 정산되어, 이후 퇴직 시에는 중간정산 이후의 근속연수만으로 퇴직금이 산정됩니다. 또한 중간정산 시점에 퇴직소득세가 부과되며, 최종 퇴직 시에도 별도로 퇴직소득세가 계산되어 근속연수공제 혜택이 분산됩니다. 결과적으로 장기 근속자의 경우 중간정산 없이 한 번에 받는 것이 세금 면에서 유리할 수 있습니다.',
  },
  {
    question: '계약직도 퇴직금을 받을 수 있나요?',
    answer:
      '네, 계약직이라 하더라도 1년 이상 계속 근무하고 주 15시간 이상 근로한 경우 퇴직금 지급 대상입니다. 계약 기간이 1년 미만이더라도 계약이 갱신되어 총 근무 기간이 1년 이상이면 퇴직금을 받을 수 있습니다. 고용 형태(정규직, 계약직, 파트타임)와 관계없이 근로기준법상의 조건만 충족하면 퇴직금을 청구할 권리가 있습니다.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function RetirementGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="space-y-8">
        {/* 헤더 */}
        <header>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/guide" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              가이드
            </Link>
            <span>/</span>
            <span className="text-gray-700 dark:text-gray-200">퇴직금과 퇴직연금</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            퇴직금과 퇴직연금 완벽 가이드
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            직장 생활을 하면서 퇴직금은 누구나 한 번쯤 궁금해하는 주제입니다. 하지만 DB형, DC형,
            IRP 등 복잡한 용어와 제도 때문에 정확히 이해하기 어려운 것이 사실입니다. 이 가이드에서는
            퇴직금의 기본 개념부터 계산 방법, 퇴직연금 종류별 비교, 퇴직소득세 절세 전략까지
            2026년 최신 기준으로 빠짐없이 정리합니다.
          </p>
        </header>

        {/* 1. 소개 - 퇴직급여란 무엇인가 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            1. 퇴직급여란 무엇인가
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            퇴직급여는 근로자가 일정 기간 이상 근무한 뒤 퇴직할 때 사용자(회사)로부터 지급받는
            금전적 보상입니다. 한국의 근로기준법은 1년 이상 계속 근로한 근로자에게 퇴직급여를
            지급하도록 의무화하고 있으며, 이는 근로자의 노후 생활 안정과 퇴직 후 재취업까지의
            생활을 보장하기 위한 제도입니다.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            퇴직급여 제도는 크게 <strong className="text-gray-900 dark:text-gray-100">퇴직금 제도</strong>와{' '}
            <strong className="text-gray-900 dark:text-gray-100">퇴직연금 제도</strong>로 나뉩니다.
            퇴직금 제도는 전통적인 방식으로, 퇴직 시 일시금으로 지급하는 형태입니다. 반면 퇴직연금
            제도는 2005년 12월 도입된 제도로, 회사가 금융기관에 퇴직급여 재원을 적립하고 운용하여
            근로자가 퇴직 시 연금 또는 일시금으로 수령하는 방식입니다.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            2022년 4월부터는 모든 사업장에 퇴직연금 제도 도입이 의무화되었으며, 기존의 퇴직금
            제도를 운영하던 사업장도 점진적으로 퇴직연금으로 전환하고 있습니다. 어떤 제도에
            가입되어 있든, 근로자의 퇴직급여 수급권은 법적으로 보호받습니다.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-semibold mb-1">
              퇴직급여 수급 요건
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
              <li>1년 이상 계속 근로 (계약 갱신 포함)</li>
              <li>4주간 평균 주 15시간 이상 근무</li>
              <li>정규직, 계약직, 파트타임 등 고용 형태 무관</li>
            </ul>
          </div>
        </section>

        {/* 2. 퇴직금 계산 방법 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            2. 퇴직금 계산 방법
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              기본 공식
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
              <p className="text-base font-bold text-gray-900 dark:text-gray-50">
                퇴직금 = 1일 평균임금 x 30일 x (재직일수 / 365)
              </p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              퇴직금 계산의 핵심은 <strong className="text-gray-900 dark:text-gray-100">&lsquo;1일 평균임금&rsquo;</strong>을
              정확히 산정하는 것입니다. 평균임금이란 퇴직일 이전 3개월간 지급받은 임금 총액을
              그 기간의 총 일수로 나눈 금액을 말합니다. 여기서 &lsquo;임금 총액&rsquo;에는 기본급뿐 아니라
              정기적으로 지급되는 각종 수당(직책수당, 식대, 교통비 등), 그리고 상여금의 3/12에
              해당하는 금액이 포함됩니다.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              평균임금 산정 기준
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              평균임금 산정 시 포함되는 항목과 제외되는 항목을 정확히 구분하는 것이 중요합니다.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">포함 항목</p>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1 list-disc list-inside">
                  <li>기본급</li>
                  <li>고정 수당 (직책수당, 직무수당 등)</li>
                  <li>정기 상여금의 3/12</li>
                  <li>연차수당 (미사용 연차 포함)</li>
                  <li>식대, 교통비 (임금 성격인 경우)</li>
                  <li>연장·야간·휴일 근로수당</li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">제외 항목</p>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1 list-disc list-inside">
                  <li>경조사비 (일시적 지급)</li>
                  <li>출장비 (실비 변상)</li>
                  <li>해고예고수당</li>
                  <li>퇴직금 자체</li>
                  <li>복리후생비 (회사 재량)</li>
                  <li>성과급 (임금으로 인정되지 않는 경우)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              계산 예시: 연봉 5,000만원, 3년 근무
            </h3>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 space-y-3">
              <p className="text-sm text-amber-900 dark:text-amber-100 font-semibold">전제 조건</p>
              <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1 list-disc list-inside">
                <li>연봉 5,000만원 (월 기본급 약 416만 6,667원)</li>
                <li>상여금: 없음 (연봉에 포함된 것으로 가정)</li>
                <li>재직 기간: 3년 (1,095일)</li>
                <li>퇴직 전 3개월 급여 총액: 12,500,000원</li>
                <li>퇴직 전 3개월 총 일수: 91일 (31+28+31, 1~3월 기준)</li>
              </ul>

              <div className="border-t border-amber-200 dark:border-amber-700 pt-3 space-y-2">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>1일 평균임금</strong> = 12,500,000원 / 91일 = <strong>137,362원</strong>
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>퇴직금</strong> = 137,362원 x 30일 x (1,095일 / 365일)
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  = 137,362 x 30 x 3
                </p>
                <p className="text-base font-bold text-amber-900 dark:text-amber-100">
                  = 약 12,362,580원 (세전)
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              실무에서는 상여금, 각종 수당, 연차수당 등이 포함되면 평균임금이 달라지므로,
              실제 퇴직금은 위 금액보다 많아질 수 있습니다. 특히 퇴직 직전 3개월 동안의 연장근로,
              야간근로 수당 등이 포함되면 평균임금이 높아져 퇴직금도 증가합니다.
            </p>
          </div>
        </section>

        {/* 광고 배너 1 */}
        <AdBanner format="horizontal" className="min-h-[100px]" adPosition="guide-retirement-mid1" />

        {/* 3. 퇴직연금제도 종류 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            3. 퇴직연금제도 종류
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            퇴직연금은 회사가 근로자의 퇴직급여를 외부 금융기관에 적립하고 운용하는 제도입니다.
            근로자는 퇴직 시 이를 연금 또는 일시금으로 수령할 수 있습니다. 크게 DB형(확정급여형)과
            DC형(확정기여형)으로 나뉘며, 각각의 특징이 뚜렷하게 다릅니다.
          </p>

          <div className="space-y-4">
            <div className="border border-blue-200 dark:border-blue-700 rounded-xl p-4 space-y-2">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                DB형 (확정급여형, Defined Benefit)
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                DB형은 <strong className="text-gray-900 dark:text-gray-100">퇴직 시 받을 급여가 사전에 확정</strong>되는
                방식입니다. 회사가 적립금을 운용하며, 운용 성과와 관계없이 근로자는 근속연수에 비례하여
                정해진 금액을 수령합니다. 전통적인 퇴직금 제도와 가장 유사한 형태입니다.
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>퇴직급여 = 퇴직 직전 3개월 평균임금 x 근속연수</li>
                <li>운용 책임: 회사 (운용 손실 시 회사가 부담)</li>
                <li>임금 상승률이 높을수록 유리</li>
                <li>장기 근속자에게 유리한 구조</li>
                <li>근로자가 직접 운용에 관여할 수 없음</li>
              </ul>
            </div>

            <div className="border border-green-200 dark:border-green-700 rounded-xl p-4 space-y-2">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                DC형 (확정기여형, Defined Contribution)
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                DC형은 <strong className="text-gray-900 dark:text-gray-100">회사가 매년 납입하는 부담금이 확정</strong>되는
                방식입니다. 회사는 매년 연간 임금 총액의 1/12 이상을 근로자 개인 계좌에 납입하고,
                근로자가 직접 적립금을 운용합니다. 퇴직 시 적립금과 운용 수익을 합산한 금액을 수령합니다.
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li>퇴직급여 = 매년 적립된 부담금 + 운용 수익(또는 손실)</li>
                <li>운용 책임: 근로자 본인</li>
                <li>투자 역량에 따라 수령액이 달라짐</li>
                <li>임금 상승이 정체되거나 이직이 잦은 경우 유리</li>
                <li>근로자가 예금, 펀드, ETF 등 직접 상품 선택</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              DB형 vs DC형 비교
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                      구분
                    </th>
                    <th className="text-left p-3 font-semibold text-blue-700 dark:text-blue-300 border-b border-gray-200 dark:border-gray-600">
                      DB형 (확정급여)
                    </th>
                    <th className="text-left p-3 font-semibold text-green-700 dark:text-green-300 border-b border-gray-200 dark:border-gray-600">
                      DC형 (확정기여)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3 font-medium">급여 결정</td>
                    <td className="p-3">퇴직 시 평균임금 기준</td>
                    <td className="p-3">적립금 + 운용수익</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3 font-medium">운용 주체</td>
                    <td className="p-3">회사</td>
                    <td className="p-3">근로자 본인</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3 font-medium">운용 위험</td>
                    <td className="p-3">회사 부담</td>
                    <td className="p-3">근로자 부담</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3 font-medium">임금 상승 시</td>
                    <td className="p-3">유리 (퇴직금 증가)</td>
                    <td className="p-3">영향 제한적</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3 font-medium">임금 정체 시</td>
                    <td className="p-3">불리</td>
                    <td className="p-3">운용 성과에 따라 유리 가능</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3 font-medium">중도 인출</td>
                    <td className="p-3">불가</td>
                    <td className="p-3">법정 사유 시 가능</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3 font-medium">추가 납입</td>
                    <td className="p-3">불가</td>
                    <td className="p-3">근로자 추가 납입 가능</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">적합 대상</td>
                    <td className="p-3">장기 근속, 임금 상승 예상</td>
                    <td className="p-3">이직 잦은 경우, 투자 관심</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. IRP (개인형퇴직연금) */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            4. IRP (개인형퇴직연금)
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            IRP(Individual Retirement Pension)는 근로자가 퇴직하거나 이직할 때 퇴직급여를
            자신의 명의 계좌에 적립하여 노후 자금으로 활용할 수 있는 개인형 퇴직연금 계좌입니다.
            2022년 4월부터 퇴직금을 수령할 때 반드시 IRP 계좌를 경유해야 하며, 이 계좌에서
            일시금 인출 또는 연금 수령 방식을 선택할 수 있습니다.
          </p>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              퇴직금 수령 시 필수 경유
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              2022년 4월 14일부터 시행된 개정 근로자퇴직급여보장법에 따라, 55세 미만의 퇴직자는
              퇴직급여를 반드시 IRP 계좌로 이전받아야 합니다. 다만 퇴직금이 300만원 이하이거나,
              55세 이후 퇴직하는 경우 등 일부 예외 사항이 있습니다. IRP로 이전받은 후에도 필요에
              따라 일시금으로 인출할 수 있지만, 이 경우 퇴직소득세가 전액 부과됩니다.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              추가 납입과 세액공제 혜택
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              IRP의 가장 큰 장점 중 하나는 추가 납입을 통한 세액공제 혜택입니다. 연금저축과
              합산하여 연간 최대 900만원까지 세액공제를 받을 수 있으며, 이 중 연금저축에는
              최대 600만원까지 납입할 수 있습니다.
            </p>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">세액공제 한도 및 공제율</p>
              <ul className="text-sm text-indigo-700 dark:text-indigo-300 space-y-1 list-disc list-inside">
                <li>연금저축 + IRP 합산 연 900만원 한도</li>
                <li>연금저축 단독: 연 600만원 한도</li>
                <li>총급여 5,500만원 이하: 납입액의 <strong>16.5%</strong> 공제</li>
                <li>총급여 5,500만원 초과: 납입액의 <strong>13.2%</strong> 공제</li>
                <li>최대 세액공제 금액: 900만원 x 16.5% = <strong>148만 5천원</strong></li>
              </ul>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              예를 들어, 연금저축에 600만원을 납입하고 IRP에 300만원을 추가 납입하면
              합산 900만원에 대해 세액공제를 받을 수 있습니다. 총급여가 5,500만원 이하인
              경우 최대 148만 5천원, 초과하는 경우 최대 118만 8천원의 세금을 돌려받을 수 있어
              연말정산에서 매우 유용한 절세 수단입니다.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              IRP 운용 상품
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              IRP 계좌 내에서 다양한 금융 상품에 투자할 수 있습니다. 다만 위험자산(주식형 펀드,
              ETF 등)에는 적립금의 최대 70%까지만 투자할 수 있는 제한이 있으며, 나머지 30%는
              원리금보장상품(예금, 채권형 펀드 등)으로 운용해야 합니다. 이는 노후 자금의 안정성을
              확보하기 위한 규정입니다.
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
              <li>원리금보장상품: 정기예금, GIC, 이율보증보험 등</li>
              <li>실적배당상품: 국내외 주식형 펀드, 채권형 펀드, 혼합형 펀드, ETF, 리츠 등</li>
              <li>위험자산 투자 한도: 적립금의 70%까지</li>
              <li>디폴트옵션: 운용 지시를 하지 않을 경우 자동 배분되는 사전지정운용제도</li>
            </ul>
          </div>
        </section>

        {/* 5. 퇴직소득세 계산 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            5. 퇴직소득세 계산
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            퇴직금은 다른 소득과 분류되어 과세됩니다. 퇴직소득세는 장기간 근무한 대가를 한꺼번에
            받는 것이므로, 일반 근로소득세보다 낮은 세율이 적용되도록 설계되어 있습니다.
            특히 &lsquo;환산급여&rsquo; 방식을 통해 근속연수를 고려한 과세가 이루어집니다.
          </p>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              퇴직소득 과세 체계
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              퇴직소득세는 다음과 같은 단계를 거쳐 계산됩니다. 이 과정은 다소 복잡하지만,
              근속연수가 길수록 세금 부담이 줄어드는 구조입니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2">
              <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-decimal list-inside">
                <li><strong>퇴직급여액</strong> 확정 (퇴직금 총액)</li>
                <li><strong>근속연수공제</strong> 차감 (근속연수에 따른 공제액)</li>
                <li><strong>환산급여</strong> 계산 = (퇴직급여 - 근속연수공제) x 12 / 근속연수</li>
                <li><strong>환산급여공제</strong> 차감</li>
                <li><strong>과세표준</strong> 확정 = 환산급여 - 환산급여공제</li>
                <li>기본세율 적용하여 <strong>환산산출세액</strong> 계산</li>
                <li><strong>퇴직소득 산출세액</strong> = 환산산출세액 x 근속연수 / 12</li>
              </ol>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              근속연수공제
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              근속연수에 따라 차등 공제가 적용됩니다. 근속연수가 길수록 공제 금액이 커져
              세금 부담이 줄어듭니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                      근속연수
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                      공제액
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">5년 이하</td>
                    <td className="p-3">100만원 x 근속연수</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">6년 ~ 10년</td>
                    <td className="p-3">500만원 + 200만원 x (근속연수 - 5년)</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-3">11년 ~ 20년</td>
                    <td className="p-3">1,500만원 + 250만원 x (근속연수 - 10년)</td>
                  </tr>
                  <tr>
                    <td className="p-3">20년 초과</td>
                    <td className="p-3">4,000만원 + 300만원 x (근속연수 - 20년)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              퇴직소득세 계산 예시
            </h3>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 space-y-3">
              <p className="text-sm text-amber-900 dark:text-amber-100 font-semibold">
                전제: 퇴직금 5,000만원, 근속연수 10년
              </p>
              <div className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
                <p>1. 근속연수공제 = 500만원 + 200만원 x (10-5) = <strong>1,500만원</strong></p>
                <p>2. 환산급여 = (5,000만원 - 1,500만원) x 12 / 10 = <strong>4,200만원</strong></p>
                <p>3. 환산급여공제 = 800만원 + (4,200만원 - 800만원) x 60% = <strong>2,840만원</strong></p>
                <p>4. 과세표준 = 4,200만원 - 2,840만원 = <strong>1,360만원</strong></p>
                <p>5. 환산산출세액 = 1,360만원 x 6%(기본세율) = <strong>81만 6천원</strong></p>
                <p>6. 퇴직소득 산출세액 = 81만 6천원 x 10 / 12 = <strong>약 68만원</strong></p>
              </div>
              <p className="text-sm text-amber-900 dark:text-amber-100 font-semibold border-t border-amber-200 dark:border-amber-700 pt-2">
                실효세율: 약 1.36% (일반 근로소득세보다 현저히 낮음)
              </p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              위 예시처럼 퇴직소득세는 환산 과정을 거치기 때문에 실효세율이 매우 낮습니다.
              근속연수가 길수록 근속연수공제와 환산 효과로 인해 세금 부담이 더욱 줄어들게 됩니다.
              또한, IRP를 통해 연금으로 수령하면 위 세액에서 추가로 30~40%를 감면받을 수 있습니다.
            </p>
          </div>
        </section>

        {/* 광고 배너 2 */}
        <AdBanner format="horizontal" className="min-h-[100px]" adPosition="guide-retirement-mid2" />

        {/* 6. 중간정산 제도 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            6. 퇴직금 중간정산 제도
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            퇴직금 중간정산은 근로자가 재직 중에 퇴직금을 미리 정산하여 수령하는 제도입니다.
            2012년 7월부터 중간정산이 원칙적으로 금지되었지만, 근로자의 생활 안정을 위해
            아래와 같은 법정 사유에 해당하는 경우에 한하여 예외적으로 중간정산이 허용됩니다.
          </p>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              중간정산 가능한 경우
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-decimal list-inside">
                <li>무주택 근로자가 본인 명의로 <strong>주택을 구입</strong>하는 경우</li>
                <li>무주택 근로자가 주거 목적으로 <strong>전세금 또는 보증금</strong>을 부담하는 경우 (1회 한정)</li>
                <li>근로자 본인, 배우자, 부양가족이 6개월 이상 <strong>요양</strong>이 필요한 경우</li>
                <li>최근 5년 이내 <strong>파산선고</strong>를 받은 경우</li>
                <li>최근 5년 이내 <strong>개인회생절차 개시</strong> 결정을 받은 경우</li>
                <li>사용자가 기존의 <strong>정년을 연장</strong>하거나, <strong>보장단위 전환</strong> 등으로 퇴직금 감소가 예상되는 경우</li>
                <li><strong>임금피크제</strong>로 임금이 줄어드는 경우</li>
                <li>그 밖에 <strong>천재지변</strong> 등 고용노동부장관이 정하는 사유에 해당하는 경우</li>
              </ol>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              중간정산의 세금 영향
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              중간정산을 받으면 그 시점까지의 근속연수에 대해 퇴직소득세가 부과됩니다.
              이후 최종 퇴직 시에는 중간정산 이후의 근속연수만으로 퇴직금이 산정되므로,
              근속연수공제 혜택이 분산됩니다. 결과적으로 한 번에 퇴직금을 받을 때보다
              총 세금 부담이 커질 수 있습니다.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
                <strong>주의:</strong> 중간정산 후에는 해당 기간의 퇴직금이 이미 정산되었으므로,
                최종 퇴직 시 퇴직금은 중간정산 이후부터 퇴직일까지의 기간만을 기준으로 계산됩니다.
                따라서 중간정산을 받기 전에 세금 차이를 반드시 계산해 보시기 바랍니다.
              </p>
            </div>
          </div>
        </section>

        {/* 7. 퇴직금 지급 기한 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            7. 퇴직금 지급 기한
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            근로기준법 제36조에 따라, 사용자는 근로자가 퇴직한 날로부터 <strong className="text-gray-900 dark:text-gray-100">14일 이내</strong>에
            퇴직금을 포함한 모든 금품을 지급해야 합니다. 다만 특별한 사정이 있는 경우 당사자 간
            합의를 통해 기한을 연장할 수 있습니다.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            만약 정당한 사유 없이 14일 이내에 퇴직금을 지급하지 않으면, 그 다음 날부터 지급일까지의
            기간에 대해 <strong className="text-gray-900 dark:text-gray-100">연 20%의 지연이자</strong>가 발생합니다.
            이는 근로자퇴직급여보장법 제9조에 근거한 것으로, 사용자에게 퇴직금의 신속한 지급을
            강제하기 위한 규정입니다.
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-red-800 dark:text-red-200">
              퇴직금 미지급 시 대응 방법
            </p>
            <ol className="text-sm text-red-700 dark:text-red-300 space-y-1 list-decimal list-inside">
              <li>퇴직일로부터 14일 경과 후에도 미지급 시, 사업주에게 서면으로 지급 요청</li>
              <li>여전히 미지급 시, 관할 고용노동부(노동청)에 <strong>진정 또는 고소</strong> 접수</li>
              <li>노동위원회에 <strong>체당금 신청</strong> (사업주 파산·도산 시)</li>
              <li>민사소송을 통한 퇴직금 청구 (소멸시효: 퇴직일로부터 <strong>3년</strong>)</li>
            </ol>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            퇴직금 청구권의 소멸시효는 퇴직일로부터 3년입니다. 이 기간이 지나면 법적으로
            퇴직금을 청구할 수 없게 되므로, 퇴직 후 퇴직금을 받지 못했다면 가능한 빨리
            조치를 취하는 것이 중요합니다.
          </p>
        </section>

        {/* 8. 실전 팁: 퇴직 전 체크리스트 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            8. 퇴직 전 체크리스트
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            퇴직을 앞두고 있다면, 다음 항목들을 미리 확인하고 준비하여 퇴직금을 최대한 유리하게
            수령하세요.
          </p>

          <div className="space-y-3">
            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">퇴직연금 가입 유형 확인</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">DB형인지 DC형인지 확인하고, 현재 적립 현황을 조회하세요. DC형이라면 운용 수익률도 점검합니다.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">IRP 계좌 개설</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">퇴직금을 수령할 IRP 계좌를 미리 개설해 두세요. 증권사, 은행, 보험사 모두 개설 가능하며, 운용 상품과 수수료를 비교하여 선택하세요.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">평균임금 산정 요소 점검</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">퇴직 전 3개월의 급여 명세서를 확인하세요. 빠진 수당이 없는지, 고정 수당이 정상 반영되었는지 점검합니다.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">미사용 연차 확인</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">미사용 연차휴가 수당은 평균임금 산정에 포함됩니다. 남은 연차를 확인하고, 연차수당이 퇴직금에 반영되는지 체크하세요.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">수령 방식 결정 (일시금 vs 연금)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">55세 이후라면 연금 수령이 세금 면에서 유리합니다. 당장 목돈이 필요하지 않다면 IRP에 그대로 두고 연금으로 수령하는 것을 고려하세요.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">6</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">퇴직소득세 예상 계산</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">예상 퇴직금에서 실제 수령액이 얼마인지 미리 계산해 보세요. 근속연수에 따른 공제 혜택을 확인할 수 있습니다.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">7</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">건강보험 임의계속 가입 검토</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">퇴직 후에도 기존 직장 건강보험료를 최대 36개월간 유지할 수 있습니다. 지역가입자보다 유리한 경우가 많으니 확인하세요.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold">8</span>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">실업급여 수급 요건 확인</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">비자발적 퇴직(권고사직, 계약만료 등)의 경우 실업급여를 받을 수 있습니다. 수급 요건과 신청 절차를 미리 알아두세요.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            자주 묻는 질문 (FAQ)
          </h2>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details
                key={index}
                className="group border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 pr-4">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 text-gray-400 dark:text-gray-500 group-open:rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 10. CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center shadow-lg space-y-3">
          <h2 className="text-xl font-bold text-white">
            내 퇴직금, 지금 바로 계산해 보세요
          </h2>
          <p className="text-white/90 text-sm leading-relaxed">
            연봉 실수령액 계산기로 현재 급여에서 공제되는 4대보험과 소득세를 확인하고,
            퇴직 시 예상 수령액까지 미리 파악해 보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/"
              className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md"
            >
              연봉 실수령액 계산하기
            </Link>
            <Link
              href="/guide"
              className="inline-block bg-white/10 text-white font-bold px-8 py-3 rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/30"
            >
              다른 가이드 보기
            </Link>
          </div>
        </section>

        {/* 하단 네비게이션 */}
        <nav className="flex flex-col sm:flex-row gap-3 text-sm">
          <Link
            href="/guide"
            className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-md transition-shadow text-center"
          >
            <span className="text-gray-500 dark:text-gray-400 block text-xs mb-1">가이드 목록</span>
            <span className="text-gray-800 dark:text-gray-100 font-semibold">급여·세금 가이드</span>
          </Link>
          <Link
            href="/"
            className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 shadow hover:shadow-md transition-shadow text-center"
          >
            <span className="text-gray-500 dark:text-gray-400 block text-xs mb-1">계산기로 이동</span>
            <span className="text-gray-800 dark:text-gray-100 font-semibold">연봉 실수령액 계산기</span>
          </Link>
        </nav>
      </article>
    </>
  );
}
