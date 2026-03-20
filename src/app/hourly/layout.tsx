import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시급 계산기 2026 - 연봉 시급 변환, 내 시급은 얼마?',
  description:
    '2026년 기준 연봉을 시급·일급으로 자동 변환! 시급에서 연봉 역산도 가능. 세전·세후 시급 비교, 최저시급(10,030원) 대비 몇 배인지 확인하세요.',
  keywords:
    '시급계산기, 연봉시급환산, 내시급, 일급계산, 시급연봉변환, 시급계산, 연봉시급, 일급계산기, 최저시급, 2026최저시급',
  alternates: {
    canonical: 'https://www.salary-calc.kr/hourly',
  },
  openGraph: {
    title: '시급 계산기 2026 | 연봉 → 시급·일급 변환, 최저시급 비교',
    description:
      '연봉을 시급·일급으로 변환하고, 시급에서 연봉을 역산할 수 있습니다. 2026년 최저시급 대비 비교까지.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.salary-calc.kr/hourly',
    siteName: 'www.salary-calc.kr',
  },
  twitter: {
    card: 'summary_large_image',
    title: '시급 계산기 2026 - 연봉 시급 변환, 내 시급은 얼마?',
    description: '연봉·시급 양방향 변환. 세전·세후 시급, 최저시급 대비 비교까지.',
  },
};

export default function HourlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': 'https://www.salary-calc.kr/hourly#app',
    name: '시급 계산기 2026 - 연봉 시급 변환',
    description:
      '연봉을 시급·일급으로 변환하고, 시급에서 연봉을 역산합니다. 2026년 최저시급 대비 비교.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://www.salary-calc.kr/hourly',
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
        name: '시급은 어떻게 계산하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '세전 시급은 연봉 / 12 / 209(월 소정근로시간)로 계산합니다. 209시간은 주 40시간 근무 + 주휴 8시간(48시간) x 4.345주 기준입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '2026년 최저시급은 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2026년 최저시급은 10,030원입니다. 월 소정근로시간 209시간 기준 월 최저임금은 약 2,096,270원이며, 연봉으로 환산하면 약 25,155,240원입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '세후 시급은 어떻게 다른가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '세후 시급은 4대보험과 소득세를 공제한 월 실수령액을 209시간으로 나눈 값입니다. 연봉이 높을수록 세전·세후 시급 차이가 커집니다.',
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
