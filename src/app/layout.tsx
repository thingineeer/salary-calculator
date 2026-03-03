import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: '2026 연봉 실수령액 계산기 - 4대보험 소득세 자동 계산',
  description:
    '2026년 최신 세율 기준 연봉 실수령액을 자동으로 계산합니다. 4대보험료, 소득세, 지방소득세 공제 후 월급 실수령액을 확인하세요.',
  keywords:
    '연봉계산기, 실수령액계산기, 월급계산기, 세후연봉, 4대보험계산, 소득세계산, 2026연봉계산기, 연봉실수령액',
  openGraph: {
    title: '2026 연봉 실수령액 계산기',
    description:
      '연봉을 입력하면 4대보험과 세금 공제 후 실수령액을 바로 확인! 2026년 최신 세율 기준.',
    type: 'website',
    locale: 'ko_KR',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  other: {
    'google-adsense-account': 'ca-pub-XXXXXXXXXXXXXXXX', // AdSense 승인 후 교체
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '2026 연봉 실수령액 계산기',
    description: '4대보험 및 소득세 공제 후 월 실수령액 자동 계산',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
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
        name: '4대보험이란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '4대보험은 국민연금, 건강보험, 장기요양보험, 고용보험을 말합니다. 근로자와 사업주가 각각 일정 비율을 부담하며, 2026년 기준 근로자 부담 합계는 약 8.99%입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '비과세 식대란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '비과세 식대는 근로자에게 지급되는 식사 관련 수당 중 월 20만원까지 소득세가 과세되지 않는 금액입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '연봉과 월급의 차이는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '연봉은 1년간 받는 총 급여이고, 월급은 연봉을 12로 나눈 금액입니다. 본 계산기는 연봉 ÷ 12 = 월 급여로 계산합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '실수령액은 어떻게 계산되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '실수령액 = 월 급여(세전) - 4대보험 - 소득세 - 지방소득세입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '연말정산으로 환급받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '매월 원천징수되는 소득세는 간이세액표에 의한 추정치입니다. 연말정산을 통해 공제 항목에 따라 환급받거나 추가 납부할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '국민연금에 상한액이 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 2026년 기준 국민연금 상한 소득월액은 약 590만원으로, 월 소득이 이를 초과하더라도 590만원 기준으로 보험료가 산정됩니다.',
        },
      },
    ],
  };

  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
