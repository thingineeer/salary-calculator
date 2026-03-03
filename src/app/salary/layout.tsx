import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026 연봉별 실수령액 비교표 - 2,400만원~1억5,000만원 구간별 세후 월급',
  description:
    '2026년 기준 연봉 2,400만원부터 1억5,000만원까지 100만원 단위 실수령액 비교표. 4대보험, 소득세 공제 후 월급 실수령액을 한눈에 비교하세요.',
  alternates: { canonical: '/salary' },
  openGraph: {
    title: '2026 연봉별 실수령액 비교표 | 연봉 2,400만~1억5,000만원',
    description:
      '연봉 구간별 실수령액을 한눈에 비교! 100만원 단위로 세후 월급을 확인하세요.',
    type: 'article',
    locale: 'ko_KR',
    url: '/salary',
  },
};

export default function SalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
