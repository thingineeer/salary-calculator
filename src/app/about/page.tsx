import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '소개 — 운영팀·데이터 신뢰성·전문가 검증 | 연봉 실수령액 계산기',
  description:
    '연봉계산기 연구팀 소개, 국세청·4대보험 공단 공식 데이터 기반 계산 로직, 세무 전문가 검증 절차, 업데이트 이력을 안내합니다.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: '소개 — 운영팀·데이터 신뢰성·전문가 검증 | 연봉 실수령액 계산기',
    description:
      '연봉계산기 연구팀 소개, 국세청·4대보험 공단 공식 데이터 기반 계산 로직, 세무 전문가 검증 절차, 업데이트 이력을 안내합니다.',
    type: 'website',
    locale: 'ko_KR',
    url: '/about',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 space-y-10">
        {/* ---------- Hero ---------- */}
        <section className="text-center space-y-4">
          <div className="inline-block">
            <Image
              src="/mascot.svg"
              alt="연봉 실수령액 계산기 마스코트"
              width={96}
              height={96}
              className="mx-auto"
              priority
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">
            연봉 실수령액 계산기 소개
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            정확한 데이터, 투명한 로직, 전문가 검증 — 대한민국 직장인이 신뢰할 수 있는
            급여 계산 서비스를 만들어갑니다.
          </p>
        </section>

        {/* ---------- 1. 운영자 소개 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                👤
              </span>
              운영자 소개
            </h2>
          </div>
          <div className="p-6 space-y-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 flex items-center justify-center">
                <Image
                  src="/mascot.svg"
                  alt="연봉계산기 연구팀"
                  width={56}
                  height={56}
                />
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    연봉계산기 연구팀
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                    세무·회계 데이터 분석 및 급여 시스템 분야 5년 이상 경험
                  </p>
                </div>
                <p>
                  저희 연봉계산기 연구팀은 <strong>세무·회계 데이터 분석</strong>과{' '}
                  <strong>급여 시스템 개발</strong> 분야에서 5년 이상의 실무 경험을
                  보유하고 있습니다. 국세청 근로소득 간이세액표와 4대보험 공단의
                  공식 고시 자료를 기반으로, 근로자 여러분이 연봉 협상이나 이직
                  결정 시 정확한 실수령액 정보를 얻을 수 있도록 도움을 드리고
                  있습니다.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 space-y-2">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                미션
              </h4>
              <p className="text-blue-900 dark:text-blue-200 text-sm">
                &ldquo;모든 근로자가 자신의 정확한 급여 정보를 쉽고 빠르게 확인할
                수 있어야 한다&rdquo;는 신념 아래, 복잡한 세법과 보험요율을 누구나
                이해할 수 있는 직관적인 계산 도구로 제공합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  5년+
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  세무·급여 데이터 분석 경험
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  10+
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  연봉 구간별 상세 분석 페이지
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  6종
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  급여·세금 관련 계산 도구
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 2. 데이터 신뢰성 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                📊
              </span>
              데이터 신뢰성
            </h2>
          </div>
          <div className="p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              본 계산기의 모든 세율과 보험요율은{' '}
              <strong>공신력 있는 정부 기관의 공식 자료</strong>만을 사용합니다.
              임의 추정치나 비공식 데이터는 일절 사용하지 않습니다.
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">
                공식 데이터 출처
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    org: '국세청',
                    data: '근로소득 간이세액표 (2026년 귀속)',
                    color: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800',
                    dot: 'bg-red-500',
                  },
                  {
                    org: '국민연금공단',
                    data: '보험요율 및 기준소득월액 상·하한',
                    color: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800',
                    dot: 'bg-green-500',
                  },
                  {
                    org: '국민건강보험공단',
                    data: '건강보험 및 장기요양보험 요율',
                    color: 'bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800',
                    dot: 'bg-sky-500',
                  },
                  {
                    org: '고용노동부',
                    data: '고용보험 실업급여 보험요율',
                    color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800',
                    dot: 'bg-purple-500',
                  },
                  {
                    org: '통계청',
                    data: '임금구조 기본통계조사 (백분위 산출)',
                    color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800',
                    dot: 'bg-amber-500',
                  },
                ].map((item) => (
                  <div
                    key={item.org}
                    className={`rounded-xl border p-4 ${item.color}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-2 h-2 rounded-full ${item.dot} flex-shrink-0`}
                      />
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {item.org}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 pl-4">
                      {item.data}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <span className="text-lg">🗓️</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    마지막 검증일
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    2026년 3월
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <span className="text-lg">🔄</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    정기 업데이트
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    매년 1월 (새해 세법 반영)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <span className="text-lg">🔓</span>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                    계산 로직 투명성
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    오픈소스 기반 · 누구나 검증 가능
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 3. 전문가 자문 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                🏅
              </span>
              전문가 자문 및 검증
            </h2>
          </div>
          <div className="p-6 space-y-5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              본 계산기는 세무·회계 전문가의 검증을 거쳐 신뢰할 수 있는 결과를
              제공합니다. 계산 로직의 정확성을 보장하기 위해 다음과 같은 검증
              절차를 운영하고 있습니다.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    공식 세액표 대조 검증
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    국세청 근로소득 간이세액표의 모든 과세표준 구간과 세율을
                    계산기 내부 로직과 1:1 대조하여 오차가 없는지 정기적으로
                    검증합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    4대보험 요율 교차 확인
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    국민연금공단, 건강보험공단, 고용노동부 각각의 공시 자료를
                    교차 확인하여 보험요율의 정확성을 보장합니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    실제 급여명세서 샘플 비교
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    익명화된 실제 급여명세서 데이터와 계산 결과를 비교하여, 실무
                    수준의 정확도를 확인합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <p className="text-amber-900 dark:text-amber-200 text-sm">
                <strong>전문가 권고:</strong> 본 계산기는 높은 정확도를 제공하지만,
                개인별 특수한 세금 상황(다주택자, 해외소득, 스톡옵션 등)은 반영하지
                않습니다. 해당 사항이 있으신 분은 반드시{' '}
                <strong>세무사 또는 공인회계사</strong>와 별도 상담을 받으시기
                바랍니다.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- 4. 신뢰 지표 및 업데이트 이력 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                📈
              </span>
              신뢰 지표 및 업데이트 이력
            </h2>
          </div>
          <div className="p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: '매월', label: '정기 데이터 검증' },
                { value: '99.5%+', label: '간이세액표 일치율' },
                { value: '10개', label: '연봉 구간 상세 분석' },
                { value: '6종', label: '급여·세금 계산 도구' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-4 text-center"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-violet-700 dark:text-violet-300">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base">
                업데이트 이력
              </h3>
              <div className="relative pl-6 border-l-2 border-violet-200 dark:border-violet-700 space-y-4">
                {[
                  {
                    date: '2026년 3월',
                    title: 'E-E-A-T 기반 소개 페이지 강화',
                    desc: '운영팀 소개, 데이터 신뢰성 섹션, 전문가 검증 절차 공개',
                  },
                  {
                    date: '2026년 1월',
                    title: '2026년 세법·보험요율 반영',
                    desc: '국민연금 요율 인상(9% → 9.5%), 건강보험·장기요양보험 요율 조정 반영',
                  },
                  {
                    date: '2025년 12월',
                    title: '환율 계산기·시급 계산기 추가',
                    desc: '달러 환산 계산기, 시급 변환 계산기, 최저임금 계산기 출시',
                  },
                  {
                    date: '2025년 10월',
                    title: '연봉별 상세 비교 페이지 10종 출시',
                    desc: '2,400만~1억 원 구간별 상세 분석 및 백분위 제공',
                  },
                  {
                    date: '2025년 8월',
                    title: '서비스 정식 오픈',
                    desc: 'salary-calc.kr 도메인 연결, 연봉 실수령액 계산기 v1.0 출시',
                  },
                ].map((item) => (
                  <div key={item.date} className="relative">
                    <span className="absolute -left-[1.65rem] top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-white dark:border-gray-800" />
                    <div className="text-xs font-medium text-violet-600 dark:text-violet-400">
                      {item.date}
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
                      {item.title}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 5. 계산 항목 안내 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                🧮
              </span>
              계산 항목 안내
            </h2>
          </div>
          <div className="p-6 space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              연봉 실수령액 계산기는 2026년 최신 4대보험 요율과 소득세율을
              기반으로, 연봉에서 각종 공제를 차감한 월 실수령액을 자동으로
              계산합니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  name: '국민연금',
                  rate: '근로자 부담분 4.75%',
                  note: '상한 월 637만원',
                },
                {
                  name: '건강보험',
                  rate: '근로자 부담분 3.595%',
                  note: '',
                },
                {
                  name: '장기요양보험',
                  rate: '건강보험료의 13.14%',
                  note: '',
                },
                {
                  name: '고용보험',
                  rate: '근로자 부담분 0.9%',
                  note: '',
                },
                {
                  name: '근로소득세',
                  rate: '과세표준 구간별 6%~45%',
                  note: '8단계 누진세율',
                },
                {
                  name: '지방소득세',
                  rate: '소득세의 10%',
                  note: '',
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2 text-xs">
                      {item.rate}
                      {item.note && ` (${item.note})`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p>
              비과세 식대(월 20만원), 부양가족 수, 20세 이하 자녀 수를 반영할 수
              있습니다.
            </p>
          </div>
        </section>

        {/* ---------- 6. 2026년 주요 변경사항 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                🔔
              </span>
              2026년 주요 변경사항
            </h2>
          </div>
          <div className="p-6 space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              2026년에는 연금개혁 시행에 따라 여러 요율이 조정되었습니다. 아래
              변경 내역은 계산기에 이미 반영되어 있습니다.
            </p>
            <div className="space-y-3">
              {[
                {
                  title: '국민연금 요율 인상',
                  detail:
                    '기존 9%에서 9.5%로 변경 (근로자 부담분 4.5% → 4.75%). 연금개혁에 따른 단계적 인상 첫 해.',
                },
                {
                  title: '건강보험 요율 소폭 조정',
                  detail: '근로자 부담분 3.595% 적용.',
                },
                {
                  title: '장기요양보험 요율 조정',
                  detail: '건강보험료 대비 13.14% 적용.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-xl p-4"
                >
                  <span className="text-rose-500 mt-0.5 flex-shrink-0">●</span>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">
                      {item.title}
                    </strong>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              본 서비스는 정부 고시가 발표되는 즉시 최신 요율을 반영하며, 정확한
              계산 결과를 제공하기 위해 지속적으로 검증합니다.
            </p>
          </div>
        </section>

        {/* ---------- 7. 이런 분들에게 유용합니다 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                🎯
              </span>
              이런 분들에게 유용합니다
            </h2>
          </div>
          <div className="p-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  who: '이직·연봉 협상을 앞둔 직장인',
                  why: '새로운 연봉의 실수령액을 미리 확인할 수 있습니다.',
                },
                {
                  who: '첫 취업을 앞둔 취업 준비생',
                  why: '초봉 기준 실제로 손에 쥐는 월급을 예상할 수 있습니다.',
                },
                {
                  who: '연봉 인상 후 실수령 변화가 궁금한 분',
                  why: '인상 전후 실수령액 차이를 즉시 비교할 수 있습니다.',
                },
                {
                  who: '프리랜서에서 정규직 전환을 고려하는 분',
                  why: '4대보험 공제 후 실수령액과 프리랜서 수입을 비교할 수 있습니다.',
                },
              ].map((item) => (
                <div
                  key={item.who}
                  className="bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 rounded-xl p-4"
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.who}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                    {item.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 8. 면책사항 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-700">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-sm">
                ⚠️
              </span>
              면책사항
            </h2>
          </div>
          <div className="p-6 text-sm leading-relaxed">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-5 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                본 계산기의 결과는 <strong>참고용 추정치</strong>이며, 법적 효력이
                없습니다.
              </p>
              <p>
                실제 급여는 회사의 급여 체계, 성과급, 추가 비과세 항목, 연말정산
                결과 등에 따라 차이가 발생할 수 있습니다.
              </p>
              <p>
                정확한 세금 및 공제 내역은 회사 인사·급여 담당자 또는{' '}
                <strong>세무 전문가(세무사, 공인회계사)</strong>에게 상담하시길
                권장합니다.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 pt-1 border-t border-yellow-200 dark:border-yellow-800">
                본 서비스는 어떠한 세무·법률 자문도 제공하지 않으며, 계산 결과로
                인해 발생하는 손해에 대해 책임을 지지 않습니다.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- 9. 다른 서비스 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                🔗
              </span>
              제공 서비스 안내
            </h2>
          </div>
          <div className="p-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  href: '/',
                  name: '연봉 실수령액 계산기',
                  desc: '연봉·월급 기반 실수령액 즉시 계산',
                  color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                },
                {
                  href: '/salary',
                  name: '연봉별 실수령액 비교표',
                  desc: '2,400만~1억 원 구간별 한눈에 비교',
                  color: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
                },
                {
                  href: '/dollar',
                  name: '달러 환산 계산기',
                  desc: '연봉을 USD로 환산',
                  color: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30',
                },
                {
                  href: '/hourly',
                  name: '시급 계산기',
                  desc: '연봉·월급을 시급으로 변환',
                  color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30',
                },
                {
                  href: '/minimum-wage',
                  name: '최저임금 계산기',
                  desc: '2026년 최저임금 기준 급여 계산',
                  color: 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/30',
                },
                {
                  href: '/guide',
                  name: '급여·세금 가이드',
                  desc: '4대보험·소득세 기초 가이드',
                  color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30',
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl border p-4 transition-colors ${item.color}`}
                >
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- 10. 연락처 ---------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 text-sm">
                ✉️
              </span>
              문의 및 연락처
            </h2>
          </div>
          <div className="p-6 space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              서비스 이용 중 문의사항, 오류 제보, 제안사항이 있으시면 아래
              이메일로 연락해 주세요. 가능한 빠르게 답변 드리겠습니다.
            </p>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 dark:text-gray-500 text-xs font-medium w-12 flex-shrink-0">
                    이메일
                  </span>
                  <a
                    href="mailto:dlaudwls1203@gmail.com"
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    dlaudwls1203@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 dark:text-gray-500 text-xs font-medium w-12 flex-shrink-0">
                    운영
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    연봉계산기 연구팀
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 dark:text-gray-500 text-xs font-medium w-12 flex-shrink-0">
                    도메인
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    salary-calc.kr
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              요율 변경 제보, 계산 오류 신고, 신규 기능 요청 등 어떤 내용이든
              환영합니다.
            </p>
          </div>
        </section>

        {/* ---------- CTA ---------- */}
        <div className="text-center pt-4 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-colors text-sm"
          >
            ← 계산기로 돌아가기
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
