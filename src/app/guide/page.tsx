import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '급여·세금 가이드',
  description:
    '직장인을 위한 급여, 4대보험, 소득세, 절세 전략, 연봉 협상, 퇴직금까지. 2026년 최신 기준으로 정리한 실용 가이드 모음입니다.',
  alternates: { canonical: '/guide' },
  openGraph: {
    title: '급여·세금 가이드',
    description:
      '직장인을 위한 급여, 4대보험, 소득세, 절세 전략, 연봉 협상, 퇴직금까지. 2026년 최신 기준으로 정리한 실용 가이드 모음입니다.',
    type: 'website',
    locale: 'ko_KR',
    url: '/guide',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

const guides = [
  {
    href: '/guide/income-tax',
    title: '2026년 근로소득세 완벽 가이드',
    description:
      '과세표준 구간부터 근로소득공제, 세액공제까지. 내 월급에서 소득세가 얼마나 빠지는지 원리를 이해하세요.',
    tag: '소득세',
    color: 'blue',
  },
  {
    href: '/guide/social-insurance',
    title: '4대보험 완벽 가이드 — 국민연금·건강보험·고용보험',
    description:
      '4대보험 각 항목의 요율, 계산 방식, 상한액, 그리고 내가 실제로 부담하는 금액까지 꼼꼼히 정리했습니다.',
    tag: '4대보험',
    color: 'green',
  },
  {
    href: '/guide/tax-saving',
    title: '직장인 절세 전략 10가지 — 연말정산 환급 극대화',
    description:
      '연금저축, IRP, 신용카드 공제, 의료비·교육비 공제 등 합법적으로 세금을 줄이는 실전 절세 방법을 알아봅니다.',
    tag: '절세',
    color: 'amber',
  },
  {
    href: '/guide/salary-negotiation',
    title: '연봉 협상 실전 가이드 — 이직·연봉인상 준비',
    description:
      '시장 연봉 조사부터 협상 멘트, 실수령액 기준 비교까지. 연봉 협상에서 손해 보지 않는 방법을 알려드립니다.',
    tag: '연봉 협상',
    color: 'purple',
  },
  {
    href: '/guide/retirement',
    title: '퇴직금과 퇴직연금 가이드 — DC·DB·IRP 비교',
    description:
      '퇴직금 계산법, DB형과 DC형의 차이, IRP 세액공제 혜택까지. 퇴직 후 자산을 지키는 방법을 정리합니다.',
    tag: '퇴직금',
    color: 'red',
  },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
  green: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
  amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300',
  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  red: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
};

export default function GuidePage() {
  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
          급여·세금 가이드
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          연봉 계산기만으로는 알 수 없는 세금과 보험의 원리를 이해해 보세요. 2026년
          최신 세법과 보험 요율을 기준으로, 직장인이 꼭 알아야 할 급여·세금 정보를
          쉽게 풀어 정리했습니다. 이 가이드를 통해 내 월급 명세서를 정확히 읽고,
          합법적으로 세금을 줄이는 방법까지 익힐 수 있습니다.
        </p>
      </header>

      <div className="grid gap-4">
        {guides.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover hover:shadow-xl transition-shadow"
          >
            <span
              className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${colorMap[g.color]}`}
            >
              {g.tag}
            </span>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
              {g.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {g.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center shadow-lg">
        <p className="text-white/90 text-sm mb-2">
          가이드를 읽은 후 직접 계산해 보세요
        </p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md"
        >
          내 연봉 실수령액 계산하기
        </Link>
      </div>
    </article>
  );
}
