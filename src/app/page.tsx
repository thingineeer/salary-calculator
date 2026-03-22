import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorSection from '@/components/CalculatorSection';
import AdBanner from '@/components/AdBanner';
import { faqs } from '@/lib/faq-data';
import FAQAccordion from '@/components/FAQAccordion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8">
        {/* 인터랙티브 계산기 (클라이언트 컴포넌트) */}
        <CalculatorSection />

        {/* FAQ - 서버에서 정적 콘텐츠 렌더링 + 클라이언트 아코디언 */}
        <div className="content-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              자주 묻는 질문
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </div>

        {/* 2026년 계산기 안내 교육 콘텐츠 - 서버 렌더링 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover space-y-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            2026년 연봉 실수령액, 어떻게 계산되나요?
          </h2>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              매달 월급에서 빠지는 공제 항목은 크게 <strong>4대보험료</strong>와{' '}
              <strong>소득세·지방소득세</strong> 두 가지로 나뉩니다. 4대보험은 국민연금(4.75%),
              건강보험(3.595%), 장기요양보험(건강보험의 13.14%), 고용보험(0.9%)으로 구성되며,
              비과세 금액을 뺀 과세 소득에 각 요율을 곱해 산출합니다.
            </p>
            <p>
              소득세는 연간 총급여에서 근로소득공제와 인적공제를 차감한 &lsquo;과세표준&rsquo;에 따라
              6%~45%의 누진세율이 적용됩니다. 2026년에는 국민연금 요율이 9%에서 9.5%로 인상되어
              근로자 부담분이 4.5%에서 4.75%로 변경되었습니다.
            </p>
            <p>
              지방소득세는 소득세의 10%이며, 이 모든 공제를 차감한 금액이 실제로 통장에 입금되는
              &lsquo;실수령액&rsquo;입니다. 연말정산을 통해 최종 세금이 정산되므로, 매월 원천징수되는
              금액은 추정치이며 환급이나 추가 납부가 발생할 수 있습니다.
            </p>
          </div>

          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 pt-2">
            2026년 주요 변경사항
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">1</span>
              <span><strong>국민연금 요율 인상</strong> — 연금개혁으로 전체 요율이 9%→9.5%로 인상. 근로자 부담분은 4.5%→4.75%가 되었습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">2</span>
              <span><strong>건강보험 요율</strong> — 7.19%(근로자 3.595%)로 소폭 조정되었습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">3</span>
              <span><strong>장기요양보험 요율</strong> — 건강보험료의 13.14%로 조정. 고령화에 따라 꾸준히 상승 추세입니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">4</span>
              <span><strong>국민연금 상한 소득월액</strong> — 637만원으로 상향되어, 고소득자의 연금 부담이 증가합니다.</span>
            </li>
          </ul>
        </section>

        {/* 가이드 배너 - 서버 렌더링 */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            급여·세금 가이드
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            계산기만으로는 알 수 없는 세금과 보험의 원리를 이해해 보세요.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guide/income-tax" className="block p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
              <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">근로소득세 가이드</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">과세표준·세율·공제 총정리</p>
            </Link>
            <Link href="/guide/social-insurance" className="block p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
              <p className="text-sm font-semibold text-green-800 dark:text-green-200">4대보험 가이드</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">국민연금·건강보험·고용보험</p>
            </Link>
            <Link href="/guide/tax-saving" className="block p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">절세 전략 10가지</p>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">연말정산 환급 극대화</p>
            </Link>
            <Link href="/guide/salary-negotiation" className="block p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-800/30 transition-colors">
              <p className="text-sm font-semibold text-purple-800 dark:text-purple-200">연봉 협상 가이드</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">이직·연봉인상 실전 전략</p>
            </Link>
          </div>
          <div className="mt-3 text-center">
            <Link href="/guide" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              전체 가이드 보기 →
            </Link>
          </div>
        </section>

        {/* 하단 광고 배너 - 최대 2개 중 2개 */}
        <AdBanner format="auto" adPosition="footer_above" className="w-full min-h-[90px]" />
      </main>

      <Footer />
    </div>
  );
}
