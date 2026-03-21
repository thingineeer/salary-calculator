import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '2026년 근로소득세 완벽 가이드 - 과세표준·세율·공제 총정리',
  description:
    '근로소득세의 계산 원리부터 과세표준 구간, 세액공제, 연말정산까지. 2026년 최신 세율 기준으로 직장인이 알아야 할 소득세의 모든 것을 정리합니다.',
  alternates: { canonical: '/guide/income-tax' },
  openGraph: {
    title: '2026년 근로소득세 완벽 가이드 - 과세표준·세율·공제 총정리',
    description:
      '근로소득세의 계산 원리부터 과세표준 구간, 세액공제, 연말정산까지. 2026년 최신 세율 기준으로 직장인이 알아야 할 소득세의 모든 것을 정리합니다.',
    type: 'article',
    locale: 'ko_KR',
    url: '/guide/income-tax',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

const faqItems = [
  {
    question: '근로소득세는 연봉의 몇 퍼센트인가요?',
    answer:
      '근로소득세는 단순히 연봉에 일정 비율을 곱하는 것이 아닙니다. 총급여에서 비과세소득을 빼고, 근로소득공제와 각종 소득공제를 적용한 후 남은 과세표준에 대해 6%~45%의 누진세율을 적용합니다. 예를 들어 연봉 5,000만 원인 경우, 실효세율은 약 3~5% 수준이며, 각종 공제 항목에 따라 달라집니다. 연봉이 높을수록 실효세율도 높아지지만, 최고세율 45%가 전체 소득에 적용되는 것은 아닙니다.',
  },
  {
    question: '원천징수된 소득세는 돌려받을 수 있나요?',
    answer:
      '네, 연말정산을 통해 돌려받을 수 있습니다. 매월 원천징수되는 소득세는 간이세액표에 따른 예상 세액이므로, 실제 연간 세액보다 많이 납부한 경우 차액을 환급받게 됩니다. 반대로 적게 납부한 경우에는 추가 납부해야 합니다. 연말정산 시 의료비, 교육비, 기부금, 연금저축 등 다양한 공제 항목을 적용하면 환급 가능성이 높아집니다.',
  },
  {
    question: '소득세와 지방소득세의 차이는 무엇인가요?',
    answer:
      '소득세(근로소득세)는 국세로서 국가에 납부하는 세금이고, 지방소득세는 지방세로서 거주지 지방자치단체에 납부하는 세금입니다. 지방소득세는 소득세의 10%로 계산되며, 소득세와 함께 원천징수됩니다. 예를 들어 소득세가 100만 원이면 지방소득세는 10만 원이 추가되어 총 110만 원의 세금을 납부하게 됩니다.',
  },
  {
    question: '간이세액표의 80%, 100%, 120% 선택은 어떤 의미인가요?',
    answer:
      '간이세액표 비율 선택은 매월 원천징수할 소득세 금액을 조절하는 것입니다. 80%를 선택하면 매월 적게 떼이지만 연말정산 때 추가 납부할 가능성이 높고, 120%를 선택하면 매월 많이 떼이지만 연말정산 때 환급받을 가능성이 높습니다. 100%가 기본값이며, 개인의 소비 패턴과 공제 항목에 따라 선택하면 됩니다. 총 연간 세액은 동일하므로, 현금 흐름 선호에 따라 결정하시면 됩니다.',
  },
  {
    question: '연봉이 오르면 세금이 급격히 늘어나나요?',
    answer:
      '한국의 소득세는 누진세 구조이므로 연봉이 오르면 세금도 증가하지만, "급격히" 늘어나지는 않습니다. 예를 들어 과세표준이 1,400만 원에서 1,500만 원으로 오르면, 추가된 100만 원에 대해서만 15% 세율이 적용되고 기존 1,400만 원에는 여전히 6%가 적용됩니다. 이것이 누진세의 핵심 원리입니다. 따라서 "세율 구간이 바뀌면 전체 소득에 높은 세율이 적용된다"는 것은 흔한 오해입니다.',
  },
  {
    question: '비과세 수당이 있으면 세금이 줄어드나요?',
    answer:
      '네, 비과세 수당은 소득세 과세 대상에서 제외되므로 세금을 줄이는 효과가 있습니다. 대표적인 비과세 수당으로는 월 20만 원 이하의 식대, 월 20만 원 이하의 자가운전보조금, 출산·보육수당(월 20만 원), 야간근로수당(생산직 근로자) 등이 있습니다. 같은 연봉이라도 비과세 수당의 비중이 높으면 실수령액이 더 많아집니다.',
  },
  {
    question: '신입사원도 연말정산을 해야 하나요?',
    answer:
      '네, 해당 연도에 근로소득이 발생했다면 연말정산 대상입니다. 입사 전 다른 회사에서 근무한 경우 전 직장의 원천징수영수증을 제출해야 하고, 입사 전 소득이 없었다면 입사 후 발생한 소득에 대해서만 정산합니다. 신입사원은 근무 기간이 짧아 공제 항목이 적을 수 있지만, 기본공제와 근로소득세액공제는 적용되므로 환급을 받는 경우가 많습니다.',
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

export default function IncomeTaxGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="space-y-8">
        {/* 브레드크럼 */}
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            홈
          </Link>
          <span className="mx-2">/</span>
          <Link href="/guide" className="hover:text-blue-600 dark:hover:text-blue-400">
            가이드
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 dark:text-gray-200">근로소득세</span>
        </nav>

        {/* 헤더 */}
        <header>
          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
            소득세
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            2026년 근로소득세 완벽 가이드
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            매달 월급에서 빠져나가는 소득세, 어떻게 계산되는지 정확히 알고 계신가요?
            이 가이드에서는 근로소득세의 기본 개념부터 과세표준 구간, 근로소득공제,
            세액공제, 원천징수, 연말정산까지 2026년 최신 기준으로 빠짐없이 정리합니다.
            내 월급 명세서를 완벽하게 이해하고, 합리적으로 세금을 관리하는 첫걸음을
            시작해 보세요.
          </p>
        </header>

        {/* 목차 */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 mb-3">
            목차
          </h2>
          <ol className="space-y-1.5 text-sm text-blue-700 dark:text-blue-400">
            <li>
              <a href="#what-is" className="hover:underline">
                1. 근로소득세란 무엇인가
              </a>
            </li>
            <li>
              <a href="#tax-brackets" className="hover:underline">
                2. 2026년 소득세 과세표준 구간
              </a>
            </li>
            <li>
              <a href="#earned-income-deduction" className="hover:underline">
                3. 근로소득공제 계산 방법
              </a>
            </li>
            <li>
              <a href="#calculation-process" className="hover:underline">
                4. 과세표준 산출 과정 (연봉 5,000만 원 예시)
              </a>
            </li>
            <li>
              <a href="#tax-credits" className="hover:underline">
                5. 세액공제 종류
              </a>
            </li>
            <li>
              <a href="#withholding" className="hover:underline">
                6. 원천징수와 연말정산의 관계
              </a>
            </li>
            <li>
              <a href="#simplified-tax-table" className="hover:underline">
                7. 간이세액표란 무엇인가
              </a>
            </li>
            <li>
              <a href="#local-income-tax" className="hover:underline">
                8. 지방소득세
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline">
                9. 자주 묻는 질문 (FAQ)
              </a>
            </li>
          </ol>
        </div>

        {/* 1. 근로소득세란 무엇인가 */}
        <section id="what-is" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            1. 근로소득세란 무엇인가
          </h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              근로소득세는 근로자가 고용관계에 따라 받는 급여, 상여, 수당 등 근로소득에
              대해 부과되는 국세입니다. 대한민국에서 소득이 있는 곳에 세금이 있다는 원칙에
              따라, 직장인의 월급에서 매달 일정 금액이 소득세로 원천징수됩니다. 이 세금은
              국가 재정의 핵심 수입원 중 하나로, 교육, 국방, 복지, 사회기반시설 등 공공
              서비스의 재원으로 사용됩니다.
            </p>
            <p>
              근로소득세의 핵심 특징은 <strong className="text-gray-900 dark:text-gray-100">누진세율 구조</strong>라는
              점입니다. 이는 소득이 높을수록 더 높은 세율을 적용받는 구조로, 소득 재분배
              기능을 수행합니다. 다만 흔히 오해하는 것과 달리, 소득 전체에 최고세율이
              적용되는 것이 아니라 각 구간별로 해당 세율이 적용되는 초과누진세율 방식을
              사용합니다. 예를 들어 연 과세표준이 6,000만 원인 경우, 1,400만 원까지는 6%,
              1,400만 원 초과~5,000만 원까지는 15%, 5,000만 원 초과~6,000만 원에 대해서만
              24%가 적용됩니다.
            </p>
            <p>
              근로소득세를 정확하게 이해하려면 몇 가지 핵심 개념을 구분해야 합니다.
              먼저 <strong className="text-gray-900 dark:text-gray-100">총급여</strong>는 회사에서 지급하는 연간 급여
              총액에서 비과세소득을 뺀 금액입니다. 여기서 <strong className="text-gray-900 dark:text-gray-100">근로소득공제</strong>를
              차감하면 <strong className="text-gray-900 dark:text-gray-100">근로소득금액</strong>이 되고, 다시 각종
              소득공제(인적공제, 연금보험료공제, 특별소득공제 등)를 빼면 최종적으로
              <strong className="text-gray-900 dark:text-gray-100"> 과세표준</strong>이 산출됩니다. 이 과세표준에 세율을 적용하여
              산출세액을 구하고, 여기에 세액공제를 반영하면 최종 결정세액이 됩니다.
            </p>
            <p>
              직장인이라면 대부분 회사의 급여 담당자가 매월 간이세액표에 따라 소득세를
              원천징수하고, 연말정산을 통해 실제 세액과의 차이를 정산합니다. 따라서
              근로소득세의 구조를 이해하면 매달 내 월급에서 왜 이 금액이 빠지는지 알 수
              있고, 연말정산에서 어떤 공제를 챙겨야 세금을 줄일 수 있는지도 파악할 수
              있습니다. 아래에서 각 단계를 자세히 살펴보겠습니다.
            </p>
          </div>
        </section>

        {/* 2. 과세표준 구간 */}
        <section id="tax-brackets" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            2. 2026년 소득세 과세표준 구간 (8단계 누진세율)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              2026년 현재 대한민국의 소득세는 8단계 초과누진세율 구조로 운영됩니다.
              과세표준은 총급여에서 근로소득공제와 각종 소득공제를 모두 차감한 후 남은
              금액을 의미합니다. 각 구간별 세율과 누진공제액은 아래 표와 같습니다.
              누진공제액은 계산의 편의를 위해 사용되는 값으로, 과세표준 전체에 해당 구간의
              세율을 곱한 후 누진공제액을 빼면 정확한 산출세액이 나옵니다.
            </p>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="border border-gray-200 dark:border-gray-600 px-3 py-2.5 text-left font-semibold text-gray-800 dark:text-gray-100">
                    과세표준
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 px-3 py-2.5 text-center font-semibold text-gray-800 dark:text-gray-100">
                    세율
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 px-3 py-2.5 text-right font-semibold text-gray-800 dark:text-gray-100">
                    누진공제액
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    1,400만 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-medium">
                    6%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-right">
                    -
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-700/20">
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    1,400만 원 초과 ~ 5,000만 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-medium">
                    15%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-right">
                    126만 원
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    5,000만 원 초과 ~ 8,800만 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-medium">
                    24%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-right">
                    576만 원
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-700/20">
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    8,800만 원 초과 ~ 1억 5,000만 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-medium">
                    35%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-right">
                    1,544만 원
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    1억 5,000만 원 초과 ~ 3억 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-medium">
                    38%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-right">
                    1,994만 원
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-700/20">
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    3억 원 초과 ~ 5억 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-medium">
                    40%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-right">
                    2,594만 원
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    5억 원 초과 ~ 10억 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-medium">
                    42%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-right">
                    3,594만 원
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-700/20">
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    10억 원 초과
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-center font-medium">
                    45%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 text-right">
                    6,594만 원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              위 표에서 <strong className="text-gray-900 dark:text-gray-100">누진공제액</strong>은 세금 계산을 간편하게 하기
              위한 장치입니다. 원래는 각 구간별로 세율을 따로 적용한 뒤 합산해야 하지만,
              누진공제액을 사용하면 과세표준 전체에 해당 구간 세율을 곱하고 누진공제액을
              빼는 것만으로 동일한 결과를 얻을 수 있습니다.
            </p>
            <p>
              예를 들어 과세표준이 3,000만 원이라면, 구간별 계산 방식은 1,400만 원 x 6% +
              1,600만 원 x 15% = 84만 원 + 240만 원 = 324만 원이 됩니다. 누진공제를
              사용하면 3,000만 원 x 15% - 126만 원 = 450만 원 - 126만 원 = 324만 원으로
              동일한 결과가 나옵니다. 두 방법 모두 같은 결과를 내지만, 누진공제 방식이
              훨씬 간편합니다.
            </p>
            <p>
              참고로 최고세율 45%는 과세표준 10억 원을 초과하는 부분에만 적용됩니다. 연봉
              기준으로 환산하면 각종 공제 전 총급여가 약 12~13억 원 이상이어야 해당되므로,
              대다수 직장인에게는 6%~24% 구간이 가장 많이 적용됩니다.
            </p>
          </div>
        </section>

        {/* 광고 배너 1 */}
        <AdBanner format="horizontal" className="min-h-[90px]" adPosition="guide-income-tax-mid1" />

        {/* 3. 근로소득공제 */}
        <section id="earned-income-deduction" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            3. 근로소득공제 계산 방법
          </h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              근로소득공제는 근로자가 소득을 얻기 위해 필요한 경비를 인정해 주는 제도로,
              총급여액에서 자동으로 차감됩니다. 사업소득자가 필요경비를 공제받는 것과
              유사한 개념이며, 별도의 신청이나 증빙 없이 총급여액 기준으로 자동
              계산됩니다. 근로소득공제 후 남은 금액이 근로소득금액이 되고, 여기서 추가로
              각종 소득공제를 적용받게 됩니다.
            </p>
            <p>
              2026년 기준 근로소득공제율은 총급여액 구간에 따라 다음과 같이 적용됩니다.
              총급여액이 높을수록 공제율이 낮아지는 역진적 구조를 가지고 있어, 저소득
              근로자에게 상대적으로 유리합니다.
            </p>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="border border-gray-200 dark:border-gray-600 px-3 py-2.5 text-left font-semibold text-gray-800 dark:text-gray-100">
                    총급여액
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 px-3 py-2.5 text-left font-semibold text-gray-800 dark:text-gray-100">
                    근로소득공제액
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    500만 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    총급여액의 70%
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-700/20">
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    500만 원 초과 ~ 1,500만 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    350만 원 + (총급여액 - 500만 원) x 40%
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    1,500만 원 초과 ~ 4,500만 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    750만 원 + (총급여액 - 1,500만 원) x 15%
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-700/20">
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    4,500만 원 초과 ~ 1억 원 이하
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    1,200만 원 + (총급여액 - 4,500만 원) x 5%
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    1억 원 초과
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    1,475만 원 + (총급여액 - 1억 원) x 2%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              예를 들어 총급여액이 4,800만 원인 근로자의 근로소득공제액은 다음과 같이
              계산됩니다: 1,200만 원 + (4,800만 원 - 4,500만 원) x 5% = 1,200만 원 +
              15만 원 = 1,215만 원. 따라서 근로소득금액은 4,800만 원 - 1,215만 원 =
              3,585만 원이 됩니다.
            </p>
            <p>
              총급여액이 1억 원을 초과하는 고소득자의 경우 공제율이 2%로 크게 낮아집니다.
              이는 고소득 구간에서 공제 혜택을 줄여 세수를 확보하기 위한 정책적 설계입니다.
              반면 총급여액 500만 원 이하의 저소득 근로자는 70%까지 공제받을 수 있어
              세 부담이 상당히 줄어듭니다.
            </p>
          </div>
        </section>

        {/* 4. 과세표준 산출 과정 */}
        <section id="calculation-process" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            4. 과세표준 산출 과정 (연봉 5,000만 원 예시)
          </h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              이론만으로는 이해가 어려울 수 있으니, 연봉 5,000만 원(월급 약 417만 원)인
              미혼 직장인을 가정하고 과세표준 산출 과정을 단계별로 살펴보겠습니다.
              비과세 식대는 월 20만 원(연 240만 원)으로 가정합니다.
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {/* Step 1 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                Step 1. 총급여액 계산
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                연봉 5,000만 원 - 비과세소득 240만 원 = <strong>총급여액 4,760만 원</strong>
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                비과세소득(식대 월 20만 원)은 소득세 계산 대상에서 제외됩니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                Step 2. 근로소득공제
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                총급여액 4,760만 원은 &quot;4,500만 원 초과 ~ 1억 원 이하&quot; 구간에 해당합니다.
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                1,200만 원 + (4,760만 원 - 4,500만 원) x 5% = 1,200만 원 + 13만 원 = <strong>근로소득공제 1,213만 원</strong>
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                Step 3. 근로소득금액
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                총급여액 4,760만 원 - 근로소득공제 1,213만 원 = <strong>근로소득금액 3,547만 원</strong>
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                Step 4. 소득공제 적용
              </h3>
              <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <p>기본공제 (본인): 150만 원</p>
                <p>국민연금 보험료 공제: 약 226만 원 (4,760만 원 x 4.75%)</p>
                <p>건강보험료 공제: 약 171만 원 (건강보험 + 장기요양보험)</p>
                <p>고용보험료 공제: 약 43만 원</p>
                <p className="font-medium pt-1 border-t border-blue-200 dark:border-blue-700">
                  소득공제 합계: 약 590만 원
                </p>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                실제로는 신용카드공제, 주택자금공제 등 추가 공제가 적용될 수 있습니다.
                여기서는 기본적인 항목만 반영합니다.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                Step 5. 과세표준 산출
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                근로소득금액 3,547만 원 - 소득공제 590만 원 = <strong>과세표준 약 2,957만 원</strong>
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                Step 6. 산출세액 계산
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                과세표준 2,957만 원은 &quot;1,400만 원 초과 ~ 5,000만 원 이하&quot; 구간 (세율 15%)에 해당합니다.
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                2,957만 원 x 15% - 126만 원(누진공제) = 443.55만 원 - 126만 원 = <strong>산출세액 약 317.55만 원</strong>
              </p>
            </div>

            {/* Step 7 */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <h3 className="text-sm font-bold text-green-800 dark:text-green-200 mb-2">
                Step 7. 세액공제 적용 후 결정세액
              </h3>
              <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <p>근로소득세액공제: 약 63만 원 (산출세액 기준 공제)</p>
                <p>표준세액공제: 13만 원 (특별소득공제 미적용 시)</p>
                <p className="font-medium pt-1 border-t border-green-200 dark:border-green-700">
                  결정세액: 약 317.55만 원 - 76만 원 = <strong>약 241.55만 원</strong>
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  월 환산 시 약 20.1만 원의 소득세가 발생하며, 여기에 지방소득세(10%)를 더하면
                  월 약 22.1만 원이 됩니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>참고:</strong> 위 계산은 기본적인 공제 항목만 반영한 예시입니다. 실제로는
              부양가족 수, 신용카드 사용액, 의료비, 교육비, 주택자금, 연금저축 등 다양한
              공제 항목에 따라 결정세액이 크게 달라질 수 있습니다. 정확한 계산은 상단의
              계산기를 이용해 보세요.
            </p>
          </div>
        </section>

        {/* 5. 세액공제 종류 */}
        <section id="tax-credits" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            5. 세액공제 종류
          </h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              세액공제는 산출세액에서 직접 차감되는 금액으로, 소득공제와는 다릅니다.
              소득공제는 과세표준을 줄여주는 반면, 세액공제는 이미 계산된 세금 자체를
              줄여줍니다. 같은 금액이라면 세액공제가 소득공제보다 절세 효과가 더 큽니다.
              주요 세액공제 항목을 살펴보겠습니다.
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                근로소득세액공제
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                근로소득자라면 누구나 받을 수 있는 기본적인 세액공제입니다. 산출세액 기준으로
                130만 원 이하일 때는 산출세액의 55%를, 130만 원을 초과할 때는 71.5만 원 +
                (산출세액 - 130만 원) x 30%를 공제받습니다. 다만 총급여에 따라 공제
                한도가 있어, 총급여 3,300만 원 이하는 74만 원, 3,300만 원 초과~7,000만 원
                이하는 74만 원에서 초과분의 0.8%를 차감, 7,000만 원 초과는 66만 원에서
                초과분의 0.5%를 차감한 금액이 한도입니다 (최소 50만 원).
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                자녀세액공제
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                기본공제 대상 자녀(만 8세 이상)가 있는 경우 받을 수 있습니다. 자녀 1명은
                연 15만 원, 2명은 연 35만 원, 3명 이상은 35만 원 + 셋째부터 1인당 30만 원이
                추가됩니다. 또한 해당 연도에 출산하거나 입양한 경우 첫째 30만 원, 둘째
                50만 원, 셋째 이상 70만 원의 추가 세액공제를 받을 수 있습니다. 저출생
                대책의 일환으로 출산 관련 공제가 점차 강화되고 있는 추세입니다.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                연금계좌세액공제
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                연금저축과 IRP(개인형 퇴직연금)에 납입한 금액에 대해 세액공제를 받을 수
                있습니다. 총급여 5,500만 원 이하(종합소득금액 4,500만 원 이하)인 경우
                납입액의 15%, 초과인 경우 12%를 세액공제합니다. 연금저축 한도는 연 600만 원,
                IRP 포함 시 최대 900만 원까지 공제 가능합니다. 최대 공제액은 총급여
                5,500만 원 이하 시 900만 원 x 15% = 135만 원, 초과 시 900만 원 x 12% =
                108만 원입니다. 노후 준비와 절세를 동시에 할 수 있는 대표적인 방법입니다.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                특별세액공제 (보험료·의료비·교육비·기부금)
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">보험료 세액공제:</strong> 근로자 본인과 기본공제 대상자가 납부한
                  보장성 보험료의 12%(장애인 전용 보장성 보험은 15%)를 세액공제합니다.
                  연 100만 원 한도이며, 최대 12만 원(장애인 보험 15만 원) 공제 가능합니다.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">의료비 세액공제:</strong> 총급여의 3%를 초과하는 의료비에 대해
                  15%를 세액공제합니다. 난임시술비는 30%, 미숙아·선천성이상아 의료비는 20%가
                  적용됩니다. 본인, 65세 이상자, 장애인 의료비는 한도 없이 공제 가능하고,
                  그 외 부양가족은 연 700만 원 한도입니다.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">교육비 세액공제:</strong> 본인은 대학원 포함 전액, 자녀는 유치원부터
                  대학까지의 교육비에 대해 15%를 세액공제합니다. 한도는 유치원~고등학교 연
                  300만 원, 대학생 연 900만 원, 본인은 한도 없음입니다.
                </p>
                <p>
                  <strong className="text-gray-900 dark:text-gray-100">기부금 세액공제:</strong> 법정기부금, 지정기부금 등 기부 유형에 따라
                  15% 또는 30%(1,000만 원 초과분)의 세액공제를 받을 수 있습니다. 정치자금
                  기부금은 10만 원까지 100/110 세액공제(사실상 전액 환급)됩니다.
                </p>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                표준세액공제
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                특별소득공제와 특별세액공제를 신청하지 않는 근로자는 연 13만 원의
                표준세액공제를 받을 수 있습니다. 공제받을 항목이 적은 1인 가구나 사회
                초년생의 경우, 개별 공제 합계와 비교하여 유리한 쪽을 선택하면 됩니다.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                월세 세액공제
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                무주택 세대주인 근로자(총급여 8,000만 원 이하)가 국민주택규모 이하 또는
                기준시가 4억 원 이하 주택의 월세를 지급한 경우, 월세액의 15%(총급여
                5,500만 원 이하는 17%)를 세액공제받을 수 있습니다. 연 1,000만 원 한도이며,
                최대 170만 원(5,500만 원 이하)까지 환급받을 수 있어 주거비 부담을 줄이는 데
                큰 도움이 됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* 광고 배너 2 */}
        <AdBanner format="horizontal" className="min-h-[90px]" adPosition="guide-income-tax-mid2" />

        {/* 6. 원천징수와 연말정산 */}
        <section id="withholding" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            6. 원천징수와 연말정산의 관계
          </h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              <strong className="text-gray-900 dark:text-gray-100">원천징수</strong>란 소득을 지급하는 자(회사)가 소득을
              지급할 때 소득세를 미리 떼어 국가에 납부하는 제도입니다. 직장인의 경우 매월
              급여를 받을 때 회사가 간이세액표에 따라 소득세와 지방소득세를 원천징수하고,
              세후 금액을 지급합니다. 이렇게 원천징수하는 이유는 국가 입장에서 세금을
              안정적으로 걷을 수 있고, 납세자 입장에서도 연말에 한꺼번에 큰 금액을 내는
              부담을 분산할 수 있기 때문입니다.
            </p>
            <p>
              그러나 매월 원천징수되는 세금은 간이세액표에 의한 <strong className="text-gray-900 dark:text-gray-100">예정
              납부액</strong>일 뿐, 실제 연간 세액과는 차이가 있습니다. 이 차이를 정산하는
              과정이 바로 <strong className="text-gray-900 dark:text-gray-100">연말정산</strong>입니다. 연말정산은 매년 1~2월에
              진행되며, 전년도 1월부터 12월까지의 총 근로소득에 대해 각종 소득공제와
              세액공제를 반영하여 실제 결정세액을 계산합니다.
            </p>
            <p>
              연말정산 결과, 이미 원천징수된 세금 합계가 결정세액보다 많으면 차액을
              <strong className="text-gray-900 dark:text-gray-100"> 환급</strong>받고, 적으면 <strong className="text-gray-900 dark:text-gray-100">추가 납부</strong>해야
              합니다. 흔히 &quot;13월의 월급&quot;이라 불리는 것이 바로 이 환급금입니다. 다만
              환급금이 많다는 것은 매월 필요 이상으로 세금을 많이 납부했다는 의미이기도
              하므로, 무조건 좋은 것은 아닙니다.
            </p>
            <p>
              연말정산의 핵심은 <strong className="text-gray-900 dark:text-gray-100">공제 항목을 빠짐없이 챙기는 것</strong>입니다.
              국세청 홈택스의 &quot;연말정산 간소화 서비스&quot;를 통해 대부분의 공제 자료를
              자동으로 조회할 수 있지만, 일부 항목(기부금 영수증, 장애인 증명서, 월세
              계약서 등)은 직접 제출해야 합니다. 공제 가능한 항목을 누락하면 그만큼 더 많은
              세금을 내게 되므로, 연말정산 시기에는 공제 항목을 꼼꼼히 확인하는 것이
              중요합니다.
            </p>
            <p>
              중도 퇴사한 경우에도 퇴사 시점에 연말정산이 이루어집니다. 같은 해에 다른
              회사로 이직했다면, 새 회사의 연말정산 때 전 직장의 원천징수영수증을 제출하여
              합산 정산을 받습니다. 이직 후 연말까지 취업하지 않았다면, 다음 해 5월
              종합소득세 확정신고를 통해 직접 정산해야 합니다.
            </p>
          </div>
        </section>

        {/* 7. 간이세액표 */}
        <section id="simplified-tax-table" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            7. 간이세액표란 무엇인가
          </h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              간이세액표는 국세청이 매월 원천징수할 소득세를 쉽게 산정할 수 있도록 만든
              표입니다. 월 급여액과 부양가족 수(공제 대상 가족 수)를 기준으로 원천징수할
              세액이 정해져 있어, 회사의 급여 담당자는 이 표를 보고 매월 소득세를
              원천징수합니다.
            </p>
            <p>
              간이세액표에서 산출되는 세액은 연간 근로소득에 대한 세금을 12개월로 나눈
              추정치입니다. 이 추정치는 근로자가 부양가족 수 외에 다른 공제 항목이 없다고
              가정하여 산출되므로, 실제 연간 결정세액과는 차이가 날 수밖에 없습니다. 이
              차이를 연말정산에서 정리하는 것입니다.
            </p>
            <p>
              근로자는 간이세액표 적용 비율을 <strong className="text-gray-900 dark:text-gray-100">80%, 100%, 120%</strong> 중에서
              선택할 수 있습니다. 기본값은 100%이며, 회사에 &quot;근로소득 원천징수세액
              조정신청서&quot;를 제출하여 변경할 수 있습니다.
            </p>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="border border-gray-200 dark:border-gray-600 px-3 py-2.5 text-left font-semibold text-gray-800 dark:text-gray-100">
                    선택 비율
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 px-3 py-2.5 text-left font-semibold text-gray-800 dark:text-gray-100">
                    특징
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 px-3 py-2.5 text-left font-semibold text-gray-800 dark:text-gray-100">
                    적합한 사람
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 font-medium">
                    80%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    매월 적게 원천징수, 연말정산 시 추가 납부 가능성 높음
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    매월 실수령액을 최대화하고 싶은 경우, 공제 항목이 많은 경우
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-700/20">
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 font-medium">
                    100%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    기본 비율, 환급과 추가납부 가능성 균형
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    대부분의 근로자 (기본 선택)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2 font-medium">
                    120%
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    매월 많이 원천징수, 연말정산 시 환급 가능성 높음
                  </td>
                  <td className="border border-gray-200 dark:border-gray-600 px-3 py-2">
                    연말에 환급금을 받고 싶은 경우, 공제 항목이 적은 독신 근로자
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              어떤 비율을 선택하든 연간 총 세액은 동일합니다. 차이는 매월 원천징수되는
              금액과 연말정산 시 환급/추가납부 금액의 크기뿐입니다. 따라서 개인의 현금 흐름
              선호도에 따라 결정하면 됩니다. 매월 여유자금을 투자에 활용하고 싶다면 80%를,
              연말에 목돈처럼 환급받고 싶다면 120%를 선택하는 것이 일반적입니다.
            </p>
            <p>
              국세청 홈택스에서 &quot;근로소득 간이세액표&quot;를 검색하면 최신 간이세액표를
              다운로드할 수 있습니다. 월 급여와 부양가족 수를 입력하면 원천징수 세액을
              확인할 수 있는 계산기도 제공됩니다. 다만 간이세액표의 세액은 비과세소득을
              제외한 과세 대상 급여를 기준으로 산출되므로, 비과세 수당이 있는 경우 이를
              차감한 금액으로 조회해야 정확합니다.
            </p>
          </div>
        </section>

        {/* 8. 지방소득세 */}
        <section id="local-income-tax" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            8. 지방소득세
          </h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              지방소득세는 소득세(국세)와 별도로 거주지 지방자치단체에 납부하는
              지방세입니다. 근로소득에 대한 지방소득세는 소득세의 <strong className="text-gray-900 dark:text-gray-100">10%</strong>로
              계산됩니다. 예를 들어 소득세가 월 20만 원이면 지방소득세는 2만 원이 추가되어,
              총 22만 원의 세금이 원천징수됩니다.
            </p>
            <p>
              지방소득세의 과세표준과 세율 체계는 소득세와 동일합니다. 다만 세율이 소득세의
              1/10이므로 0.6%~4.5%의 8단계 구간으로 적용됩니다. 실무적으로는 소득세를
              먼저 계산한 후 그 10%를 지방소득세로 부과하는 방식이 사용되므로, 별도로
              계산할 필요는 없습니다.
            </p>
            <p>
              지방소득세는 2010년까지 &quot;주민세 소득분&quot;이라는 명칭으로 부과되었으나,
              2011년부터 지방소득세로 명칭이 변경되었습니다. 소득세와 함께 원천징수되어
              납부되므로 직장인이 별도로 신고·납부할 필요는 없습니다. 연말정산 시에도
              소득세 환급액의 10%가 지방소득세 환급액으로 함께 돌아옵니다.
            </p>
            <p>
              급여 명세서에서 &quot;소득세&quot;와 &quot;지방소득세&quot;가 별도 항목으로 표시되므로,
              두 항목을 합산한 금액이 내가 실제로 부담하는 총 소득 관련 세금입니다.
              계산기에서 표시하는 소득세에도 지방소득세가 포함되어 있으니, 실수령액을
              확인할 때는 이를 참고하시기 바랍니다.
            </p>
            <p>
              참고로 지방소득세의 세수는 근로자의 주민등록상 주소지 지방자치단체의 재원으로
              사용됩니다. 직장 소재지가 아닌 거주지 기준이므로, 서울에서 근무하더라도
              경기도에 거주한다면 경기도 해당 시·군에 지방소득세가 납부됩니다.
            </p>
          </div>
        </section>

        {/* 9. FAQ */}
        <section id="faq" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            9. 자주 묻는 질문 (FAQ)
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
              >
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Q. {item.question}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 하단 네비게이션 */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center shadow-lg">
            <p className="text-white/90 text-sm mb-2">
              이제 이론을 실전에 적용해 보세요
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md"
            >
              내 연봉 실수령액 계산하기
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/guide"
              className="flex-1 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-xl transition-shadow"
            >
              전체 가이드 목록 보기
            </Link>
            <Link
              href="/guide/social-insurance"
              className="flex-1 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-xl transition-shadow"
            >
              다음 가이드: 4대보험 완벽 가이드
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
