import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '2026 연봉 실수령액 계산기 - 세후 월급 4대보험 소득세 자동 계산',
    template: '%s | 2026 연봉 실수령액 계산기',
  },
  description:
    '2026년 최신 세율 기준 연봉 실수령액 계산기. 연봉 입력만으로 4대보험, 소득세 공제 후 세후 월급을 자동 계산합니다. 세전 세후 비교, 연봉별 실수령액 비교표, 이직 시뮬레이터까지.',
  keywords:
    '연봉계산기, 실수령액계산기, 월급계산기, 세후월급, 세전세후, 4대보험계산, 소득세계산, 2026연봉계산기, 연봉실수령액, 월급실수령액, 연봉세후, 급여계산기',
  metadataBase: new URL('https://www.salary-calc.kr'),
  openGraph: {
    title: '연봉 계산기 | 2026년 세후 월급 실수령액 자동 계산',
    description:
      '연봉을 입력하면 4대보험·소득세 공제 후 세후 월급을 바로 확인! 2026년 최신 세율 기준 연봉 실수령액 계산기.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.salary-calc.kr',
    siteName: '2026 연봉 실수령액 계산기',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        type: 'image/svg+xml',
        alt: '2026 연봉 실수령액 계산기 - salary-calc.kr',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 연봉 실수령액 계산기 - 세후 월급 자동 계산',
    description: '연봉 입력만으로 4대보험·소득세 공제 후 월급 실수령액을 확인하세요.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: 'https://www.salary-calc.kr',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large' as const,
    'max-video-preview': -1,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    other: {
      'naver-site-verification': 'e8eed75e358a289a73fa5d6e55394e4701f31f32',
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-5283496525222246',
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
    name: '2026 연봉 실수령액 계산기 - 세후 월급 자동 계산',
    description: '2026년 최신 세율 기준, 연봉 입력만으로 4대보험·소득세 공제 후 세후 월급 실수령액을 자동 계산합니다.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://www.salary-calc.kr',
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
          text: '4대보험은 국민연금, 건강보험, 장기요양보험, 고용보험을 말합니다. 근로자와 사업주가 각각 일정 비율을 부담하며, 2026년 기준 근로자 부담 합계는 약 9.72%입니다. 국민연금은 노후 소득 보장, 건강보험은 의료비 지원, 장기요양보험은 고령·장애인 돌봄 서비스, 고용보험은 실업 시 급여 지급을 위한 제도입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '비과세 식대란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '비과세 식대는 근로자에게 지급되는 식사 관련 수당 중 월 20만원까지 소득세가 과세되지 않는 금액입니다. 비과세 식대를 적용하면 과세 대상 소득이 줄어들어 4대보험료와 소득세가 모두 감소합니다. 연봉 5,000만원 기준 월 20만원 비과세 식대 적용 시 연간 약 23만원 이상의 세금 및 보험료를 절감할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '연봉과 월급의 차이는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '연봉은 1년간 받는 총 급여이고, 월급은 연봉을 12로 나눈 금액입니다. 본 계산기는 연봉 ÷ 12 = 월 급여로 계산합니다. 채용 공고에서 "연봉 5,000만원"이라 함은 세전 기준이며, 실제 매월 통장에 입금되는 실수령액은 4대보험과 세금 공제 후 약 370만원 수준입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '실수령액은 어떻게 계산되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '실수령액 = 월 급여(세전) - 4대보험(국민연금 + 건강보험 + 장기요양보험 + 고용보험) - 소득세 - 지방소득세입니다. 2026년 기준 국민연금 4.75%, 건강보험 3.595%, 장기요양보험(건강보험의 13.14%), 고용보험 0.9%가 적용됩니다. 소득세는 과세표준에 6~45% 누진세율을 적용하고, 지방소득세는 소득세의 10%입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '연말정산으로 환급받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '매월 원천징수되는 소득세는 간이세액표에 의한 추정치입니다. 연말정산을 통해 공제 항목(의료비, 교육비, 기부금, 신용카드 등)에 따라 환급받거나 추가 납부할 수 있습니다. 연금저축과 IRP는 합산 900만원까지 세액공제(13.2~16.5%)가 가능하므로, 절세를 원한다면 적극 활용하시기 바랍니다.',
        },
      },
      {
        '@type': 'Question',
        name: '국민연금에 상한액이 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 2026년 기준 국민연금 상한 소득월액은 637만원으로, 월 소득이 이를 초과하더라도 637만원 기준으로 보험료가 산정됩니다. 따라서 국민연금 최대 부담액은 월 약 302,575원(637만원 × 4.75%)입니다. 이 상한액은 매년 7월 전체 가입자 평균 소득 변동률에 따라 조정됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '연봉 협상할 때 실수령액을 어떻게 활용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '연봉 협상 시에는 세전 연봉뿐 아니라 실수령액 기준으로 비교하는 것이 중요합니다. 연봉 4,500만원에서 5,000만원으로 500만원 인상되더라도 실수령액 증가분은 약 33만원(연간)에 불과할 수 있습니다. 총 보상 패키지 관점에서 비과세 항목, 복리후생, 성과급, 스톡옵션 등을 종합적으로 고려해야 합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '보너스(상여금)도 세금이 동일하게 적용되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '보너스(상여금)는 근로소득에 포함되어 동일한 세율이 적용됩니다. 다만 상여금은 지급 시점에 해당 월 소득에 합산되어 원천징수되므로 평소보다 높은 세율 구간이 적용될 수 있습니다. 4대보험도 상여금에 부과되며, 최종적으로 연말정산에서 연간 총소득 기준으로 정산됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '부양가족 공제의 실제 효과는 얼마나 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '부양가족 공제는 기본공제 대상자 1인당 연 150만원이 공제됩니다. 1인 가구와 4인 가구를 비교하면, 4인 가구는 추가로 450만원(150만원 × 3명)의 인적공제를 받아 연간 소득세가 약 30~70만원 줄어듭니다. 부양가족의 연간 소득이 100만원(근로소득만 있는 경우 총급여 500만원) 이하여야 공제를 받을 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '비과세 항목은 실수령액에 어떤 영향을 주나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '비과세 항목은 소득세와 4대보험 산정 기준에서 제외되어 실수령액을 높이는 효과가 있습니다. 대표적인 비과세 항목으로는 식대(월 20만원), 자가운전보조금(월 20만원), 연구활동비(월 20만원), 출산·보육수당(월 20만원) 등이 있습니다. 연봉 5,000만원에서 비과세 식대 월 20만원 적용 시 연간 약 23~30만원의 실수령액 증가 효과가 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '연말정산에서 주요 공제 항목은 무엇이 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '주요 공제 항목은 소득공제와 세액공제로 나뉩니다. 소득공제에는 인적공제(1인당 150만원), 신용카드 사용 공제(총급여 25% 초과분의 15~40%), 주택청약종합저축 등이 있습니다. 세액공제에는 의료비(총급여 3% 초과분의 15%), 교육비, 기부금(15~30%), 연금저축·IRP(합산 900만원, 13.2~16.5%), 월세(750만원 한도, 17%) 등이 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '프리랜서와 직장인의 세금 차이는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '직장인은 근로소득세가 적용되어 매월 원천징수되고 연말정산으로 정산됩니다. 프리랜서는 종합소득세 신고(매년 5월)를 통해 세금을 납부합니다. 직장인은 4대보험을 사업주와 반반 부담하지만, 프리랜서는 국민연금과 건강보험을 전액 본인이 부담합니다. 다만 프리랜서는 사업 관련 경비를 필요경비로 인정받아 과세표준을 낮출 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '퇴직금은 연봉에 포함되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '퇴직금의 연봉 포함 여부는 회사마다 다릅니다. "퇴직금 별도"인 경우 연봉 외에 별도로 퇴직금이 적립됩니다. "퇴직금 포함"이면 연봉에서 퇴직금(약 8.33%, 연봉 ÷ 13)을 차감한 금액이 월급 기준입니다. 예를 들어 연봉 5,000만원 퇴직금 포함이면 월 급여는 약 385만원이고, 퇴직금 별도라면 약 417만원으로 월 실수령액이 약 25~30만원 달라집니다.',
        },
      },
      {
        '@type': 'Question',
        name: '중도 입사 또는 퇴사 시 세금 계산은 어떻게 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '중도 입사·퇴사 시에는 실제 근무 기간에 대해서만 급여와 세금이 계산됩니다. 해당 월 급여는 근무일수에 비례하여 일할 계산됩니다. 국민연금과 건강보험은 입사일이 속한 달부터 퇴사일이 속한 달까지 부과됩니다. 중도 퇴사 시에는 퇴사 시점에 중간정산을 진행하며, 원천징수영수증을 발급받아 새 직장 연말정산 시 합산해야 합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '2026년 세법에서 달라진 점은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2026년 주요 변경사항: 국민연금 요율이 9%에서 9.5%로 인상(근로자 4.5%→4.75%), 건강보험 요율 7.19%(근로자 3.595%)로 조정, 장기요양보험 요율 건강보험료의 13.14%로 변경, 국민연금 상한 소득월액 637만원으로 상향. 이로 인해 동일 연봉 기준 2025년 대비 실수령액이 소폭 감소하였습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '건강보험 피부양자 등록 시 보험료가 달라지나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '건강보험 피부양자로 등록하면 해당 가족은 별도의 건강보험료를 납부하지 않아도 됩니다. 직장가입자의 보험료는 본인의 급여 기준으로만 산정되므로 피부양자가 늘어도 본인 보험료는 변하지 않습니다. 다만 연간 소득이 2,000만원을 초과하거나 재산세 과세표준이 5억4천만원을 초과하면 피부양자 자격이 박탈되어 지역가입자로 전환됩니다.',
        },
      },
    ],
  };

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-B7WKMPWCD3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B7WKMPWCD3');
            `,
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5283496525222246"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
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
