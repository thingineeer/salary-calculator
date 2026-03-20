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
