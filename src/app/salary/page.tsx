'use client';

import { Suspense, useRef } from 'react';
import Link from 'next/link';
import { calculateSalary } from '@/lib/salary-calculator';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { formatNumber } from '@/lib/format';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SECTIONS = [
  { id: 'sec-2400', label: '2,400~4,000만', min: 2400, max: 4000 },
  { id: 'sec-4100', label: '4,100~5,000만', min: 4100, max: 5000 },
  { id: 'sec-5100', label: '5,100~7,000만', min: 5100, max: 7000 },
  { id: 'sec-7100', label: '7,100~9,000만', min: 7100, max: 9000 },
  { id: 'sec-9100', label: '9,100~1억1천', min: 9100, max: 11000 },
  { id: 'sec-11100', label: '1억1천~1억3천', min: 11100, max: 13000 },
  { id: 'sec-13100', label: '1억3천~1억5천', min: 13100, max: 15000 },
];

const REPRESENTATIVE_AMOUNTS = [2400, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000];

function generateRows(min: number, max: number) {
  const rows = [];
  for (let s = min; s <= max; s += 100) {
    const result = calculateSalary({
      annualSalary: s * 10_000,
      dependents: 1,
      childrenUnder20: 0,
      nonTaxableAllowance: DEFAULT_NON_TAXABLE_ALLOWANCE,
    });
    rows.push({ salary: s, ...result });
  }
  return rows;
}

export default function SalaryTablePage() {
  return (
    <Suspense fallback={null}>
      <SalaryTableContent />
    </Suspense>
  );
}

function SalaryTableContent() {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
            2026년 연봉별 실수령액 비교표
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            100만원 단위 · 부양가족 1명(본인) · 비과세 월 20만원 기준
          </p>
        </div>

        {/* ========== 페이지 상단 교육 섹션 ========== */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              연봉별 실수령액 비교표란?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              연봉별 실수령액 비교표는 연봉(세전 급여)에서 4대보험료와 소득세, 지방소득세를 공제한 뒤 실제로 통장에 입금되는 금액을 한눈에 비교할 수 있도록 정리한 표입니다.
              같은 연봉이라 하더라도 부양가족 수, 비과세 수당 여부, 추가 공제 항목에 따라 실수령액이 달라질 수 있습니다.
              이 비교표는 부양가족 1명(본인), 비과세 월 20만원이라는 가장 일반적인 조건을 기준으로 산출되어 있어, 대다수 직장인이 자신의 연봉 구간을 빠르게 파악하는 데 유용합니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              이 비교표를 활용하는 방법
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              아래 구간 바로가기 버튼을 클릭하면 해당 연봉 범위로 즉시 이동합니다. 각 행을 클릭하면 해당 연봉의 상세 분석 페이지로 이동하여 대표 직종, 절세 전략, 생활비 시뮬레이션까지 확인할 수 있습니다.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
              <li><strong>연봉 협상 준비:</strong> 희망 연봉의 실수령액을 미리 확인하여 현실적인 생활비 계획을 세워보세요.</li>
              <li><strong>이직 비교:</strong> 현재 연봉과 이직 제안 연봉의 실수령 차이를 한눈에 파악할 수 있습니다.</li>
              <li><strong>연봉 인상 효과:</strong> 100만원 단위로 연봉이 오를 때 실수령액이 얼마나 증가하는지 직접 비교해보세요.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              2026년 주요 변화
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              2026년에는 여러 공제 요율이 변경되어 실수령액에 직접적인 영향을 미칩니다. 주요 변화를 요약하면 다음과 같습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">국민연금 요율 인상</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  연금개혁에 따라 근로자 부담률이 4.5%에서 4.75%로 인상되었습니다. 월 급여가 높을수록 부담 증가폭이 커집니다.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">건강보험료율 조정</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  건강보험 보수월액 요율이 7.19%로 소폭 변경되어 근로자 부담분이 3.595%가 되었습니다.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 text-sm mb-1">장기요양보험료율</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  장기요양보험료가 건강보험료의 13.14%로 책정되어, 건강보험료 변동에 연동하여 소폭 변경됩니다.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                <h3 className="font-semibold text-orange-800 dark:text-orange-300 text-sm mb-1">국민연금 상한액</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  국민연금 기준소득월액 상한이 637만원으로 상향되어, 고소득자의 연금 부담이 일부 증가합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 구간 바로가기 — 전체 보이게 flex-wrap */}
        <nav className="flex flex-wrap gap-2" aria-label="연봉 구간 바로가기">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {sec.label}
            </button>
          ))}
        </nav>

        {/* 모든 구간을 하나의 페이지에 표시 */}
        {SECTIONS.map((sec) => {
          const rows = generateRows(sec.min, sec.max);
          return (
            <div
              key={sec.id}
              ref={(el) => { sectionRefs.current[sec.id] = el; }}
              id={sec.id}
              className="scroll-mt-20"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 overflow-x-auto card-hover">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 sticky left-0">
                  연봉 {sec.label} 구간
                </h2>
                <table className="w-full text-sm tabular-nums" aria-label={`연봉 ${sec.label} 구간 실수령액 비교표`}>
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                      <th className="text-left py-2 pr-2 font-medium">연봉</th>
                      <th className="text-right py-2 px-2 font-medium">월급(세전)</th>
                      <th className="text-right py-2 px-2 font-medium hidden sm:table-cell">국민연금</th>
                      <th className="text-right py-2 px-2 font-medium hidden sm:table-cell">건강보험</th>
                      <th className="text-right py-2 px-2 font-medium">공제합계</th>
                      <th className="text-right py-2 px-2 font-medium">실수령액</th>
                      <th className="text-right py-2 px-2 font-medium">실효세율</th>
                      <th className="py-2 pl-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr
                        key={row.salary}
                        className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer"
                        onClick={() => window.location.href = `/salary/${row.salary}`}
                        role="link"
                        tabIndex={0}
                        aria-label={`연봉 ${formatNumber(row.salary)}만원 상세 보기`}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') window.location.href = `/salary/${row.salary}`; }}
                      >
                        <td className="py-2 pr-2 font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {formatNumber(row.salary)}만원
                        </td>
                        <td className="py-2 px-2 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {formatNumber(row.monthlySalary)}
                        </td>
                        <td className="py-2 px-2 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap hidden sm:table-cell">
                          {formatNumber(row.nationalPension)}
                        </td>
                        <td className="py-2 px-2 text-right text-gray-600 dark:text-gray-400 whitespace-nowrap hidden sm:table-cell">
                          {formatNumber(row.healthInsurance)}
                        </td>
                        <td className="py-2 px-2 text-right text-red-500 dark:text-red-400 whitespace-nowrap">
                          -{formatNumber(row.totalDeduction)}
                        </td>
                        <td className="py-2 px-2 text-right font-semibold text-blue-700 dark:text-blue-300 whitespace-nowrap">
                          {formatNumber(row.netSalary)}
                        </td>
                        <td className="py-2 px-2 text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {row.effectiveTaxRate}%
                        </td>
                        <td className="py-2 pl-2 whitespace-nowrap text-gray-400 dark:text-gray-500">
                          →
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* ========== 연봉 구간별 인사이트 ========== */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-8 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
            연봉 구간별 핵심 인사이트
          </h2>

          <div className="space-y-5">
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                신입사원 구간 (2,400~3,500만원)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                사회 초년생과 신입사원이 주로 속하는 구간입니다. 이 구간에서는 소득세율 6%의 최저 구간이 적용되므로 세금 부담이 비교적 낮습니다.
                총 공제율은 대략 10~12% 수준이며, 연봉 대비 실수령 비율이 가장 높은 편입니다.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                이 구간의 핵심 팁은 비과세 수당(식대, 교통비 등)을 최대한 활용하는 것입니다. 비과세 항목이 월 20만원만 되어도 연간 약 30~40만원의 세금을 절약할 수 있습니다.
                또한 근로장려금(EITC) 수급 요건에 해당될 수 있으니 연말정산 시 반드시 확인하세요.
              </p>
            </div>

            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                대리/과장 구간 (3,500~5,000만원)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                경력 3~8년차 직장인이 많이 분포하는 구간으로, 과세표준에 따라 소득세율이 6%에서 15%로 올라가는 전환점이 포함됩니다.
                연봉 4,000만원을 넘기면서 체감 세율 상승이 느껴지기 시작하며, 연봉 100만원 인상 시 실수령 증가분이 점차 줄어드는 것을 확인할 수 있습니다.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                이 구간부터는 연말정산 공제 전략이 중요해집니다. 신용카드 대신 체크카드나 현금영수증 사용 비율을 높이고,
                청약저축, 연금저축(최대 400만원 세액공제), IRP(최대 300만원 추가 세액공제) 등을 적극 활용하면 연간 50~100만원 이상의 환급을 기대할 수 있습니다.
              </p>
            </div>

            <div className="border-l-4 border-yellow-400 pl-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                차장/부장 구간 (5,000~7,000만원)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                중간 관리자급 직장인과 IT, 금융 등 고연봉 업종의 중견 경력자가 해당하는 구간입니다.
                과세표준 5,000만원 초과분에 대해 24% 세율이 적용되기 시작하므로, 실효세율이 눈에 띄게 상승합니다.
                연봉 5,000만원의 실효세율은 약 14~15%인 반면, 7,000만원에서는 약 17~18%까지 올라갑니다.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                이 구간에서는 절세 전략의 효과가 극대화됩니다. 주택청약종합저축, 보장성 보험, 교육비, 의료비 공제를 빠짐없이 챙기세요.
                특히 맞벌이 부부라면 부양가족 공제 배분을 최적화하여 세 부담을 크게 줄일 수 있습니다.
              </p>
            </div>

            <div className="border-l-4 border-red-400 pl-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                임원/고연봉 구간 (7,000만원 이상)
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                임원급, 전문직, IT 시니어 엔지니어 등이 해당하는 고연봉 구간입니다.
                연봉 8,800만원을 초과하면 35% 세율 구간에 진입하고, 1억5,000만원 초과부터는 38%가 적용됩니다.
                연봉 1억원 기준 실효세율은 약 20~22%에 달하며, 연봉의 약 5분의 1 이상이 세금과 보험료로 공제됩니다.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                고연봉 구간에서는 국민연금 상한(기준소득월액 637만원)이 적용되어 연금 부담은 일정 수준에서 멈추지만,
                건강보험과 소득세는 계속 증가합니다. 퇴직연금 DC형 추가납입, 기부금 공제, 벤처투자 소득공제 등 고소득자에게 유리한 절세 수단을 활용하는 것이 좋습니다.
                필요에 따라 세무사와의 상담을 통해 종합적인 세무 전략을 수립하는 것을 권장합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 상세 페이지 바로가기 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            연봉별 상세 분석 페이지
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            대표 직종, 절세 방법, 생활비 분석이 포함된 상세 페이지입니다.
          </p>
          <div className="flex flex-wrap gap-2">
            {REPRESENTATIVE_AMOUNTS.map((a) => (
              <Link
                key={a}
                href={`/salary/${a}`}
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                {formatNumber(a)}만원
              </Link>
            ))}
          </div>
        </div>

        {/* 배당 투자 크로스 프로모션 배너 */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            실수령액으로 배당 투자하면 20년 후에는?
          </p>
          <a
            href="https://mysnowball.kr/simulator?stock=SCHD&monthly=500000&years=20&drip=1&utm_source=salary-calc&utm_medium=cross-promo&utm_campaign=salary-hub"
            target="_blank"
            rel="noopener"
            className="inline-block mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            배당금 시뮬레이터 &rarr;
          </a>
        </div>

        {/* ========== 테이블 하단 교육 콘텐츠 ========== */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              실수령액에 영향을 미치는 요소
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              위 비교표는 가장 일반적인 조건(부양가족 1명, 비과세 월 20만원)을 기준으로 산출한 것입니다.
              실제 실수령액은 여러 변수에 따라 달라질 수 있으며, 주요 영향 요소는 다음과 같습니다.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold shrink-0">01</span>
                <span><strong className="text-gray-700 dark:text-gray-300">부양가족 수:</strong> 부양가족이 많을수록 기본공제가 늘어나 소득세가 줄어듭니다. 배우자, 20세 이하 자녀, 60세 이상 부모님까지 포함할 수 있습니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold shrink-0">02</span>
                <span><strong className="text-gray-700 dark:text-gray-300">비과세 수당:</strong> 식대(월 20만원), 자가운전보조금(월 20만원), 육아수당 등은 과세 대상에서 제외되어 실수령액을 높여줍니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold shrink-0">03</span>
                <span><strong className="text-gray-700 dark:text-gray-300">성과급/상여금:</strong> 성과급은 지급 시점에 합산 과세되므로 일시적으로 높은 세율이 적용될 수 있습니다. 단, 연말정산 시 정산됩니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold shrink-0">04</span>
                <span><strong className="text-gray-700 dark:text-gray-300">연말정산 공제:</strong> 신용카드, 의료비, 교육비, 기부금, 연금저축 등 다양한 공제 항목을 활용하면 납부한 세금의 일부를 환급받을 수 있습니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-500 font-bold shrink-0">05</span>
                <span><strong className="text-gray-700 dark:text-gray-300">회사 복리후생:</strong> 학자금 지원, 건강검진, 자기계발비 등 비과세 복리후생은 실수령액에 포함되지 않지만 실질적인 보상의 일부입니다.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">
              연봉 협상 시 확인할 점
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              연봉 협상은 단순히 숫자 하나를 올리는 것이 아니라, 총 보상 패키지(Total Compensation) 관점에서 접근해야 합니다.
              같은 연봉 5,000만원이라 하더라도 비과세 수당 구성, 성과급 비율, 복리후생에 따라 실질 수령액이 크게 달라질 수 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">기본급 vs 성과급 비율</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  기본급 비율이 높을수록 매월 안정적인 수입이 보장됩니다. 성과급 비율이 높다면 퇴직금 산정 기준이 낮아질 수 있으니 확인하세요.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">비과세 항목 구성</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  식대, 교통비 등 비과세 수당이 분리되어 있는지 확인하세요. 비과세 항목이 많을수록 동일 연봉 대비 실수령액이 높아집니다.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">퇴직금 포함 여부</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  제시된 연봉이 퇴직금 포함(퇴직금 별도 vs 포함)인지 반드시 확인하세요. 퇴직금 포함 시 실질 연봉은 약 8% 낮아집니다.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">복리후생 가치</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  건강검진, 학자금, 자기계발비, 자녀 보육비 등의 복리후생은 현금으로 환산하면 연간 수백만원의 가치가 될 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
            <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>안내:</strong> 이 비교표의 계산 결과는 2026년 공개된 4대보험 요율과 소득세법을 기반으로 산출된 참고용 정보이며,
              개인의 정확한 세액 산출을 위해서는 국세청 홈택스 또는 세무 전문가의 상담을 권장합니다.
              회사별 급여 체계, 각종 수당 및 공제 항목에 따라 실제 수령액은 다를 수 있습니다.
            </p>
          </div>
        </section>

        {/* 메인 계산기 CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            내 연봉으로 직접 계산하기
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
