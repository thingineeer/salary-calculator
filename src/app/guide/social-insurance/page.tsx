import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '2026년 4대보험 완벽 가이드 - 국민연금·건강보험·고용보험 요율 총정리',
  description:
    '국민연금, 건강보험, 장기요양보험, 고용보험의 2026년 최신 요율과 계산 방법을 상세히 설명합니다. 4대보험의 원리와 혜택까지.',
  alternates: { canonical: '/guide/social-insurance' },
  openGraph: {
    title: '2026년 4대보험 완벽 가이드 - 국민연금·건강보험·고용보험 요율 총정리',
    description:
      '국민연금, 건강보험, 장기요양보험, 고용보험의 2026년 최신 요율과 계산 방법을 상세히 설명합니다. 4대보험의 원리와 혜택까지.',
    type: 'article',
    locale: 'ko_KR',
    url: '/guide/social-insurance',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

const faqData = [
  {
    question: '4대보험은 아르바이트(단시간 근로자)도 가입해야 하나요?',
    answer:
      '네, 일정 요건을 충족하면 아르바이트도 4대보험에 가입해야 합니다. 월 60시간(주 15시간) 이상 근무하는 경우 국민연금과 건강보험에 가입 대상이 되며, 고용보험은 주 15시간 이상 근무 시 의무 가입입니다. 다만, 1개월 미만 일용근로자는 고용보험만 적용되는 등 근로 형태에 따라 차이가 있으므로, 근로계약서 작성 시 4대보험 가입 여부를 반드시 확인하세요.',
  },
  {
    question: '4대보험료는 연말정산 때 공제받을 수 있나요?',
    answer:
      '네, 근로자가 부담하는 4대보험료(국민연금, 건강보험, 장기요양보험, 고용보험)는 전액 소득공제 대상입니다. 별도의 신청 없이 급여에서 원천징수된 금액이 자동으로 연말정산에 반영됩니다. 즉, 4대보험료만큼 과세표준이 줄어들어 소득세 부담이 감소하는 효과가 있습니다.',
  },
  {
    question: '프리랜서(개인사업자)도 4대보험에 가입하나요?',
    answer:
      '프리랜서는 근로자가 아니므로 고용보험과 산재보험에는 원칙적으로 가입하지 않습니다. 다만, 국민연금은 지역가입자로 의무 가입해야 하며, 건강보험도 지역가입자로 가입해야 합니다. 지역가입자의 건강보험료는 소득·재산·자동차 등을 종합적으로 반영하여 산정되므로, 직장가입자보다 보험료 부담이 클 수 있습니다. 2026년부터 프리랜서·자영업자를 위한 고용보험 임의가입 제도가 더욱 확대되고 있으니, 실업급여 혜택이 필요하다면 고용보험 임의가입을 고려해 보세요.',
  },
  {
    question: '국민연금을 납부하면 나중에 정말 돌려받을 수 있나요?',
    answer:
      '국민연금은 가입 기간이 최소 10년(120개월) 이상이면 만 65세부터 평생 매월 연금을 수령할 수 있습니다. 가입 기간이 10년 미만이면 일시금으로 반환받게 됩니다. 연금 수령액은 가입 기간과 납부한 보험료, 전체 가입자의 평균 소득 등에 따라 결정됩니다. 물가 상승률을 반영하여 매년 연금액이 조정되므로 실질 구매력이 유지되는 장점이 있으며, 사망 시 유족연금으로 배우자에게 일정 비율이 지급됩니다.',
  },
  {
    question: '건강보험 피부양자로 등록하면 보험료를 안 내도 되나요?',
    answer:
      '맞습니다. 직장가입자의 피부양자로 등록되면 별도의 건강보험료를 내지 않고도 건강보험 혜택을 받을 수 있습니다. 피부양자가 되려면 소득과 재산이 일정 기준 이하여야 합니다. 2026년 기준으로 연간 소득이 2,000만 원을 초과하거나, 재산세 과세표준이 5.4억 원을 초과하면 피부양자 자격이 박탈됩니다. 부모님이나 배우자를 피부양자로 등록할 때는 소득·재산 요건을 꼭 확인하세요.',
  },
  {
    question: '실업급여는 자발적 퇴사(자진 퇴사)해도 받을 수 있나요?',
    answer:
      '원칙적으로 자발적 퇴사(자진 퇴사)의 경우 실업급여를 받을 수 없습니다. 다만, 정당한 사유가 인정되는 자발적 퇴사는 예외입니다. 예를 들어, 임금 체불, 직장 내 괴롭힘·성희롱, 근로조건이 계약 내용과 현저히 다른 경우, 건강 악화, 통근 거리가 왕복 3시간 이상인 경우 등은 정당한 이직 사유로 인정되어 실업급여 수급이 가능합니다. 퇴사 전 고용센터에 상담하여 자신의 상황이 정당한 사유에 해당하는지 확인하는 것이 좋습니다.',
  },
  {
    question: '4대보험 요율은 매년 바뀌나요?',
    answer:
      '건강보험료율과 장기요양보험료율은 매년 정부가 고시하므로 변동될 수 있습니다. 국민연금은 연금개혁에 따라 2026년부터 매년 0.5%p씩 인상되어 2033년에 13%에 도달할 예정입니다. 고용보험 근로자 부담분은 최근 몇 년간 0.9%로 유지되고 있으나, 고용보험기금 재정 상황에 따라 변경될 수 있습니다. 국민연금 상한 소득월액도 매년 7월에 조정되므로, 매년 초에 변경 사항을 확인하는 것이 좋습니다.',
  },
];

export default function SocialInsuranceGuidePage() {
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
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/guide" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              가이드
            </Link>
            <span>/</span>
            <span className="text-gray-800 dark:text-gray-200">4대보험</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            2026년 4대보험 완벽 가이드
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            국민연금·건강보험·장기요양보험·고용보험의 2026년 최신 요율, 계산 방법, 혜택을 한곳에 정리했습니다.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
              4대보험
            </span>
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
              2026년 기준
            </span>
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
              연금개혁 반영
            </span>
          </div>
        </header>

        {/* 목차 */}
        <nav className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-3">목차</h2>
          <ol className="space-y-1.5 text-sm text-blue-600 dark:text-blue-400">
            <li><a href="#intro" className="hover:underline">1. 4대보험이란?</a></li>
            <li><a href="#national-pension" className="hover:underline">2. 국민연금 상세 가이드</a></li>
            <li><a href="#health-insurance" className="hover:underline">3. 건강보험 상세 가이드</a></li>
            <li><a href="#long-term-care" className="hover:underline">4. 장기요양보험</a></li>
            <li><a href="#employment-insurance" className="hover:underline">5. 고용보험 상세 가이드</a></li>
            <li><a href="#calculation-example" className="hover:underline">6. 4대보험 계산 예시 (연봉 4,000만 원)</a></li>
            <li><a href="#rate-history" className="hover:underline">7. 4대보험 요율 변화 추이 (2024~2026)</a></li>
            <li><a href="#faq" className="hover:underline">8. 자주 묻는 질문</a></li>
          </ol>
        </nav>

        {/* 1. 소개 */}
        <section id="intro" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            1. 4대보험이란 무엇인가?
          </h2>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              4대보험은 대한민국의 사회보장제도의 핵심을 이루는 4가지 공적 보험을 말합니다.
              <strong className="text-gray-900 dark:text-gray-100"> 국민연금, 건강보험(+장기요양보험), 고용보험, 산재보험</strong>이
              이에 해당하며, 근로자와 사용자(회사)가 보험료를 분담하여 납부합니다. 산재보험은 사용자가 전액 부담하므로
              근로자의 급여에서 공제되지 않으며, 이 가이드에서는 근로자 급여에서 직접 공제되는 국민연금, 건강보험, 장기요양보험, 고용보험을 중심으로 설명합니다.
            </p>
            <p>
              4대보험은 단순한 &ldquo;세금&rdquo;이 아닙니다. 각 보험은 명확한 목적과 혜택을 가지고 있습니다.
              국민연금은 노후 소득을 보장하고, 건강보험은 의료비 부담을 줄여주며, 장기요양보험은 고령이나 질병으로
              일상생활이 어려운 분들에게 돌봄 서비스를 제공합니다. 고용보험은 실직 시 생계를 지원하고 직업훈련의
              기회를 제공합니다. 즉, 4대보험은 인생의 주요 위험(노후, 질병, 장기요양, 실업)에 대비하는 사회적 안전망입니다.
            </p>
            <p>
              2026년은 4대보험에 중요한 변화가 있는 해입니다. 특히 <strong className="text-gray-900 dark:text-gray-100">연금개혁</strong>으로
              국민연금 보험료율이 기존 9%에서 9.5%로 인상되었고, 이후 매년 0.5%p씩 올라 2033년에 13%에 도달할 예정입니다.
              건강보험료율도 7.19%로 조정되었습니다. 이러한 변화가 내 월급에 어떤 영향을 미치는지, 각 보험의 원리와 혜택은
              무엇인지 아래에서 자세히 살펴보겠습니다.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">4대보험 한눈에 보기</h3>
              <div className="overflow-x-auto -mx-4 px-4">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-blue-200 dark:border-blue-700">
                      <th className="text-left py-2 pr-3 text-blue-800 dark:text-blue-200">보험</th>
                      <th className="text-left py-2 pr-3 text-blue-800 dark:text-blue-200">목적</th>
                      <th className="text-right py-2 text-blue-800 dark:text-blue-200">근로자 부담률</th>
                    </tr>
                  </thead>
                  <tbody className="text-blue-700 dark:text-blue-300">
                    <tr className="border-b border-blue-100 dark:border-blue-800">
                      <td className="py-2 pr-3 font-medium">국민연금</td>
                      <td className="py-2 pr-3">노후 소득 보장</td>
                      <td className="py-2 text-right">4.75%</td>
                    </tr>
                    <tr className="border-b border-blue-100 dark:border-blue-800">
                      <td className="py-2 pr-3 font-medium">건강보험</td>
                      <td className="py-2 pr-3">의료비 지원</td>
                      <td className="py-2 text-right">3.595%</td>
                    </tr>
                    <tr className="border-b border-blue-100 dark:border-blue-800">
                      <td className="py-2 pr-3 font-medium">장기요양보험</td>
                      <td className="py-2 pr-3">노인·질환 돌봄</td>
                      <td className="py-2 text-right">건강보험의 13.14%</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium">고용보험</td>
                      <td className="py-2 pr-3">실업급여·직업훈련</td>
                      <td className="py-2 text-right">0.9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              4대보험 가입은 선택이 아닌 <strong className="text-gray-900 dark:text-gray-100">법적 의무</strong>입니다.
              근로기준법상 1인 이상 사업장에서 근무하는 근로자는 원칙적으로 4대보험에 가입해야 합니다.
              사용자가 4대보험을 미가입하거나 보험료를 미납하면 과태료와 형사처벌의 대상이 됩니다.
              근로자 입장에서도 4대보험 미가입 시 의료비 할인, 실업급여, 연금 수급 등의 혜택을 받지 못하므로,
              반드시 가입 여부를 확인해야 합니다.
            </p>
          </div>
        </section>

        {/* 2. 국민연금 */}
        <section id="national-pension" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            2. 국민연금 상세 가이드
          </h2>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              국민연금은 대한민국 국민의 노후 소득을 보장하기 위한 공적 연금 제도입니다. 18세 이상 60세 미만의
              국민이라면 소득이 있을 경우 의무적으로 가입해야 합니다. 직장인은 &ldquo;사업장가입자&rdquo;로,
              회사와 보험료를 반반씩 부담합니다.
            </p>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              2026년 국민연금 요율: 9.5%
            </h3>
            <p>
              2025년 연금개혁법 통과로, 국민연금 보험료율이 기존 9%에서 <strong className="text-gray-900 dark:text-gray-100">2026년 9.5%</strong>로
              인상되었습니다. 근로자와 사용자가 각각 <strong className="text-gray-900 dark:text-gray-100">4.75%</strong>씩 부담합니다.
              이후 매년 0.5%p씩 인상되어 2033년에는 최종 13%(근로자 6.5%, 사용자 6.5%)에 도달할 예정입니다.
              이번 개혁은 국민연금 기금의 장기 지속가능성을 높이기 위한 것으로, 보험료율 인상과 함께 소득대체율도
              단계적으로 조정됩니다.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
              <h4 className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2">국민연금 소득월액 상·하한</h4>
              <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                <li>• <strong>상한 소득월액:</strong> 637만 원 — 월 소득이 637만 원을 초과해도 637만 원 기준으로 보험료 산정</li>
                <li>• <strong>하한 소득월액:</strong> 39만 원 — 월 소득이 39만 원 미만이어도 39만 원 기준으로 보험료 산정</li>
                <li>• 상한 기준 최대 월 보험료(근로자): 637만 원 × 4.75% = <strong>302,575원</strong></li>
              </ul>
            </div>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              국민연금 수령 조건과 금액
            </h3>
            <p>
              국민연금을 수령하려면 <strong className="text-gray-900 dark:text-gray-100">최소 10년(120개월) 이상</strong> 보험료를
              납부해야 합니다. 수령 개시 연령은 출생연도에 따라 다르며, 1969년 이후 출생자는 만 65세부터 수령합니다.
              조기 수령(최대 5년 앞당김)도 가능하지만, 1년 앞당길 때마다 연금액이 6%씩 감소합니다.
              반대로 수령을 연기하면(최대 5년) 연 7.2%씩 연금액이 증가합니다.
            </p>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              예상 수령액은 어떻게 결정되나?
            </h3>
            <p>
              국민연금 수령액은 &ldquo;균등 부분&rdquo;과 &ldquo;소득비례 부분&rdquo;의 합으로 계산됩니다.
              균등 부분은 전체 가입자의 평균 소득(A값)에 연동되며, 소득비례 부분은 본인의 가입 기간 평균 소득(B값)에
              비례합니다. 간단히 말해, 오래 가입할수록, 많이 벌수록 연금액이 커지지만, 소득 재분배 기능이 있어
              저소득자에게 상대적으로 유리한 구조입니다.
            </p>
            <p>
              예를 들어, 월 300만 원의 소득으로 20년간 국민연금을 납부한 경우 2026년 기준 월 약 60~70만 원 수준의
              연금을 수령할 수 있으며, 30년 납부 시 월 약 90~100만 원 수준으로 올라갑니다.
              정확한 예상 수령액은 국민연금공단 홈페이지의 &ldquo;내 연금 알아보기&rdquo; 서비스에서 확인할 수 있습니다.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-2">국민연금의 추가 혜택</h4>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• <strong>장애연금:</strong> 가입 중 장애가 발생하면 장애 등급에 따라 연금 수급</li>
                <li>• <strong>유족연금:</strong> 가입자 사망 시 배우자·자녀에게 연금의 40~60% 지급</li>
                <li>• <strong>반환일시금:</strong> 가입 기간이 10년 미만이거나 국적 상실 시 납부액+이자 일시 반환</li>
                <li>• <strong>출산 크레딧:</strong> 둘째 자녀부터 12개월~최대 50개월의 가입 기간 추가 인정</li>
                <li>• <strong>군복무 크레딧:</strong> 6개월의 가입 기간 추가 인정</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 광고 배너 1 */}
        <AdBanner
          slot="guide-social-insurance-mid1"
          format="auto"
          className="my-4"
          adPosition="guide-mid1"
        />

        {/* 3. 건강보험 */}
        <section id="health-insurance" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            3. 건강보험 상세 가이드
          </h2>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              건강보험은 국민의 질병, 부상, 출산 등에 대해 의료 서비스를 제공하고 의료비 부담을 줄여주는 사회보험입니다.
              대한민국 국민이라면 누구나 건강보험에 가입해야 하며, 직장인은 &ldquo;직장가입자&rdquo;로서 회사와 보험료를
              반반 부담합니다. 건강보험이 있어 병원비의 상당 부분(통상 70~80%)을 건강보험에서 지원받을 수 있습니다.
            </p>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              2026년 건강보험 요율: 7.19%
            </h3>
            <p>
              2026년 건강보험 보험료율은 <strong className="text-gray-900 dark:text-gray-100">7.19%</strong>이며,
              근로자와 사용자가 각각 <strong className="text-gray-900 dark:text-gray-100">3.595%</strong>씩 부담합니다.
              건강보험료는 보수월액(월 급여)에 보험료율을 곱하여 산정되며, 비과세 소득(식대 월 20만 원 등)은
              보수월액에서 제외됩니다.
            </p>
            <p>
              건강보험에는 국민연금과 같은 상한 소득월액 개념이 없으나, 보험료 상한선은 존재합니다.
              2026년 기준 월 보험료 상한액은 약 891만 원(근로자 부담분 기준 약 445만 원)입니다.
              즉, 연봉이 아무리 높더라도 이 금액 이상은 납부하지 않습니다.
            </p>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              건강보험의 주요 혜택
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <strong className="text-gray-800 dark:text-gray-200">본인부담금 경감:</strong> 요양기관(병원·약국) 이용 시
                진료비의 일부만 본인이 부담합니다. 외래 진료의 경우 의원급 30%, 종합병원급 40~60%를 본인이 부담하고
                나머지는 건강보험이 지원합니다.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">본인부담 상한제:</strong> 연간 본인부담금 총액이
                소득 수준에 따른 상한액을 초과하면 초과 금액을 환급받습니다. 소득 하위 50%는 연간 약 81만 원,
                상위 구간은 최대 약 780만 원까지 상한이 적용됩니다.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">건강검진:</strong> 직장가입자는 2년에 한 번(비사무직은 매년)
                국가건강검진을 무료로 받을 수 있습니다. 만 40세부터는 위암·간암 등 암 검진도 무료로 제공됩니다.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">출산·육아 지원:</strong> 임신·출산 진료비 지원(바우처),
                신생아 의료비 지원 등 다양한 출산 관련 혜택이 있습니다.
              </li>
            </ul>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              피부양자 등록 조건 (2026년 기준)
            </h3>
            <p>
              직장가입자의 배우자, 직계존속(부모·조부모), 직계비속(자녀·손자녀), 형제·자매 등은
              일정 요건을 충족하면 피부양자로 등록하여 별도의 보험료 없이 건강보험 혜택을 받을 수 있습니다.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <h4 className="text-sm font-bold text-green-800 dark:text-green-200 mb-2">피부양자 자격 요건</h4>
              <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                <li>• <strong>소득 요건:</strong> 연간 소득(사업·근로·연금·기타 등) 합계 2,000만 원 이하</li>
                <li>• <strong>재산 요건:</strong> 재산세 과세표준 합계 5.4억 원 이하 (5.4억 초과 ~ 9억 이하는 연 소득 1,000만 원 이하 시 인정)</li>
                <li>• <strong>형제·자매:</strong> 만 65세 이상 또는 만 30세 미만이거나 장애인인 경우만 피부양자 가능</li>
              </ul>
            </div>
            <p>
              피부양자 자격을 잃으면 지역가입자로 전환되어 소득·재산 기반으로 보험료를 별도로 납부해야 합니다.
              매년 피부양자 자격 검증이 이루어지므로, 소득이나 재산 변동이 있을 때 주의가 필요합니다.
            </p>
          </div>
        </section>

        {/* 4. 장기요양보험 */}
        <section id="long-term-care" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            4. 장기요양보험
          </h2>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              장기요양보험은 고령이나 노인성 질병 등으로 일상생활을 혼자서 수행하기 어려운 분들에게
              신체활동 지원, 가사활동 지원 등의 서비스를 제공하는 사회보험입니다.
              건강보험과 별개의 보험이지만, 건강보험료에 연동하여 함께 징수됩니다.
            </p>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              2026년 장기요양보험 요율: 건강보험료의 13.14%
            </h3>
            <p>
              장기요양보험료는 건강보험료에 장기요양보험료율(13.14%)을 곱하여 산정합니다.
              직접 소득에 요율을 곱하는 것이 아니라, <strong className="text-gray-900 dark:text-gray-100">건강보험료를 기준</strong>으로
              부과된다는 점이 특징입니다. 예를 들어, 건강보험료(근로자 부담분)가 10만 원이라면
              장기요양보험료는 10만 원 × 13.14% = 13,140원이 됩니다.
            </p>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              장기요양 서비스 대상과 혜택
            </h3>
            <p>
              만 65세 이상 또는 65세 미만이라도 노인성 질병(치매, 뇌혈관 질환, 파킨슨병 등)이 있는 분이
              장기요양등급 판정을 받으면 서비스를 이용할 수 있습니다. 등급은 1~5등급과 인지지원등급으로
              구분되며, 등급에 따라 이용할 수 있는 서비스 종류와 한도가 달라집니다.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
              <h4 className="text-sm font-bold text-purple-800 dark:text-purple-200 mb-2">장기요양 서비스 종류</h4>
              <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                <li>• <strong>재가급여:</strong> 방문요양, 방문목욕, 방문간호, 주야간보호, 단기보호 등</li>
                <li>• <strong>시설급여:</strong> 노인요양시설(요양원) 입소 서비스</li>
                <li>• <strong>특별현금급여:</strong> 도서·벽지 등 서비스 이용이 어려운 경우 현금 지급</li>
                <li>• <strong>복지용구:</strong> 휠체어, 전동침대, 목욕의자 등 구입·대여 지원</li>
              </ul>
            </div>
            <p>
              장기요양보험은 현재 납부하는 근로자 본인이 직접 혜택을 받는 것이 아니라,
              주로 부모님 세대(고령자)를 위한 사회적 부양 시스템입니다.
              다만, 본인도 향후 고령이 되었을 때 같은 혜택을 받을 수 있으므로, 세대 간 연대의 성격을 가집니다.
              가족 중 장기요양이 필요한 분이 있다면, 국민건강보험공단에 장기요양등급 판정을 신청하여
              서비스를 이용할 수 있습니다.
            </p>
          </div>
        </section>

        {/* 5. 고용보험 */}
        <section id="employment-insurance" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            5. 고용보험 상세 가이드
          </h2>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              고용보험은 근로자가 실직했을 때 생활 안정과 재취업을 지원하고,
              재직 중에는 직업능력개발과 고용안정을 도모하는 사회보험입니다.
              흔히 &ldquo;실업급여&rdquo;로만 알려져 있지만, 그 외에도 육아휴직 급여, 출산전후 휴가급여,
              직업훈련 지원 등 다양한 혜택이 있습니다.
            </p>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              2026년 고용보험 요율
            </h3>
            <p>
              고용보험료는 &ldquo;실업급여&rdquo; 부분과 &ldquo;고용안정·직업능력개발&rdquo; 부분으로 나뉩니다.
              근로자는 실업급여 부분만 부담하며, 2026년 근로자 부담분은 보수월액의
              <strong className="text-gray-900 dark:text-gray-100"> 0.9%</strong>입니다.
              사용자는 실업급여 0.9%에 더해 고용안정·직업능력개발 사업 부담분(기업 규모에 따라 0.25~0.85%)을
              추가로 부담합니다.
            </p>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              실업급여 수급 조건 (2026년 기준)
            </h3>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
              <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
                <li>
                  <strong>1. 고용보험 가입 기간:</strong> 이직일 이전 18개월 동안 고용보험 피보험 단위기간이
                  통산 180일 이상이어야 합니다.
                </li>
                <li>
                  <strong>2. 비자발적 이직:</strong> 권고사직, 계약 만료, 정리해고 등 비자발적 사유로
                  퇴사한 경우에 해당합니다. 단, 정당한 사유가 있는 자발적 퇴사도 인정됩니다(FAQ 참조).
                </li>
                <li>
                  <strong>3. 재취업 의사와 능력:</strong> 근로 능력이 있고 적극적으로 구직 활동을 해야 합니다.
                </li>
                <li>
                  <strong>4. 구직 등록:</strong> 고용센터에 구직 신청을 하고, 정해진 구직활동(실업인정)을 이행해야 합니다.
                </li>
              </ul>
            </div>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              실업급여 금액과 수급 기간
            </h3>
            <p>
              실업급여(구직급여)의 1일 지급액은 <strong className="text-gray-900 dark:text-gray-100">퇴직 전 평균임금의 60%</strong>입니다.
              다만, 상한액(1일 66,000원)과 하한액(1일 최저임금의 80% × 1일 소정근로시간)이 적용됩니다.
              2026년 기준 하한액은 약 63,104원(최저임금 10,030원 × 80% × 8시간 기준)입니다.
            </p>
            <p>
              수급 기간은 연령과 고용보험 가입 기간에 따라 <strong className="text-gray-900 dark:text-gray-100">120일에서 최대 270일</strong>까지
              차등 적용됩니다. 50세 이상이거나 장애인인 경우 더 긴 수급 기간이 적용됩니다.
            </p>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-xs sm:text-sm mt-2">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-2 text-gray-800 dark:text-gray-200">가입기간</th>
                    <th className="text-center py-2 px-2 text-gray-800 dark:text-gray-200">50세 미만</th>
                    <th className="text-center py-2 pl-2 text-gray-800 dark:text-gray-200">50세 이상·장애인</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 pr-2">1년 미만</td>
                    <td className="py-2 px-2 text-center">120일</td>
                    <td className="py-2 pl-2 text-center">120일</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 pr-2">1~3년</td>
                    <td className="py-2 px-2 text-center">150일</td>
                    <td className="py-2 pl-2 text-center">180일</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 pr-2">3~5년</td>
                    <td className="py-2 px-2 text-center">180일</td>
                    <td className="py-2 pl-2 text-center">210일</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-2 pr-2">5~10년</td>
                    <td className="py-2 px-2 text-center">210일</td>
                    <td className="py-2 pl-2 text-center">240일</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2">10년 이상</td>
                    <td className="py-2 px-2 text-center">240일</td>
                    <td className="py-2 pl-2 text-center">270일</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mt-6 mb-2">
              고용보험의 기타 혜택
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <strong className="text-gray-800 dark:text-gray-200">육아휴직 급여:</strong> 육아휴직 기간 동안
                통상임금의 80%(상한 월 150만 원)를 지급합니다. 아빠 육아휴직 보너스제에 따라 두 번째 사용자는
                통상임금의 100%(상한 월 250만 원)를 받을 수 있습니다.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">출산전후 휴가급여:</strong> 출산전후 휴가
                기간(90일, 다태아 120일) 중 60일분(우선지원대상기업 90일분)의 급여를 고용보험에서 지급합니다.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-200">직업능력개발:</strong> 재직 근로자의
                자기개발 훈련비 지원, 국민내일배움카드 등을 통해 직업훈련 비용을 지원합니다.
              </li>
            </ul>
          </div>
        </section>

        {/* 광고 배너 2 */}
        <AdBanner
          slot="guide-social-insurance-mid2"
          format="auto"
          className="my-4"
          adPosition="guide-mid2"
        />

        {/* 6. 계산 예시 */}
        <section id="calculation-example" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            6. 4대보험 계산 예시 — 연봉 4,000만 원
          </h2>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              연봉 4,000만 원인 직장인의 4대보험료를 2026년 요율 기준으로 상세히 계산해 보겠습니다.
              비과세 식대 월 20만 원을 적용합니다.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3">기본 정보</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>• 연봉(세전): 4,000만 원</li>
                <li>• 월 급여(세전): 4,000만 원 ÷ 12 = 약 3,333,333원</li>
                <li>• 비과세 식대: 월 200,000원</li>
                <li>• 과세 대상 월 소득(보수월액): 3,333,333 - 200,000 = <strong className="text-gray-800 dark:text-gray-200">3,133,333원</strong></li>
              </ul>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-xs sm:text-sm mt-2">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 pr-3 text-gray-800 dark:text-gray-200">항목</th>
                    <th className="text-right py-3 px-3 text-gray-800 dark:text-gray-200">요율</th>
                    <th className="text-right py-3 px-3 text-gray-800 dark:text-gray-200">계산식</th>
                    <th className="text-right py-3 pl-3 text-gray-800 dark:text-gray-200">월 부담액</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">국민연금</td>
                    <td className="py-3 px-3 text-right">4.75%</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">3,133,333 × 4.75%</td>
                    <td className="py-3 pl-3 text-right font-semibold">148,830원</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">건강보험</td>
                    <td className="py-3 px-3 text-right">3.595%</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">3,133,333 × 3.595%</td>
                    <td className="py-3 pl-3 text-right font-semibold">112,640원</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">장기요양보험</td>
                    <td className="py-3 px-3 text-right">13.14%</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">112,640 × 13.14%</td>
                    <td className="py-3 pl-3 text-right font-semibold">14,800원</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">고용보험</td>
                    <td className="py-3 px-3 text-right">0.9%</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">3,133,333 × 0.9%</td>
                    <td className="py-3 pl-3 text-right font-semibold">28,200원</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300 dark:border-gray-500">
                    <td className="py-3 pr-3 font-bold text-gray-900 dark:text-gray-100" colSpan={3}>
                      4대보험 합계 (월)
                    </td>
                    <td className="py-3 pl-3 text-right font-bold text-blue-600 dark:text-blue-400 text-base">
                      304,470원
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-bold text-gray-900 dark:text-gray-100" colSpan={3}>
                      4대보험 합계 (연간)
                    </td>
                    <td className="py-2 pl-3 text-right font-bold text-blue-600 dark:text-blue-400">
                      약 3,653,640원
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mt-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>해석:</strong> 연봉 4,000만 원(월 약 333만 원)인 직장인은 매월 약 <strong>30만 4천 원</strong>을
                4대보험료로 납부합니다. 이는 과세 대상 월 소득의 약 <strong>9.7%</strong>에 해당합니다.
                여기에 소득세와 지방소득세가 추가로 공제되면, 실수령액은 약 285~290만 원 수준이 됩니다.
                정확한 실수령액은 부양가족 수와 추가 공제 항목에 따라 달라집니다.
              </p>
            </div>

            <p>
              위 계산은 실제 급여 명세서와 약간의 차이가 있을 수 있습니다. 실제로는 원 단위 이하 절사(반올림) 처리,
              건강보험 정산(연말정산과 별도의 건강보험료 정산) 등이 적용되기 때문입니다.
              보다 정확한 실수령액 계산은 아래 계산기를 이용해 보세요.
            </p>
          </div>
        </section>

        {/* 7. 요율 변화 추이 */}
        <section id="rate-history" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            7. 4대보험 요율 변화 추이 (2024~2026)
          </h2>
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              최근 3년간 4대보험 요율이 어떻게 변화해 왔는지 한눈에 비교해 봅니다.
              특히 2026년 국민연금 요율 인상이 눈에 띕니다.
            </p>

            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-600">
                    <th className="text-left py-3 pr-3 text-gray-800 dark:text-gray-200">항목</th>
                    <th className="text-center py-3 px-3 text-gray-800 dark:text-gray-200">2024년</th>
                    <th className="text-center py-3 px-3 text-gray-800 dark:text-gray-200">2025년</th>
                    <th className="text-center py-3 pl-3 text-gray-800 dark:text-gray-200">2026년</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-400">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">국민연금 (전체)</td>
                    <td className="py-3 px-3 text-center">9.0%</td>
                    <td className="py-3 px-3 text-center">9.0%</td>
                    <td className="py-3 pl-3 text-center font-bold text-blue-600 dark:text-blue-400">9.5%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">국민연금 (근로자)</td>
                    <td className="py-3 px-3 text-center">4.5%</td>
                    <td className="py-3 px-3 text-center">4.5%</td>
                    <td className="py-3 pl-3 text-center font-bold text-blue-600 dark:text-blue-400">4.75%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">건강보험 (전체)</td>
                    <td className="py-3 px-3 text-center">7.09%</td>
                    <td className="py-3 px-3 text-center">7.09%</td>
                    <td className="py-3 pl-3 text-center">7.19%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">건강보험 (근로자)</td>
                    <td className="py-3 px-3 text-center">3.545%</td>
                    <td className="py-3 px-3 text-center">3.545%</td>
                    <td className="py-3 pl-3 text-center">3.595%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">장기요양보험료율</td>
                    <td className="py-3 px-3 text-center">12.95%</td>
                    <td className="py-3 px-3 text-center">12.95%</td>
                    <td className="py-3 pl-3 text-center">13.14%</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">고용보험 (근로자)</td>
                    <td className="py-3 px-3 text-center">0.9%</td>
                    <td className="py-3 px-3 text-center">0.9%</td>
                    <td className="py-3 pl-3 text-center">0.9%</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-medium text-gray-800 dark:text-gray-200">연금 상한 소득월액</td>
                    <td className="py-3 px-3 text-center">590만 원</td>
                    <td className="py-3 px-3 text-center">617만 원</td>
                    <td className="py-3 pl-3 text-center">637만 원</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 mt-4">
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2">2026년 주요 변경 사항</h3>
              <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                <li>
                  • <strong>국민연금 요율 인상:</strong> 연금개혁에 따라 9.0% → 9.5%로 인상.
                  이후 매년 0.5%p씩 인상되어 2033년 13%에 도달 예정
                </li>
                <li>
                  • <strong>건강보험료율 인상:</strong> 7.09% → 7.19%로 인상.
                  의료비 증가와 보장성 확대에 따른 조정
                </li>
                <li>
                  • <strong>장기요양보험료율 인상:</strong> 12.95% → 13.14%로 인상.
                  고령화에 따른 장기요양 서비스 수요 증가 반영
                </li>
                <li>
                  • <strong>국민연금 상한 소득월액:</strong> 617만 원 → 637만 원으로 상향.
                  고소득자의 보험료 부담 소폭 증가
                </li>
              </ul>
            </div>

            <p>
              전반적으로 4대보험료 부담은 매년 소폭 증가하는 추세입니다.
              특히 국민연금은 2033년까지 계속 인상될 예정이므로, 장기적인 급여 계획을 세울 때
              이 점을 반드시 고려해야 합니다. 연봉 협상 시에도 4대보험료 인상분을 감안하여
              실수령액 기준으로 비교하는 것이 현명합니다.
            </p>
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="faq" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            8. 자주 묻는 질문 (FAQ)
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <span className="pr-4">{faq.question}</span>
                  <span className="shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA + 네비게이션 */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-center shadow-lg">
          <p className="text-white/90 text-sm mb-1">
            4대보험 공제 후 내 실수령액이 궁금하다면?
          </p>
          <p className="text-white font-bold text-lg mb-4">
            지금 바로 계산해 보세요
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-green-700 font-bold px-8 py-3 rounded-xl text-sm hover:bg-green-50 transition-colors shadow-md"
          >
            연봉 실수령액 계산기로 이동
          </Link>
        </div>

        <nav className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/guide"
            className="flex-1 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xl transition-all"
          >
            ← 가이드 목록으로 돌아가기
          </Link>
          <Link
            href="/"
            className="flex-1 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-xl transition-all"
          >
            메인 계산기 →
          </Link>
        </nav>
      </article>
    </>
  );
}
