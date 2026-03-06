import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연봉 달러 환산 계산기 - 내 월급 달러로 얼마? 2026 USD 환율 변환',
  description:
    '내 연봉을 달러로 환산하면 얼마? 2026년 세후 실수령액 기준 USD, EUR, JPY, CNY 등 다중 통화 변환. 과거 환율 비교와 해외 연봉 비교까지.',
  keywords:
    '연봉 달러 환산, 월급 달러 계산, 연봉 USD 변환, 환율 연봉 계산기, 해외 연봉 비교, 달러 월급, 연봉 환산 계산기, 월급 환율, 세후 달러',
  alternates: {
    canonical: 'https://salary-calc.kr/dollar',
  },
  openGraph: {
    title: '연봉 달러 환산 계산기 | 세후 월급 USD·EUR·JPY 변환',
    description:
      '내 연봉을 달러로 환산하면 얼마? 세후 실수령액 기준으로 USD, EUR, JPY 등 다중 통화 변환.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://salary-calc.kr/dollar',
    siteName: 'salary-calc.kr',
  },
};

export default function DollarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '연봉 달러 환산 계산기',
    description: '실수령액 기준 달러 환산 및 다중 통화 변환',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://salary-calc.kr/dollar',
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
        name: '달러 연봉은 어떻게 계산하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '달러 연봉은 한국의 실수령액을 현재 환율(USD/KRW)로 나누어 계산합니다. 예를 들어 월 실수령액이 500만원이고 환율이 1,300원/달러라면, 약 3,846달러가 됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '환율이 높으면 달러 연봉이 줄어드나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 맞습니다. 환율이 높아질수록(원화 약세) 같은 원화 금액을 달러로 환산했을 때 달러 가치는 작아집니다. 반대로 환율이 낮아지면(원화 강세) 달러 가치는 커집니다.',
        },
      },
      {
        '@type': 'Question',
        name: '해외 이직 시 연봉 비교는 어떻게 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '해외 이직 시에는 환율뿐만 아니라 생활비, 세금, 복리후생 등을 종합적으로 고려해야 합니다. 같은 달러 금액이라도 국가별 물가 차이가 크므로 구매력평가(PPP)를 참고하는 것이 좋습니다.',
        },
      },
      {
        '@type': 'Question',
        name: 'PPP(구매력평가)란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'PPP(Purchasing Power Parity)는 국가별 물가 차이를 반영한 환율입니다. 같은 금액이라도 국가마다 구매할 수 있는 실질적인 물품의 양이 다르기 때문에, PPP를 적용하면 실질적인 생활 수준을 더 정확히 비교할 수 있습니다.',
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
