import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '직장인 절세 전략 10가지 - 2026 연말정산 환급 극대화 방법',
  description:
    '연금저축, IRP, 신용카드 공제, 의료비·교육비 공제 등 합법적으로 세금을 줄이는 10가지 실전 절세 방법을 2026년 기준으로 정리합니다.',
  alternates: { canonical: '/guide/tax-saving' },
  openGraph: {
    title: '직장인 절세 전략 10가지 - 2026 연말정산 환급 극대화',
    description:
      '연금저축, IRP, 신용카드 공제, 의료비·교육비 공제 등 합법적으로 세금을 줄이는 10가지 실전 절세 방법을 2026년 기준으로 정리합니다.',
    type: 'article',
    locale: 'ko_KR',
    url: '/guide/tax-saving',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

const faqData = [
  {
    question: '연말정산과 종합소득세 신고는 어떻게 다른가요?',
    answer:
      '연말정산은 근로소득자(직장인)를 대상으로 매년 1~2월에 회사가 대신 진행하는 세금 정산 절차입니다. 반면 종합소득세 신고는 프리랜서, 자영업자, 부업 소득이 있는 사람 등이 매년 5월에 직접 세무서에 신고하는 절차입니다. 직장인이라도 연간 금융소득이 2,000만 원을 초과하거나, 부동산 임대소득이 있으면 종합소득세 신고를 별도로 해야 합니다.',
  },
  {
    question: '연금저축과 IRP를 동시에 가입하면 공제 한도가 늘어나나요?',
    answer:
      '네, 연금저축만 가입하면 세액공제 한도가 연 600만 원이지만, IRP를 추가로 가입하면 두 계좌 합산 연 900만 원까지 세액공제를 받을 수 있습니다. 따라서 연금저축에 600만 원, IRP에 300만 원을 각각 납입하면 최대 공제 혜택을 누릴 수 있습니다. 총급여 5,500만 원 이하라면 16.5% 공제율이 적용되어 최대 148만 5천 원을 환급받을 수 있습니다.',
  },
  {
    question: '신용카드와 체크카드, 어느 쪽을 더 많이 써야 절세에 유리한가요?',
    answer:
      '총급여의 25%까지는 어떤 수단을 써도 공제가 되지 않으므로, 25%까지는 혜택이 좋은 신용카드를 사용하고, 25%를 넘는 금액부터는 공제율이 30%로 높은 체크카드나 현금영수증을 사용하는 것이 가장 효율적입니다. 예를 들어 총급여 4,000만 원이면 1,000만 원까지는 신용카드, 이후는 체크카드를 쓰는 전략이 좋습니다.',
  },
  {
    question: '전세자금대출 이자도 소득공제를 받을 수 있나요?',
    answer:
      '네, 무주택 세대주인 근로자가 국민주택규모(전용 85㎡) 이하의 주택에 전세자금대출을 받은 경우, 원리금 상환액의 40%를 소득공제 받을 수 있습니다. 연 400만 원 한도이며, 주택임차차입금 원리금 상환액 소득공제라고 합니다. 단, 대출 시점에 무주택이어야 하고 전입신고가 필수입니다.',
  },
  {
    question: '맞벌이 부부는 공제 항목을 어떻게 배분해야 유리한가요?',
    answer:
      '맞벌이 부부는 소득이 높은 쪽에 인적공제(부양가족)를 몰아주는 것이 일반적으로 유리합니다. 다만 의료비 세액공제는 총급여의 3% 초과분부터 공제되므로, 소득이 낮은 배우자에게 의료비를 몰아주면 3% 기준이 낮아져 더 많은 공제를 받을 수 있습니다. 교육비, 기부금 등도 각자의 소득 수준과 세율 구간을 고려하여 전략적으로 배분해야 합니다.',
  },
  {
    question: '중소기업 취업자 소득세 감면은 중견기업도 적용되나요?',
    answer:
      '아니요, 이 감면 제도는 중소기업기본법에 따른 중소기업에 취업한 경우에만 적용됩니다. 중견기업이나 대기업은 대상에서 제외됩니다. 단, 해당 기업이 중소기업에 해당하는지 여부는 근로자가 아닌 기업 기준(매출, 자산총액 등)으로 판단하므로, 입사 전 또는 연말정산 전에 회사 인사팀에 확인하는 것이 좋습니다.',
  },
];

export default function TaxSavingGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="space-y-8">
        {/* 헤더 */}
        <header>
          <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/guide" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              가이드
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 dark:text-gray-200">절세 전략</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            직장인 절세 전략 10가지 — 2026 연말정산 환급 극대화 방법
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
            매년 1~2월이면 찾아오는 연말정산. &quot;13월의 월급&quot;이라고도 불리지만, 준비
            없이 맞이하면 오히려 추가 납부를 해야 할 수도 있습니다. 이 가이드에서는 2026년
            세법 기준으로 직장인이 합법적으로 세금을 줄일 수 있는 10가지 핵심 절세 전략을
            상세히 정리합니다. 각 항목의 공제 한도, 적용 조건, 그리고 실전 활용법까지
            꼼꼼하게 다루니 끝까지 읽어보세요.
          </p>
        </header>

        {/* 소개 섹션 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            왜 절세 전략이 필요한가?
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              대한민국 근로소득자의 소득세는 누진세 구조로 되어 있습니다. 과세표준에 따라
              6%부터 최고 45%까지의 세율이 적용되는데, 이 말은 소득이 높을수록 세금 부담이
              기하급수적으로 늘어난다는 뜻입니다. 하지만 세법은 동시에 다양한 공제 제도를
              마련해 두고 있어, 이를 제대로 활용하면 상당한 금액을 합법적으로 절약할 수
              있습니다.
            </p>
            <p>
              연말정산은 1년 동안 매월 급여에서 원천징수된 소득세를 실제 부담해야 할
              세금과 비교하여 차액을 정산하는 절차입니다. 각종 소득공제와 세액공제를
              적극 활용하면 이미 납부한 세금 중 일부를 돌려받을 수 있습니다. 반대로
              공제 항목을 충분히 챙기지 못하면, 원천징수액보다 실제 세금이 많아져
              추가로 납부해야 하는 상황이 발생합니다.
            </p>
            <p>
              소득공제는 과세표준 자체를 낮추는 방식이고, 세액공제는 산출된 세금에서
              직접 차감하는 방식입니다. 둘 다 결과적으로 내가 내야 할 세금을 줄여주지만,
              작동 원리가 다르므로 각각의 항목이 어떤 방식인지 이해하는 것이 중요합니다.
              이 가이드에서는 각 전략마다 소득공제인지 세액공제인지를 명확히 구분하여
              설명합니다.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-l-4 border-blue-500">
              <p className="text-blue-800 dark:text-blue-300 font-semibold text-sm mb-1">
                핵심 포인트
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                절세는 탈세가 아닙니다. 세법이 허용하는 범위 내에서 공제 혜택을 최대한
                활용하는 것은 납세자의 당연한 권리입니다. 중요한 것은 각 제도의 조건과
                한도를 정확히 이해하고, 연초부터 계획적으로 준비하는 것입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 전략 1: 연금저축 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              1
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              연금저축 세액공제 — 노후 준비와 절세를 동시에
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              연금저축은 직장인이 가장 먼저 챙겨야 할 절세 수단입니다. 연금저축펀드 또는
              연금저축보험에 연간 최대 600만 원까지 납입하면, 납입금에 대해 세액공제를
              받을 수 있습니다. 공제율은 총급여에 따라 달라집니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      총급여 기준
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      공제율
                    </th>
                    <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      최대 환급액
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">5,500만 원 이하</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">16.5%</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">99만 원</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">5,500만 원 초과</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">13.2%</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">79만 2천 원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              연금저축의 장점은 세액공제 혜택뿐 아니라 노후 자산을 쌓을 수 있다는 점입니다.
              다만 55세 이전에 중도 해지하면 기타소득세(16.5%)가 부과되므로, 장기 투자
              관점에서 접근해야 합니다. 연금저축펀드는 ETF 등 다양한 금융상품에 투자할 수
              있어 수익률 측면에서도 유리합니다.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border-l-4 border-amber-500">
              <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm mb-1">
                실전 팁
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                연말에 몰아서 넣기보다 매월 50만 원씩 자동이체를 설정해두면 부담 없이
                한도를 채울 수 있습니다. 연금저축펀드의 경우 운용 수수료가 낮은 인덱스
                펀드나 ETF를 선택하는 것이 장기 수익률에 유리합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 전략 2: IRP */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              2
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              IRP(개인형퇴직연금) 추가 납입 — 연금저축과 합산 900만 원 공제
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              IRP는 퇴직금을 수령하는 통로이기도 하지만, 추가 납입을 통해 세액공제를
              받을 수 있는 강력한 절세 수단이기도 합니다. 연금저축(최대 600만 원)에
              IRP를 합산하면 연간 총 900만 원까지 세액공제 대상이 됩니다. 즉, IRP에
              추가로 300만 원을 납입하면 됩니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">총급여 5,500만 원 이하</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-400">
                  최대 148.5만 원 환급
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  900만 원 x 16.5%
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">총급여 5,500만 원 초과</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-400">
                  최대 118.8만 원 환급
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  900만 원 x 13.2%
                </p>
              </div>
            </div>
            <p>
              IRP 계좌는 은행, 증권사, 보험사에서 개설할 수 있으며, 예금, 펀드, ETF 등
              다양한 상품에 투자할 수 있습니다. 다만 IRP는 연금저축보다 중도 인출 조건이
              엄격하여 무주택자의 주택 구입, 6개월 이상 요양이 필요한 경우 등 법이 정한
              사유에만 중도 인출이 가능합니다. 따라서 유동성이 필요한 자금은 연금저축에,
              장기 자금은 IRP에 배분하는 전략이 좋습니다.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border-l-4 border-amber-500">
              <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm mb-1">
                실전 팁
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                연금저축 600만 원을 먼저 채운 후, 여유 자금이 있다면 IRP에 300만 원을
                추가 납입하세요. 12월 31일까지 납입분이 해당 연도 공제 대상이므로,
                연말에 한도를 다 채우지 못했다면 12월에라도 일시 납입하는 것이 좋습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 광고 배너 1 */}
        <AdBanner format="horizontal" className="min-h-[100px]" adPosition="guide-tax-mid1" />

        {/* 전략 3: 신용카드·체크카드 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              3
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              신용카드·체크카드 소득공제 — 전략적 결제 수단 선택
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              신용카드·체크카드 소득공제는 직장인이 가장 많이 활용하는 공제 항목 중
              하나입니다. 총급여의 25%를 초과하는 사용분부터 공제가 적용되며, 결제 수단에
              따라 공제율이 달라집니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      결제 수단
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      공제율
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">신용카드</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">15%</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">체크카드 / 현금영수증</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">30%</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">전통시장</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">40%</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">대중교통</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">80%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              공제 한도는 총급여 7,000만 원 이하일 때 연 300만 원, 7,000만 원 초과
              1억 2,000만 원 이하일 때 250만 원, 1억 2,000만 원 초과 시 200만 원입니다.
              다만 전통시장, 대중교통, 도서·공연비 사용분은 각각 추가 한도(각 100만 원)가
              주어져 최대 공제 금액을 더 높일 수 있습니다.
            </p>
            <p>
              소득공제이므로 과세표준을 직접 낮추는 효과가 있습니다. 예를 들어 한계세율이
              24%인 사람이 300만 원을 공제받으면 약 72만 원(지방소득세 포함 시 약
              79만 2천 원)의 세금을 절약할 수 있습니다.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border-l-4 border-amber-500">
              <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm mb-1">
                실전 팁 — 카드 사용 순서 전략
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                1월~상반기에는 신용카드를 사용하여 총급여의 25% 기준선을 넘기고, 기준선을
                초과한 후부터는 체크카드나 현금을 사용하여 공제율 30%를 적용받으세요.
                신용카드 포인트나 할인 혜택은 유지하면서 공제도 극대화할 수 있는 가장
                효율적인 전략입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 전략 4: 의료비 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              4
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              의료비 세액공제 — 총급여 3% 초과분부터 15% 공제
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              본인 및 부양가족을 위해 지출한 의료비 중 총급여의 3%를 초과하는 금액에
              대해 15%의 세액공제를 받을 수 있습니다. 난임 시술비는 30%, 미숙아·선천성
              이상아 의료비는 20%의 높은 공제율이 적용됩니다.
            </p>
            <p>
              총급여가 4,000만 원인 직장인의 경우, 3%인 120만 원을 초과하는 의료비부터
              공제 대상입니다. 연간 의료비가 300만 원이었다면 초과분 180만 원의 15%인
              27만 원을 세액공제 받을 수 있습니다.
            </p>
            <p>
              의료비 공제의 특징은 소득이나 나이 요건 없이 부양가족 전원의 의료비를 합산할
              수 있다는 점입니다. 배우자, 직계존속(부모님), 직계비속(자녀) 의 의료비를
              한 사람에게 몰아서 공제받을 수 있어 맞벌이 부부라면 전략적 배분이 중요합니다.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">
                공제 대상 의료비 항목
              </p>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  병·의원 진료비, 약국 약제비
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  치과 치료비 (임플란트, 교정 포함)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  한방 치료비, 물리치료비
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  안경·콘택트렌즈 구입비 (1인당 50만 원 한도)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  보청기, 휠체어 등 장애인 보장구 구입비
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">&#10007;</span>
                  성형수술, 미용 목적 피부과 시술 (공제 불가)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 전략 5: 교육비 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              5
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              교육비 세액공제 — 본인 대학원비는 전액 공제
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              근로자 본인 또는 부양가족의 교육비에 대해 15%의 세액공제를 받을 수 있습니다.
              대상과 한도는 교육 과정에 따라 다릅니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      구분
                    </th>
                    <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      공제 한도(연)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">본인 (대학원, 직업훈련비 등)</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">한도 없음</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">대학생 자녀</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">900만 원</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">초·중·고등학생 자녀</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">300만 원</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">취학 전 아동 (어린이집·유치원)</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">300만 원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              특히 직장인이 업무 역량 강화를 위해 대학원에 다니는 경우, 등록금 전액이 공제
              대상이 됩니다. 연간 대학원 등록금이 800만 원이라면 15%인 120만 원을 환급받을
              수 있어, 자기 개발과 절세를 동시에 달성할 수 있습니다. 학원비는 취학 전 아동의
              학원비만 공제 대상이며, 초·중·고등학생의 학원비는 공제 대상에서 제외됩니다.
            </p>
            <p>
              교복 구입비(초·중·고 자녀 1인당 50만 원 한도), 체험학습비(1인당 30만 원
              한도)도 교육비 세액공제에 포함됩니다. 국외 교육기관의 교육비도 일정 요건을
              충족하면 공제가 가능하니, 해외 유학 중인 자녀가 있다면 꼭 확인하세요.
            </p>
          </div>
        </section>

        {/* 전략 6: 주택청약 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              6
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              주택청약종합저축 소득공제 — 무주택 직장인의 필수 절세 항목
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              무주택 세대주인 총급여 7,000만 원 이하 근로자가 주택청약종합저축에 납입하면,
              연 300만 원 한도 내에서 납입금의 40%를 소득공제 받을 수 있습니다. 최대
              공제액은 120만 원입니다.
            </p>
            <p>
              주택청약저축은 청약 자격 확보와 절세 혜택을 동시에 얻을 수 있는 상품입니다.
              매월 2만 원에서 50만 원까지 납입할 수 있으며, 소득공제를 최대로 받으려면
              매월 25만 원씩(연 300만 원) 납입하면 됩니다.
            </p>
            <p>
              주의할 점은 반드시 &quot;무주택 세대주&quot;여야 한다는 것입니다. 배우자나 세대원이
              주택을 보유하고 있으면 공제를 받을 수 없습니다. 또한 공제를 받은 후 5년
              이내에 해지하면 해지 추징세(6.6%)가 부과되므로, 장기 유지할 계획이 있을
              때만 소득공제를 신청하는 것이 좋습니다.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border-l-4 border-amber-500">
              <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm mb-1">
                실전 팁
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                총급여 7,000만 원 초과자는 소득공제 대상이 아니지만, 청약 가점을 위해
                저축을 유지하는 것은 의미가 있습니다. 소득공제를 못 받더라도 청약 당첨이라는
                더 큰 혜택이 있기 때문입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 광고 배너 2 */}
        <AdBanner format="horizontal" className="min-h-[100px]" adPosition="guide-tax-mid2" />

        {/* 전략 7: 기부금 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              7
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              기부금 세액공제 — 나눔과 절세의 선순환
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              기부금은 기부 유형에 따라 세액공제율이 다르게 적용됩니다. 정치자금 기부금은
              10만 원까지 전액 세액공제(실질적으로 100/110 환급)가 되며, 그 외 법정기부금과
              지정기부금은 1,000만 원 이하분 15%, 1,000만 원 초과분 30%의 세액공제가
              적용됩니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      기부금 유형
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      공제율
                    </th>
                    <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      한도
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">정치자금 기부금</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">10만 원까지 전액</td>
                    <td className="p-3 text-right text-gray-800 dark:text-gray-200">근로소득의 100%</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">법정기부금 (국가·지자체 등)</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">15% / 30%</td>
                    <td className="p-3 text-right text-gray-800 dark:text-gray-200">근로소득의 100%</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">지정기부금 (종교·사회단체 등)</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">15% / 30%</td>
                    <td className="p-3 text-right text-gray-800 dark:text-gray-200">근로소득의 30% (종교 10%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              기부금 영수증은 국세청 연말정산 간소화 서비스에서 자동으로 조회되는 경우가
              많지만, 일부 소규모 단체의 기부금은 직접 영수증을 챙겨야 합니다. 기부한
              단체가 기부금 영수증 발급 대상 단체인지 사전에 확인하는 것이 중요합니다.
              해당 연도에 공제받지 못한 기부금은 10년간 이월하여 공제받을 수 있습니다.
            </p>
          </div>
        </section>

        {/* 전략 8: 월세 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              8
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              월세 세액공제 — 연 최대 1,000만 원 한도, 최대 17% 공제
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              무주택 세대주(또는 세대원)로서 총급여 8,000만 원 이하인 근로자가 국민주택규모
              (전용 85㎡) 이하 또는 기준시가 4억 원 이하 주택에 월세를 납부하는 경우
              세액공제를 받을 수 있습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      총급여
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      공제율
                    </th>
                    <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      최대 환급액
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">5,500만 원 이하</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">17%</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">170만 원</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">5,500만 원 초과 ~ 8,000만 원 이하</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">15%</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">150만 원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              월세 세액공제를 받으려면 임대차계약서, 주민등록등본, 월세 이체 내역(계좌이체
              영수증)을 준비해야 합니다. 현금으로 납부한 경우에는 현금영수증을 발급받아야
              합니다. 주의할 점은 전입신고가 반드시 되어 있어야 한다는 것입니다.
            </p>
            <p>
              월세를 월 83만 원 이상 납부하는 경우 연간 1,000만 원을 초과하므로, 한도인
              1,000만 원까지만 공제 대상이 됩니다. 총급여 5,500만 원 이하 근로자가
              월세 80만 원을 12개월 납부하면 960만 원의 17%인 약 163만 원을 환급받을 수
              있습니다. 이는 월세 부담을 상당히 덜어주는 효과가 있습니다.
            </p>
          </div>
        </section>

        {/* 전략 9: 중소기업 취업자 감면 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              9
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              중소기업 취업자 소득세 감면 — 5년간 70~90% 소득세 감면
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              중소기업에 취업한 청년, 60세 이상 고령자, 장애인, 경력단절여성은 취업일로부터
              3년(청년은 5년)간 소득세를 감면받을 수 있습니다. 감면율은 대상에 따라
              다릅니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      대상
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      감면율
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      감면 기간
                    </th>
                    <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                      연간 한도
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">청년 (15~34세)</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">90%</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-300">5년</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">200만 원</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">60세 이상 고령자</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">70%</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-300">3년</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">200만 원</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-300">장애인</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">70%</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-300">3년</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">200만 원</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">경력단절여성</td>
                    <td className="p-3 text-center font-semibold text-blue-600 dark:text-blue-400">70%</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-300">3년</td>
                    <td className="p-3 text-right font-semibold text-gray-800 dark:text-gray-200">200만 원</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              청년의 경우 만 15세 이상 34세 이하(병역 이행 기간은 최대 6년까지 차감)가
              대상이며, 감면율 90%는 사실상 소득세를 거의 내지 않는 수준입니다. 연봉
              3,000만 원 기준으로 연간 소득세가 약 40만 원이라면, 90% 감면으로 약 36만 원을
              절약할 수 있습니다.
            </p>
            <p>
              이 감면을 받으려면 &quot;중소기업 취업자 소득세 감면 신청서&quot;를 회사에 제출해야
              합니다. 많은 분들이 이 제도의 존재를 모르거나 신청을 하지 않아 혜택을
              놓치고 있습니다. 입사 시 또는 연말정산 전에 반드시 인사팀에 문의하세요.
              과거 연도분도 경정청구를 통해 5년 이내 것은 소급 적용 받을 수 있습니다.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-l-4 border-blue-500">
              <p className="text-blue-800 dark:text-blue-300 font-semibold text-sm mb-1">
                놓치지 마세요
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                중소기업 취업 후 이 제도를 모르고 지나쳤다면, 홈택스에서 경정청구를 통해
                최근 5년치까지 소급하여 환급받을 수 있습니다. 연간 최대 200만 원 x 5년 =
                1,000만 원의 환급이 가능할 수 있으니 꼭 확인해 보세요.
              </p>
            </div>
          </div>
        </section>

        {/* 전략 10: 비과세 항목 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-sm font-bold">
              10
            </span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">
              비과세 항목 활용 — 급여 설계로 세금 줄이기
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              급여 항목 중 일부는 비과세 소득으로 분류되어 소득세가 부과되지 않습니다.
              회사와 협의하여 급여 구성 중 비과세 항목을 최대한 활용하면 과세 대상 소득을
              줄일 수 있습니다. 주요 비과세 항목은 다음과 같습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm mb-1">
                  식대 (월 20만 원)
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  2023년부터 월 20만 원까지 비과세. 연간 240만 원의 과세소득을 줄일 수
                  있습니다.
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm mb-1">
                  자가운전보조금 (월 20만 원)
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  본인 명의 차량을 업무에 사용하는 경우 월 20만 원까지 비과세.
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm mb-1">
                  출산·보육수당 (월 20만 원)
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  6세 이하 자녀를 둔 근로자에게 지급하는 보육수당. 월 20만 원 한도.
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-sm mb-1">
                  야간근로수당 (생산직)
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  생산직 근로자의 연장·야간·휴일 근로수당. 월 240만 원(총급여 3,000만 원
                  이하) 비과세.
                </p>
              </div>
            </div>
            <p>
              예를 들어 연봉 4,000만 원인 직장인이 식대 20만 원과 자가운전보조금 20만 원을
              비과세로 받으면, 과세 대상 소득이 연간 480만 원 줄어듭니다. 한계세율이
              15%라면 약 72만 원(지방소득세 포함 약 79만 원)의 세금을 절약할 수 있습니다.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border-l-4 border-amber-500">
              <p className="text-amber-800 dark:text-amber-300 font-semibold text-sm mb-1">
                실전 팁
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                입사 시 또는 연봉 협상 시 회사에 비과세 항목의 분리 지급이 가능한지
                문의하세요. 대부분의 회사는 식대를 별도 비과세 항목으로 지급하고 있지만,
                자가운전보조금이나 보육수당은 별도 신청이 필요한 경우가 많습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 광고 배너 3 */}
        <AdBanner format="horizontal" className="min-h-[100px]" adPosition="guide-tax-mid3" />

        {/* 연봉별 절세 효과 비교표 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            연봉별 절세 효과 비교표
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
            아래 표는 각 연봉 구간별로 주요 절세 전략을 모두 활용했을 때 얼마나 세금을
            줄일 수 있는지를 추정한 것입니다. 개인의 상황(부양가족 수, 실제 지출액 등)에
            따라 달라질 수 있으므로 참고용으로 활용하세요.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                    절세 항목
                  </th>
                  <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600 whitespace-nowrap">
                    3,000만 원
                  </th>
                  <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600 whitespace-nowrap">
                    5,000만 원
                  </th>
                  <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600 whitespace-nowrap">
                    7,000만 원
                  </th>
                  <th className="text-right p-3 font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600 whitespace-nowrap">
                    1억 원
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-3 text-gray-700 dark:text-gray-300">연금저축 + IRP</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">148.5만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">148.5만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">118.8만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">118.8만</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-3 text-gray-700 dark:text-gray-300">카드 소득공제</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~19.8만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~49.5만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~66만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~70만</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-3 text-gray-700 dark:text-gray-300">주택청약 소득공제</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~7.9만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~19.8만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~26.4만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">해당 없음</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-3 text-gray-700 dark:text-gray-300">월세 세액공제</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~170만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~170만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~150만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">해당 없음</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-3 text-gray-700 dark:text-gray-300">비과세 항목 활용</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~31.7만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~52.8만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~79.2만</td>
                  <td className="p-3 text-right tabular-nums text-gray-800 dark:text-gray-200">~105.6만</td>
                </tr>
                <tr className="bg-blue-50 dark:bg-blue-900/20 font-bold">
                  <td className="p-3 text-blue-800 dark:text-blue-300">예상 최대 절세 효과</td>
                  <td className="p-3 text-right tabular-nums text-blue-800 dark:text-blue-300">~377만</td>
                  <td className="p-3 text-right tabular-nums text-blue-800 dark:text-blue-300">~440만</td>
                  <td className="p-3 text-right tabular-nums text-blue-800 dark:text-blue-300">~440만</td>
                  <td className="p-3 text-right tabular-nums text-blue-800 dark:text-blue-300">~294만</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            * 위 금액은 각 항목을 최대 한도로 활용할 경우의 추정치이며, 실제 공제액은
            개인의 총급여, 부양가족, 실제 지출 내역 등에 따라 달라집니다. 월세 공제는
            연 1,000만 원 납부 기준, 비과세는 식대 + 자가운전보조금 기준입니다.
          </p>
        </section>

        {/* FAQ 섹션 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-6">
            자주 묻는 질문 (FAQ)
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <summary className="cursor-pointer list-none p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold mt-0.5">
                    Q
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                    {faq.question}
                  </span>
                </summary>
                <div className="px-4 pb-4 pl-13 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <div className="pl-9">{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* 하단 네비게이션 + CTA */}
        <section className="space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center shadow-lg">
            <p className="text-white font-bold text-lg mb-2">
              절세 전략을 적용한 내 실수령액은?
            </p>
            <p className="text-white/80 text-sm mb-4">
              비과세 항목과 공제 혜택을 반영하여 실수령액을 직접 계산해 보세요.
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
              className="flex-1 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:shadow-xl transition-shadow"
            >
              &#8592; 가이드 목록으로 돌아가기
            </Link>
            <Link
              href="/"
              className="flex-1 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:shadow-xl transition-shadow"
            >
              메인 계산기로 이동 &#8594;
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
