import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '소개 - 2026 연봉 실수령액 계산기 | 4대보험 소득세 무료 계산',
  description:
    '2026년 최신 세율 기준 연봉 실수령액 계산기를 소개합니다. 4대보험과 소득세 공제 후 월급을 빠르게 확인하세요.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: '소개 - 2026 연봉 실수령액 계산기 | 4대보험 소득세 무료 계산',
    description:
      '2026년 최신 세율 기준 연봉 실수령액 계산기를 소개합니다. 4대보험과 소득세 공제 후 월급을 빠르게 확인하세요.',
    type: 'website',
    locale: 'ko_KR',
    url: '/about',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          연봉 실수령액 계산기 소개
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              이 계산기는 무엇인가요?
            </h2>
            <p>
              연봉 실수령액 계산기는 2026년 최신 4대보험 요율과 소득세율을 기반으로,
              연봉에서 각종 공제를 차감한 월 실수령액을 자동으로 계산해 드리는 무료
              웹 서비스입니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              어떤 항목을 계산하나요?
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>국민연금</strong> — 근로자 부담분 4.75% (상한 월 637만원)
              </li>
              <li>
                <strong>건강보험</strong> — 근로자 부담분 3.595%
              </li>
              <li>
                <strong>장기요양보험</strong> — 건강보험료의 13.14%
              </li>
              <li>
                <strong>고용보험</strong> — 근로자 부담분 0.9%
              </li>
              <li>
                <strong>근로소득세</strong> — 과세표준 구간별 6%~45%
              </li>
              <li>
                <strong>지방소득세</strong> — 소득세의 10%
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              이런 분들에게 유용합니다
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>이직 또는 연봉 협상을 앞두고 실수령액이 궁금한 직장인</li>
              <li>첫 취업을 앞둔 취업 준비생</li>
              <li>연봉 인상 후 실제로 얼마나 더 받는지 확인하고 싶은 분</li>
              <li>프리랜서에서 정규직 전환 시 급여를 비교하고 싶은 분</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              계산 기준
            </h2>
            <p>
              본 계산기는 2026년 기준 국세청 근로소득 간이세액표와 4대보험 공단에서
              고시한 보험요율을 바탕으로 계산합니다. 비과세 식대(월 20만원), 부양가족
              수, 20세 이하 자녀 수를 반영할 수 있습니다.
            </p>
            <p className="mt-2">
              다만, 실제 급여는 회사의 급여 체계, 추가 비과세 항목, 연말정산 결과
              등에 따라 달라질 수 있으므로, 본 계산 결과는 참고용으로 활용해 주세요.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              계산 데이터 출처
            </h2>
            <p className="mb-3">
              본 계산기의 모든 세율과 보험요율은 아래 공신력 있는 기관의 공식
              자료를 기반으로 합니다.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>국세청</strong> — 근로소득 간이세액표 (2026년 귀속)
              </li>
              <li>
                <strong>국민연금공단</strong> — 고시 보험요율 및 기준소득월액
                상·하한
              </li>
              <li>
                <strong>국민건강보험공단</strong> — 고시 건강보험 및 장기요양보험
                요율
              </li>
              <li>
                <strong>고용노동부</strong> — 고시 고용보험 실업급여 보험요율
              </li>
              <li>
                <strong>통계청</strong> — 임금구조 기본통계조사 (연봉 백분위 산출
                기초자료)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              2026년 주요 변경사항
            </h2>
            <p className="mb-3">
              2026년에는 연금개혁 시행에 따라 여러 요율이 조정되었습니다.
              계산기에 이미 반영된 주요 변경 내역은 다음과 같습니다.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>국민연금 요율 인상</strong> — 기존 9%에서 9.5%로 변경
                (근로자 부담분 4.5% → 4.75%), 연금개혁에 따른 단계적 인상 첫 해
              </li>
              <li>
                <strong>건강보험 요율 소폭 조정</strong> — 근로자 부담분 3.595%
                적용
              </li>
              <li>
                <strong>장기요양보험 요율 조정</strong> — 건강보험료 대비
                13.14% 적용
              </li>
            </ul>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              본 서비스는 정부 고시가 발표되는 즉시 최신 요율을 반영하며,
              정확한 계산 결과를 제공하기 위해 지속적으로 검증합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              업데이트 정책
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>연간 정기 업데이트</strong> — 매년 1월, 해당 연도의 최신
                세율과 4대보험 요율을 반영합니다.
              </li>
              <li>
                <strong>수시 업데이트</strong> — 정부 고시 또는 법령 변경 시 즉시
                반영합니다.
              </li>
              <li>
                <strong>오픈소스 계산 로직</strong> — 계산 알고리즘은 투명하게
                공개되어 있어 누구나 검증할 수 있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              면책사항
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <p>
                본 계산기의 결과는 <strong>참고용 추정치</strong>이며, 법적
                효력이 없습니다.
              </p>
              <p>
                실제 급여는 회사의 급여 체계, 성과급, 추가 비과세 항목,
                연말정산 결과 등에 따라 차이가 발생할 수 있습니다.
              </p>
              <p>
                정확한 세금 및 공제 내역은 회사 인사·급여 담당자 또는 세무
                전문가에게 상담하시길 권장합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              다른 서비스
            </h2>
            <p className="mb-3">
              연봉 계산 외에도 다양한 급여·세금 관련 도구를 제공합니다.
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  연봉 실수령액 계산기
                </Link>
                <span className="ml-1">— 연봉·월급 기반 실수령액 즉시 계산</span>
              </li>
              <li>
                <Link
                  href="/salary"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  연봉별 실수령액 비교표
                </Link>
                <span className="ml-1">— 2,400만~1억 원 구간별 한눈에 비교</span>
              </li>
              <li>
                <Link
                  href="/dollar"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  달러 환산 계산기
                </Link>
                <span className="ml-1">— 연봉을 USD로 환산</span>
              </li>
              <li>
                <Link
                  href="/hourly"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  시급 계산기
                </Link>
                <span className="ml-1">— 연봉·월급을 시급으로 변환</span>
              </li>
              <li>
                <Link
                  href="/minimum-wage"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  최저임금 계산기
                </Link>
                <span className="ml-1">— 2026년 최저임금 기준 급여 계산</span>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  급여·세금 가이드
                </Link>
                <span className="ml-1">— 4대보험·소득세 기초 가이드</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              문의
            </h2>
            <p>
              서비스 이용 중 문의사항이 있으시면 아래 이메일로 연락해 주세요.
            </p>
            <p className="mt-1 font-medium">dlaudwls1203@gmail.com</p>
          </section>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← 계산기로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
