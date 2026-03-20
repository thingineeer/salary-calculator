import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2026 최저임금 시급 10,320원 - 월급 연봉 환산표',
  description:
    '2026년 최저임금 시급 10,320원. 월급 2,156,880원(209시간), 연봉 25,882,560원. 연도별 최저임금 추이와 달러 환산, 내 연봉 최저임금 배수 비교까지.',
  keywords:
    '2026최저임금, 최저시급, 최저임금월급, 최저임금연봉, 최저임금추이, 최저시급2026, 최저임금인상률',
  alternates: {
    canonical: 'https://www.salary-calc.kr/minimum-wage',
  },
  openGraph: {
    title: '2026 최저임금 시급 10,320원 | 월급·연봉 환산표',
    description:
      '2026년 최저임금 시급 10,320원. 월급·연봉 환산, 연도별 추이, 달러 환산까지 한눈에.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.salary-calc.kr/minimum-wage',
    siteName: 'www.salary-calc.kr',
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 최저임금 시급 10,320원 - 월급 연봉 환산표',
    description:
      '2026년 최저임금 시급 10,320원. 월급·연봉 환산, 연도별 추이 비교.',
  },
};

export default function MinimumWageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://www.salary-calc.kr/minimum-wage#app',
    name: '2026 최저임금 시급 10,320원 - 월급 연봉 환산표',
    description:
      '2026년 최저임금 시급 10,320원 기준 월급·연봉 환산, 연도별 추이, 달러 환산 정보.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://www.salary-calc.kr/minimum-wage',
    isPartOf: { '@id': 'https://www.salary-calc.kr/#website' },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '주휴수당이란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '주휴수당은 1주 소정근로일을 개근한 근로자에게 유급 휴일(주휴일)에 대해 지급하는 수당입니다. 주 15시간 이상 근무하면 주 1회 유급휴일이 발생하며, 주 40시간 근무 기준 8시간분의 임금이 추가됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '최저임금은 언제 바뀌나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '최저임금은 매년 1월 1일부터 12월 31일까지 적용됩니다. 최저임금위원회가 매년 6~7월경 다음 해 최저임금을 심의·의결하고, 고용노동부 장관이 8월 5일까지 고시합니다.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
