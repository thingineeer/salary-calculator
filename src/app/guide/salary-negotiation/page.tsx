import type { Metadata } from 'next';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export const metadata: Metadata = {
  title: '연봉 협상 실전 가이드 - 이직·연봉인상 시 실수령액 비교 전략',
  description:
    '시장 연봉 조사부터 협상 전략, 실수령액 기준 비교까지. 연봉 협상에서 손해 보지 않는 실전 방법을 정리합니다.',
  alternates: { canonical: '/guide/salary-negotiation' },
  openGraph: {
    title: '연봉 협상 실전 가이드 - 이직·연봉인상 시 실수령액 비교 전략',
    description:
      '시장 연봉 조사부터 협상 전략, 실수령액 기준 비교까지. 연봉 협상에서 손해 보지 않는 실전 방법을 정리합니다.',
    type: 'article',
    locale: 'ko_KR',
    url: '/guide/salary-negotiation',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

const faqs = [
  {
    question: '연봉 협상은 언제 하는 것이 가장 좋은가요?',
    answer:
      '연봉 협상의 최적 타이밍은 크게 세 가지입니다. 첫째, 연간 인사평가 직후(보통 12월~2월)가 가장 일반적입니다. 둘째, 큰 프로젝트를 성공적으로 마친 직후에는 성과를 근거로 설득력 있게 요청할 수 있습니다. 셋째, 이직 제안을 받았을 때 현 직장에서 카운터 오퍼를 요청하는 방법도 있습니다. 회사의 재무 상황이 양호한 시기를 선택하는 것도 중요합니다.',
  },
  {
    question: '이직 시 현재 연봉을 솔직하게 말해야 하나요?',
    answer:
      '법적으로 현재 연봉을 공개할 의무는 없습니다. 다만, 일부 기업은 전 직장 급여명세서나 원천징수영수증을 요구하기도 합니다. 현재 연봉이 시장 평균보다 낮다면 "희망 연봉"을 중심으로 대화를 이끌어가는 것이 유리합니다. "현재 연봉은 여러 사정이 있었고, 이번 이직에서는 시장 가치에 맞는 보상을 기대합니다"라고 말하는 것도 방법입니다.',
  },
  {
    question: '연봉 5,000만원과 5,500만원의 실수령액 차이는 얼마인가요?',
    answer:
      '2026년 기준으로 연봉 5,000만원의 월 실수령액은 약 346만원, 5,500만원은 약 378만원입니다. 월 약 32만원, 연간 약 384만원의 실수령 차이가 발생합니다. 연봉 500만원 인상 시 4대보험과 소득세 증가분을 제외하면 실제 손에 쥐는 금액은 약 76~77% 수준입니다.',
  },
  {
    question: '퇴직금 포함 연봉과 별도 연봉의 차이가 얼마나 되나요?',
    answer:
      '퇴직금 포함 연봉은 전체 금액의 약 1/13이 퇴직금으로 적립됩니다. 예를 들어 연봉 5,200만원(퇴직금 포함)이면 실제 월급 산정 기준은 약 4,800만원이 됩니다. 반면 연봉 5,200만원(퇴직금 별도)이면 5,200만원 전체가 월급 산정 기준이고, 퇴직금은 별도로 쌓입니다. 같은 숫자라도 퇴직금 포함/별도에 따라 실수령액이 크게 달라지니 반드시 확인하세요.',
  },
  {
    question: '연봉 협상 시 어느 정도 인상률을 요구하는 것이 적절한가요?',
    answer:
      '일반적으로 재직 중 연봉 인상은 물가상승률(약 2~3%) 이상, 즉 5~10%를 요구하는 것이 현실적입니다. 이직의 경우 15~30% 인상을 목표로 잡는 것이 일반적이며, 업계와 직무에 따라 차이가 있습니다. 핵심 인재이거나 희소 직무라면 30% 이상도 충분히 가능합니다. 중요한 것은 근거 데이터를 갖추는 것입니다.',
  },
  {
    question: '연봉 외에 협상할 수 있는 항목에는 무엇이 있나요?',
    answer:
      '연봉 외에도 협상 가능한 항목은 많습니다. 성과급(인센티브), 스톡옵션/RSU, 사이닝 보너스, 유연근무·재택근무, 연차 추가 부여, 자기개발비·교육비 지원, 건강검진 확대, 통신비·교통비·식대, 주거 지원, 자녀 학자금 등이 있습니다. 기본 연봉 인상이 어려운 경우 이런 복리후생 항목을 협상하면 실질적인 보상을 높일 수 있습니다.',
  },
];

export default function SalaryNegotiationGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
            <span className="text-gray-700 dark:text-gray-300">연봉 협상</span>
          </div>
          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-3 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
            연봉 협상
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
            연봉 협상 실전 가이드 — 이직·연봉인상 시 실수령액 비교 전략
          </h1>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            연봉 협상은 직장 생활에서 가장 큰 금전적 영향을 미치는 순간입니다.
            하지만 많은 직장인이 제대로 된 준비 없이 협상에 임하거나, 아예 협상
            자체를 포기합니다. 이 가이드에서는 시장 연봉 조사부터 실수령액 기준
            비교, 실전 협상 전략까지 체계적으로 정리합니다.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            2026년 4대보험 요율·소득세 기준 | 최종 업데이트 2026.03
          </p>
        </header>

        {/* 1. 왜 연봉 협상이 중요한가 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            1. 연봉 협상, 왜 중요한가 — 1,000만원 차이가 만드는 1억+α
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              많은 직장인이 연봉 협상을 불편하게 느끼거나, &quot;어차피 회사가 정한 대로
              받는 거 아닌가&quot;라고 생각합니다. 하지만 이 생각이 10년, 20년에 걸쳐
              얼마나 큰 차이를 만드는지 구체적인 숫자로 살펴보면 생각이 달라질
              것입니다.
            </p>
            <p>
              예를 들어, 입사 시 연봉 협상에서 연봉 4,000만원 대신 5,000만원을
              받기로 했다고 가정해 봅시다. 단순히 1,000만원 차이일 뿐이라고
              생각할 수 있지만, 이 차이가 미치는 영향은 매우 큽니다. 매년 동일한
              인상률(5%)을 적용한다고 하면, 10년 후에는 약 1억 2,500만원 이상의
              누적 소득 차이가 발생합니다. 여기에 퇴직금(연봉 기반)까지 고려하면
              그 격차는 더 벌어집니다.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
              <p className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                10년간 누적 소득 차이 시뮬레이션 (연 5% 인상 기준)
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-gray-500 dark:text-gray-400 text-xs">시작 연봉 4,000만원</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">10년 누적: 약 5억 310만원</p>
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-gray-500 dark:text-gray-400 text-xs">시작 연봉 5,000만원</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">10년 누적: 약 6억 2,889만원</p>
                </div>
              </div>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-2 font-medium">
                차이: 약 1억 2,579만원 + 퇴직금 차이 별도
              </p>
            </div>
            <p>
              또한 이직할 때 이전 연봉이 협상의 기준점(앵커링 효과)이 되기
              때문에, 한 번의 협상이 이후 커리어 전체의 보상 수준을 결정짓습니다.
              연봉 협상은 단순히 &quot;올해 얼마 더 받느냐&quot;가 아니라, 평생 소득의
              궤적을 바꾸는 일입니다.
            </p>
            <p>
              특히 한국에서는 연봉 협상 문화가 아직 충분히 자리 잡지 않아, 제대로
              준비하고 협상하는 것만으로도 상당한 우위를 점할 수 있습니다. 이
              가이드를 끝까지 읽고, 다음 협상에서 자신의 가치에 걸맞은 보상을
              받아보세요.
            </p>
          </div>
        </section>

        {/* 2. 연봉 협상 전 준비사항 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            2. 연봉 협상 전 반드시 해야 할 준비
          </h2>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* 2-1 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                2-1. 시장 연봉 조사 — 내 몸값을 객관적으로 파악하기
              </h3>
              <p>
                협상에서 가장 강력한 무기는 &quot;데이터&quot;입니다. 감으로 &quot;이 정도는
                받아야지&quot;라고 생각하는 것과, 구체적인 시장 데이터를 기반으로
                &quot;동일 직무·경력 기준 시장 중위값은 X천만원입니다&quot;라고 말하는 것은
                전혀 다른 무게를 가집니다.
              </p>
              <div className="mt-3 space-y-2">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">잡코리아·사람인 연봉 탐색기</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    직무별·경력별·기업 규모별 연봉 분포를 확인할 수 있습니다. 무료로 이용 가능하며,
                    회원 제출 데이터 기반이라 표본이 비교적 많습니다. 다만, 자기 보고식이라 약간의
                    상향 편향이 있을 수 있습니다.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">크레딧잡</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    국민연금 납부액을 기반으로 추정 연봉을 제공하므로 비교적 정확합니다.
                    기업별 평균 연봉과 근속 연수 등 유용한 정보를 확인할 수 있습니다.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">블라인드·잡플래닛</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    현직자들의 실제 연봉 정보와 기업 문화, 면접 후기까지 통합적으로 확인 가능합니다.
                    특정 포지션의 오퍼 수준도 공유되는 경우가 많아 참고하기 좋습니다.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">링크드인·원티드</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    채용 공고에 명시된 연봉 범위를 직접 확인할 수 있습니다. 특히 IT·스타트업
                    분야에서는 연봉 범위를 공개하는 기업이 많아 시장 시세를 파악하기 좋습니다.
                  </p>
                </div>
              </div>
              <p className="mt-3">
                하나의 출처에만 의존하지 말고, 최소 3개 이상의 출처를 교차
                확인하세요. 또한 같은 직무라도 산업(금융, IT, 제조 등)과 기업
                규모(대기업, 중견기업, 스타트업)에 따라 연봉 수준이 크게 다르므로,
                자신의 상황에 맞는 비교군을 설정하는 것이 중요합니다.
              </p>
            </div>

            {/* 2-2 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                2-2. 내 실적과 성과 정리 — &quot;숫자&quot;로 말하기
              </h3>
              <p>
                &quot;열심히 했습니다&quot;는 협상에서 아무런 힘이 없습니다. 대신 구체적인
                숫자와 결과로 자신의 기여를 증명해야 합니다.
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span><strong>매출 기여:</strong> &quot;담당 프로젝트로 분기 매출 X억원 달성, 전년 대비 Y% 성장&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span><strong>비용 절감:</strong> &quot;프로세스 개선으로 연간 운영 비용 X천만원 절감&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span><strong>효율 개선:</strong> &quot;업무 자동화로 처리 시간 X시간 → Y시간 단축&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <span><strong>팀 성과:</strong> &quot;X명 팀 리드, 프로젝트 일정 대비 2주 앞당겨 완료&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 w-5 h-5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                  <span><strong>고객 성과:</strong> &quot;고객 만족도 NPS X점 → Y점 향상, 재계약률 Z% 달성&quot;</span>
                </li>
              </ul>
              <p className="mt-3">
                이런 성과들을 문서로 정리해두면, 협상 자리에서 자신감 있게 말할 수
                있을 뿐 아니라, 상사나 인사팀이 경영진에게 인상을 보고할 때 쓸 수
                있는 근거 자료가 됩니다. 평소에 성과를 기록하는 습관을 들이세요.
                분기마다 짧은 &quot;성과 일지&quot;를 작성해 두면 연봉 협상 시즌에
                큰 도움이 됩니다.
              </p>
            </div>

            {/* 2-3 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                2-3. 목표 연봉 설정 — 실수령액 기준으로 역산하기
              </h3>
              <p>
                많은 사람이 연봉 금액 자체에만 집중하지만, 정작 중요한 것은
                실수령액입니다. 연봉 6,000만원과 7,000만원의 차이는 1,000만원이지만,
                실수령액 차이는 약 740만원 정도입니다. 4대보험과 소득세를 고려하면
                연봉 인상분의 약 74~77%만 실제로 손에 들어옵니다.
              </p>
              <p className="mt-2">
                따라서 &quot;월 실수령 목표가 350만원이라면 연봉은 얼마를 받아야
                하는가?&quot;처럼 실수령액에서 역산하여 목표 연봉을 설정하는 것이
                합리적입니다. 아래 계산기를 활용하면 연봉별 실수령액을 즉시
                확인할 수 있습니다.
              </p>
              <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                  내가 원하는 실수령액을 받으려면 연봉이 얼마여야 할까?
                </p>
                <Link
                  href="/"
                  className="inline-block bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors"
                >
                  실수령액 계산기로 확인하기
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 광고 배너 1 */}
        <AdBanner
          format="auto"
          layout="in-article"
          className="my-4"
          adPosition="guide-negotiation-mid1"
        />

        {/* 3. 연봉 vs 실수령액 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            3. 연봉 차이가 실수령액에 미치는 영향
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              연봉 협상의 결과를 정확히 평가하려면, 명목 연봉이 아닌 실수령액
              기준으로 비교해야 합니다. 한국의 소득세 체계는 누진세율 구조이기
              때문에, 연봉이 올라갈수록 세금 부담이 비례 이상으로 증가합니다.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                연봉 500만원 인상 시 실수령액 변화
              </h3>
              <div className="overflow-x-auto -mx-2 px-2">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="text-left p-2.5 rounded-tl-lg font-semibold text-gray-700 dark:text-gray-300">연봉 구간</th>
                      <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-300">연봉</th>
                      <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-300">월 실수령</th>
                      <th className="text-right p-2.5 rounded-tr-lg font-semibold text-gray-700 dark:text-gray-300">월 차이</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    <tr>
                      <td className="p-2.5 text-gray-600 dark:text-gray-400">인상 전</td>
                      <td className="p-2.5 text-right font-medium">3,000만원</td>
                      <td className="p-2.5 text-right">약 223만원</td>
                      <td className="p-2.5 text-right" rowSpan={2}>
                        <span className="text-green-600 dark:text-green-400 font-bold">+약 33만원</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-gray-600 dark:text-gray-400">인상 후</td>
                      <td className="p-2.5 text-right font-medium">3,500만원</td>
                      <td className="p-2.5 text-right">약 256만원</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-gray-600 dark:text-gray-400">인상 전</td>
                      <td className="p-2.5 text-right font-medium">5,000만원</td>
                      <td className="p-2.5 text-right">약 346만원</td>
                      <td className="p-2.5 text-right" rowSpan={2}>
                        <span className="text-green-600 dark:text-green-400 font-bold">+약 32만원</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-gray-600 dark:text-gray-400">인상 후</td>
                      <td className="p-2.5 text-right font-medium">5,500만원</td>
                      <td className="p-2.5 text-right">약 378만원</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-gray-600 dark:text-gray-400">인상 전</td>
                      <td className="p-2.5 text-right font-medium">8,000만원</td>
                      <td className="p-2.5 text-right">약 530만원</td>
                      <td className="p-2.5 text-right" rowSpan={2}>
                        <span className="text-green-600 dark:text-green-400 font-bold">+약 30만원</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-gray-600 dark:text-gray-400">인상 후</td>
                      <td className="p-2.5 text-right font-medium">8,500만원</td>
                      <td className="p-2.5 text-right">약 560만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                * 부양가족 1인(본인), 비과세 식대 20만원 기준 예시. 실제 금액은 개인 상황에 따라 다릅니다.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                세율 구간 점프 — 알아두어야 할 핵심 포인트
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                2026년 기준 과세표준 1,400만원 초과 시 15%, 5,000만원 초과 시 24%,
                8,800만원 초과 시 35%의 세율이 적용됩니다. 단, 누진세이기 때문에
                세율 구간이 바뀌더라도 &quot;전체 소득에 높은 세율이 적용되는 것이 아니라,
                초과분에만 높은 세율이 적용&quot;됩니다. 즉, 세율 구간이 올라가면
                손해라는 것은 잘못된 상식입니다. 연봉이 오르면 실수령액도 반드시
                올라갑니다. 다만 인상분 대비 실수령 증가분의 비율(한계실효세율)은
                연봉이 높을수록 낮아진다는 점을 인식하고 협상 목표를 설정하세요.
              </p>
            </div>

            <p>
              이렇게 연봉 인상분 전체가 내 주머니로 들어오지 않는다는 사실을
              이해하면, 협상에서 더 현실적이고 전략적인 접근이 가능합니다.
              예를 들어, 연봉 500만원 인상이 어려운 상황이라면 비과세 항목(식대,
              차량유지비 등)을 늘리는 방식으로 실수령액을 높이는 전략도 고려할 수
              있습니다. 비과세 항목은 소득세와 4대보험이 부과되지 않으므로 같은
              금액이라도 실수령액에 더 큰 영향을 줍니다.
            </p>
          </div>
        </section>

        {/* 4. 이직 시 연봉 협상 팁 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            4. 이직 시 연봉 협상 — 핵심 전략과 주의사항
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              이직은 커리어에서 가장 큰 폭의 연봉 인상을 실현할 수 있는
              기회입니다. 재직 중 연봉 인상이 보통 3~7% 수준인 것에 비해, 이직
              시에는 15~30%, 때로는 그 이상의 인상도 가능합니다. 하지만 이를
              위해서는 전략적인 접근이 필요합니다.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                현재 연봉 공개 여부 — 전략적 판단
              </h3>
              <p>
                가장 많이 고민되는 부분입니다. 기본 원칙은 &quot;현재 연봉이 시장 대비
                적절하거나 높다면 공개, 낮다면 비공개&quot;입니다.
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="font-semibold text-sm text-green-800 dark:text-green-200 mb-1">공개가 유리한 경우</p>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1 list-disc list-inside">
                    <li>현재 연봉이 시장 평균 이상일 때</li>
                    <li>상대 회사가 적극적으로 스카웃할 때</li>
                    <li>투명한 처우 협의를 원할 때</li>
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                  <p className="font-semibold text-sm text-red-800 dark:text-red-200 mb-1">비공개가 유리한 경우</p>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1 list-disc list-inside">
                    <li>현재 연봉이 시장 대비 낮을 때</li>
                    <li>직무 전환으로 새로운 가치 제공 시</li>
                    <li>기대 연봉이 현재보다 크게 높을 때</li>
                  </ul>
                </div>
              </div>
              <p className="mt-3">
                현재 연봉을 말하지 않으려 할 때, &quot;희망 연봉은 X천만원입니다. 이는 제
                경력과 역량, 시장 시세를 고려한 금액입니다&quot;라고 자연스럽게
                전환하세요. 만약 전 직장 원천징수영수증을 요구하는 경우에는 법적
                의무는 없지만, 거절 시 채용 프로세스에 영향을 줄 수 있으므로
                상황에 따라 유연하게 대응하는 것이 좋습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                스톡옵션·성과급·복지 — 총 보상 패키지로 비교하기
              </h3>
              <p>
                연봉만으로 두 기업의 처우를 비교하는 것은 불완전합니다.
                특히 IT·스타트업 업계에서는 기본 연봉 외에 스톡옵션이나 RSU가
                보상의 큰 부분을 차지하는 경우가 많습니다. 총 보상(Total
                Compensation)을 기준으로 비교하세요.
              </p>
              <div className="mt-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">총 보상 비교 체크리스트</p>
                <ul className="text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded" />
                    <span>기본 연봉 (퇴직금 포함/별도 확인 필수)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded" />
                    <span>성과급/인센티브 (보장 여부, 평균 수령률)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded" />
                    <span>스톡옵션/RSU (행사가격, 베스팅 일정, 예상 가치)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded" />
                    <span>사이닝 보너스 (입사 시 일회성 지급)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5 w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded" />
                    <span>복리후생 금전 환산 (식대, 교통비, 건강검진, 통신비 등)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                퇴직금 포함 vs 별도 — 반드시 확인해야 할 함정
              </h3>
              <p>
                한국에서 흔히 발생하는 실수 중 하나가 퇴직금 포함 여부를 확인하지
                않는 것입니다. &quot;연봉 6,000만원&quot;이라 해도 퇴직금 포함이면 실제
                급여 산정 기준은 약 5,538만원(6,000 / 1.0833)이 됩니다. 이는 퇴직금
                별도 연봉 5,538만원과 같은 수준입니다.
              </p>
              <p className="mt-2">
                오퍼 레터를 받으면 반드시 &quot;해당 연봉은 퇴직금 포함인가요,
                별도인가요?&quot;를 확인하세요. 이 한 가지 질문이 연간 수백만원의
                차이를 만들 수 있습니다. 특히 중소기업이나 스타트업에서는 퇴직금
                포함 연봉을 제시하는 경우가 종종 있으므로 주의가 필요합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 5. 재직 중 연봉 인상 협상 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            5. 재직 중 연봉 인상 협상 — 타이밍과 전략
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              이직 없이 현 직장에서 연봉을 올리는 것은 쉽지 않지만, 불가능한 것도
              아닙니다. 핵심은 &quot;타이밍&quot;과 &quot;근거 자료&quot;입니다.
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                최적의 타이밍 잡기
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 bg-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">1</span>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">인사평가 시즌 (12월~2월)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      대부분의 회사에서 연봉 조정이 이루어지는 시기입니다. 평가 면담
                      자리에서 자연스럽게 연봉 이야기를 꺼낼 수 있고, 회사도 예산
                      편성 단계이므로 반영이 수월합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 bg-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">2</span>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">큰 성과 직후</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      대형 프로젝트를 성공적으로 마쳤거나, 중요한 거래를 성사시킨
                      직후가 좋습니다. 성과가 생생할 때 협상해야 효과적입니다.
                      &quot;기여한 내용이 있으니 그에 맞는 보상을 논의하고 싶다&quot;고
                      접근하세요.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 bg-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">3</span>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">역할 확대·승진 시</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      담당 업무가 늘어나거나 팀 리더 역할을 맡게 되었을 때, 역할
                      변화에 맞는 보상 조정을 요청하는 것은 매우 합리적인
                      접근입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                근거 자료 준비 방법
              </h3>
              <p>
                상사와의 연봉 협상에서 가장 중요한 것은 &quot;감정이 아닌 논리&quot;로
                접근하는 것입니다. 다음과 같은 자료를 준비하세요.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm list-disc list-inside">
                <li>
                  <strong>성과 요약:</strong> 지난 평가 기간 동안의 핵심 성과를
                  3~5가지로 정리 (숫자 포함)
                </li>
                <li>
                  <strong>시장 데이터:</strong> 동일 직무·경력의 시장 연봉 범위
                  (크레딧잡, 잡코리아 등 출처 명시)
                </li>
                <li>
                  <strong>역할 변화:</strong> 입사 시 대비 현재 담당 업무 범위가
                  얼마나 확대되었는지
                </li>
                <li>
                  <strong>향후 기여 계획:</strong> 앞으로 회사에 기여할 수 있는
                  구체적인 계획이나 프로젝트
                </li>
              </ul>
              <p className="mt-3">
                협상 시 &quot;저는 시장 평균 대비 X% 낮은 보상을 받고 있습니다. 지난 1년간
                Y라는 성과를 달성했고, 이를 반영하여 Z만원 수준의 인상을 요청
                드립니다&quot;와 같이, 데이터에 기반한 논리적 요청을 하면 회사 측에서도
                수용하기 쉽습니다.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">
                실전 대화 예시
              </p>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 italic">
                <p>
                  &quot;팀장님, 이번 평가 기간에 대해 말씀드리고 싶은 부분이 있습니다.
                  지난 1년간 A 프로젝트에서 매출 15% 성장에 기여했고, B 프로세스
                  개선으로 팀 효율을 30% 높였습니다. 또한 시장 데이터를 확인해 보니
                  동일 직무 3년차 기준 중위 연봉이 X천만원인데, 현재 제 연봉은 그
                  아래 수준입니다. 이런 성과와 시장 상황을 감안하여 연봉 조정을
                  논의할 수 있을까요?&quot;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 협상에서 피해야 할 실수 5가지 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            6. 연봉 협상에서 절대 피해야 할 실수 5가지
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 dark:border-red-500 pl-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  실수 1: 먼저 숫자를 말한다
                </p>
                <p className="text-sm mt-1">
                  가능하다면 상대방이 먼저 제안하게 하세요. 먼저 숫자를 말하면
                  그것이 앵커(기준점)가 되어 협상 범위가 제한됩니다. &quot;이 포지션의
                  예산 범위를 알 수 있을까요?&quot;라고 먼저 물어보세요. 다만, 상대가
                  끝까지 공개하지 않는다면 시장 데이터 기반의 범위(예: &quot;X천~Y천만원
                  사이를 기대합니다&quot;)를 제시하되, 범위의 하한을 자신이 수용 가능한
                  최소 금액보다 높게 설정하세요.
                </p>
              </div>
              <div className="border-l-4 border-red-400 dark:border-red-500 pl-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  실수 2: 감정적으로 접근한다
                </p>
                <p className="text-sm mt-1">
                  &quot;생활비가 너무 많이 들어서…&quot;, &quot;대출금을 갚아야 해서…&quot;와 같은
                  개인적인 재정 사정을 이야기하는 것은 협상에 전혀 도움이 되지
                  않습니다. 회사는 당신의 가치에 대해 보상하는 것이지, 개인 재정
                  상황을 보조하는 것이 아닙니다. 항상 &quot;나의 기여와 시장 가치&quot;를
                  중심으로 대화하세요.
                </p>
              </div>
              <div className="border-l-4 border-red-400 dark:border-red-500 pl-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  실수 3: 최초 제안을 바로 수락한다
                </p>
                <p className="text-sm mt-1">
                  대부분의 기업은 첫 제안에 여유분을 둡니다. 바로 수락하면 본인도
                  &quot;더 요청할 수 있었을 텐데&quot;라는 아쉬움이 남고, 채용 담당자도
                  &quot;너무 쉽게 수락했나&quot; 의구심을 품을 수 있습니다. 첫 제안을 받으면
                  &quot;감사합니다. 종합적으로 검토한 후 회신드리겠습니다&quot;라고 말하고,
                  하루 이틀 정도 시간을 두고 카운터 오퍼를 준비하세요.
                </p>
              </div>
              <div className="border-l-4 border-red-400 dark:border-red-500 pl-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  실수 4: 최후통첩식 협상을 한다
                </p>
                <p className="text-sm mt-1">
                  &quot;이 정도 못 주시면 이직합니다&quot; 같은 최후통첩은 양날의 검입니다.
                  실제로 떠날 준비가 되어 있다면 사용할 수 있지만, 블러핑이
                  들통나면 신뢰가 크게 손상됩니다. 대신 &quot;다른 기회들도 검토 중이지만,
                  현 회사에서 계속 성장하고 싶은 마음이 있습니다. 그에 맞는 보상
                  조정이 가능할까요?&quot;라고 부드럽게 표현하세요.
                </p>
              </div>
              <div className="border-l-4 border-red-400 dark:border-red-500 pl-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  실수 5: 동료 연봉을 비교 기준으로 삼는다
                </p>
                <p className="text-sm mt-1">
                  &quot;옆 팀 누구보다 적게 받고 있다&quot;는 식의 내부 비교는 거의
                  역효과를 냅니다. 회사 입장에서는 급여 정보 유출에 대한 우려가
                  생기고, 개인 간 보상 차이에 대한 불필요한 논쟁이 발생합니다.
                  내부가 아닌 외부 시장 데이터를 기준으로 협상하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 광고 배너 2 */}
        <AdBanner
          format="auto"
          layout="in-article"
          className="my-4"
          adPosition="guide-negotiation-mid2"
        />

        {/* 7. 연봉 외 협상 포인트 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            7. 연봉만이 전부가 아니다 — 함께 협상할 수 있는 혜택들
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              연봉 인상에 한계가 있다면, 다른 혜택을 협상하여 실질적인 보상을
              높일 수 있습니다. 일부 혜택은 비과세이거나 세제 혜택이 있어, 같은
              금액의 연봉 인상보다 실수령액 기준으로 더 유리할 수 있습니다.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">유연근무·재택근무</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  출퇴근 시간과 교통비를 절약할 수 있어 시간당 실질 소득이 높아집니다.
                  주 2~3일 재택근무 시 월 교통비 10~20만원 절감 효과가 있습니다.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">자기개발비·교육비</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  학원비, 자격증 비용, 컨퍼런스 참가비 등을 회사에서 지원받으면
                  개인 지출을 줄이면서 커리어 성장도 가능합니다. 연 100~300만원 수준이
                  일반적입니다.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">식대·통신비 (비과세)</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  2026년 기준 식대 월 20만원은 비과세입니다. 연봉에서 비과세 식대 비중을
                  높이면 같은 총액이라도 실수령액이 늘어납니다.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">건강검진·의료비 지원</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  종합건강검진(보통 50~150만원 상당)을 매년 지원받으면 건강 관리와
                  비용 절약을 동시에 할 수 있습니다.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">추가 연차·리프레시 휴가</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  법정 연차 외 추가 유급휴가를 받으면, 시간당 실질 보상이 올라갑니다.
                  일부 회사는 안식월이나 리프레시 휴가를 제공하기도 합니다.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-1">사이닝 보너스</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  연봉 인상은 매년 누적되지만, 사이닝 보너스는 일회성입니다. 회사가
                  연봉 인상은 어렵지만 일회성 보상은 가능하다면, 사이닝 보너스를
                  제안해 보세요.
                </p>
              </div>
            </div>

            <p>
              이러한 혜택들을 금전으로 환산하면 연간 수백만원에 달할 수 있습니다.
              연봉 500만원 인상보다 유연근무 + 교육비 + 건강검진 지원을 받는 것이
              삶의 질 측면에서 더 나을 수 있습니다. 협상의 시야를 넓히세요.
            </p>
          </div>
        </section>

        {/* 8. 연봉 비교표 활용법 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            8. 연봉별 실수령액 비교표로 협상 전략 세우기
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              연봉 협상에서 구체적인 숫자를 파악하고 있으면 훨씬 유리합니다.
              &quot;연봉 500만원을 더 받으면 월급이 얼마나 오르나요?&quot;에 즉답할 수 있어야
              합니다. 아래는 주요 연봉 구간별 월 실수령액 비교입니다.
            </p>

            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-2.5 rounded-tl-lg font-semibold text-gray-700 dark:text-gray-300">연봉</th>
                    <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-300">월 실수령액</th>
                    <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-300">4대보험+세금</th>
                    <th className="text-right p-2.5 rounded-tr-lg font-semibold text-gray-700 dark:text-gray-300">실수령률</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    { salary: '2,400만원', net: '약 181만원', tax: '약 19만원', rate: '90.6%' },
                    { salary: '3,000만원', net: '약 223만원', tax: '약 27만원', rate: '89.2%' },
                    { salary: '4,000만원', net: '약 289만원', tax: '약 44만원', rate: '86.8%' },
                    { salary: '5,000만원', net: '약 346만원', tax: '약 71만원', rate: '83.0%' },
                    { salary: '6,000만원', net: '약 403만원', tax: '약 97만원', rate: '80.6%' },
                    { salary: '7,000만원', net: '약 460만원', tax: '약 123만원', rate: '78.9%' },
                    { salary: '8,000만원', net: '약 530만원', tax: '약 137만원', rate: '79.5%' },
                    { salary: '1억원', net: '약 640만원', tax: '약 193만원', rate: '76.8%' },
                  ].map((row) => (
                    <tr key={row.salary} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-2.5 font-medium">{row.salary}</td>
                      <td className="p-2.5 text-right text-blue-600 dark:text-blue-400 font-semibold">{row.net}</td>
                      <td className="p-2.5 text-right text-gray-500 dark:text-gray-400">{row.tax}</td>
                      <td className="p-2.5 text-right">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              * 부양가족 1인(본인), 비과세 식대 20만원 기준 추정치. 정확한 금액은{' '}
              <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
                실수령액 계산기
              </Link>
              에서 확인하세요.
            </p>

            <p>
              이 표를 활용하면 &quot;연봉 5,000만원에서 6,000만원으로 올리면 월 57만원
              더 받는다&quot;, &quot;연봉 7,000만원에서 8,000만원은 월 70만원 차이&quot;처럼
              구체적인 수치를 가지고 협상에 임할 수 있습니다. 더 상세한 비교가
              필요하다면 연봉별 비교표 페이지를 참고하세요.
            </p>

            <div className="text-center mt-2">
              <Link
                href="/salary"
                className="inline-block text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                연봉별 실수령액 비교표 보기 →
              </Link>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            자주 묻는 질문 (FAQ)
          </h2>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {faqs.map((faq, i) => (
              <details key={i} className="group py-4 first:pt-0 last:pb-0">
                <summary className="flex items-start justify-between cursor-pointer list-none">
                  <span className="font-semibold text-gray-800 dark:text-gray-200 pr-4 text-sm sm:text-base">
                    Q. {faq.question}
                  </span>
                  <span className="shrink-0 mt-1 text-gray-400 group-open:rotate-180 transition-transform">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 10. CTA */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            내 연봉 실수령액, 지금 바로 확인하세요
          </h2>
          <p className="text-white/85 text-sm sm:text-base mb-5 max-w-lg mx-auto leading-relaxed">
            연봉 협상 전, 목표 연봉의 실수령액을 정확히 파악하는 것이 첫
            걸음입니다. 2026년 최신 4대보험·소득세 기준으로 계산해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-block bg-white text-purple-700 font-bold px-8 py-3 rounded-xl text-sm hover:bg-purple-50 transition-colors shadow-md"
            >
              실수령액 계산기 바로가기
            </Link>
            <Link
              href="/salary"
              className="inline-block bg-white/20 text-white font-semibold px-8 py-3 rounded-xl text-sm hover:bg-white/30 transition-colors border border-white/30"
            >
              연봉별 비교표 보기
            </Link>
          </div>
        </section>

        {/* 하단 네비게이션 */}
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <Link
            href="/guide"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            ← 가이드 목록으로 돌아가기
          </Link>
          <Link
            href="/"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            연봉 계산기 홈으로
          </Link>
        </nav>
      </article>
    </>
  );
}
