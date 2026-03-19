import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026 연봉 실수령액 비교표 - 연봉 2400만~1억5000만원 세후 월급',
  description:
    '2026년 기준 연봉 2,400만원부터 1억5,000만원까지 100만원 단위 실수령액 비교표. 4대보험·소득세 공제 후 세전 세후 월급을 한눈에 비교하세요. 실효세율, 공제율 포함.',
  keywords:
    '연봉 비교표, 실수령액 비교, 세후 월급 비교, 연봉별 월급, 2026 연봉표, 4대보험 공제표',
  alternates: { canonical: '/salary' },
  openGraph: {
    title: '2026 연봉별 실수령액 비교표 | 세전 세후 월급 한눈에 비교',
    description:
      '연봉 2,400만~1억5,000만원 구간별 세후 월급을 한눈에 비교! 100만원 단위 실수령액 비교표.',
    type: 'article',
    locale: 'ko_KR',
    url: '/salary',
    siteName: '2026 연봉 실수령액 계산기',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 연봉 실수령액 비교표 - 연봉별 세후 월급 한눈에',
    description:
      '2026년 기준 연봉 2,400만원부터 1억5,000만원까지 100만원 단위 실수령액 비교표. 4대보험·소득세 공제 후 세전 세후 월급을 한눈에 비교하세요. 실효세율, 공제율 포함.',
  },
};

export default function SalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
