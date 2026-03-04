# 2026 연봉 실수령액 계산기

한국 직장인을 위한 연봉 실수령액 계산기. 4대보험·소득세 공제 후 실제 수령액을 계산하고, 달러 환산·연봉 비교표까지 제공합니다.

## 배포 URL

| 환경 | URL | 브랜치 |
|------|-----|--------|
| **Production** | [www.salary-calc.kr](https://www.salary-calc.kr) | `main` |
| **Preview (Dev)** | [salary-calculator-sepia.vercel.app](https://salary-calculator-sepia.vercel.app) | `develop` |

> `main`에 머지하면 Vercel이 자동으로 프로덕션 배포합니다.
> `develop`에 푸시하면 Preview 환경에 자동 배포됩니다.

## 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | 5.x |
| UI | React | 19.2.3 |
| Styling | Tailwind CSS | 4.x |
| Chart | Recharts | 3.7.0 |
| Font | Pretendard Variable | CDN |
| Hosting | Vercel | - |
| Analytics | Google Analytics 4 | G-B7WKMPWCD3 |
| Ads | Google AdSense | ca-pub-5283496525222246 |
| Domain | salary-calc.kr | Vercel DNS |

## 주요 기능

### 연봉 실수령액 계산기 (`/`)
- 연봉 입력 → 4대보험 + 소득세 + 지방소득세 공제 후 월 실수령액 계산
- 부양가족·20세 이하 자녀·비과세 수당 반영
- 공제 내역 도넛 차트 (Recharts)
- 이직 시뮬레이터: 현재 vs 이직 후 실수령액 비교
- 연봉 백분위 표시

### 연봉별 비교표 (`/salary`)
- 2,400만~1억원 구간별 탭 UI
- 10개 연봉 상세 페이지 (`/salary/[amount]`) — SSG

### 달러 환산 계산기 (`/dollar`)
- 세후 실수령액 기준 USD 환산
- 현재/과거 환율 비교 (1년전·3년전·5년전 프리셋)
- 8개 통화 변환표 (USD, EUR, JPY, GBP, CNY, HKD, SGD, AUD)
- 환율 추이 차트 (최근 12개월)
- FAQ 아코디언

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx              # 공통 레이아웃 + JSON-LD
│   ├── page.tsx                # 메인 계산기
│   ├── dollar/                 # 달러 환산 계산기
│   │   ├── page.tsx
│   │   └── layout.tsx          # SEO 메타데이터 + JSON-LD
│   ├── salary/                 # 연봉 비교표
│   │   ├── page.tsx            # 비교표 허브 (탭 UI)
│   │   ├── layout.tsx
│   │   └── [amount]/page.tsx   # 개별 연봉 상세 (SSG)
│   ├── about/                  # 소개
│   ├── privacy/                # 개인정보처리방침
│   ├── terms/                  # 이용약관
│   ├── sitemap.ts              # 동적 사이트맵
│   └── robots.ts
├── components/
│   ├── SalaryForm.tsx          # 연봉 입력 폼
│   ├── SalaryResult.tsx        # 결과 카드
│   ├── DeductionChart.tsx      # 공제 도넛 차트
│   ├── SalaryTable.tsx         # 비교 테이블
│   ├── JobChangeSimulator.tsx  # 이직 시뮬레이터
│   ├── SalaryPercentile.tsx    # 백분위
│   ├── ExchangeRateForm.tsx    # 환율 입력 폼
│   ├── DollarResult.tsx        # 달러 환산 결과
│   ├── ExchangeRateChart.tsx   # 환율 추이 차트
│   ├── MultiCurrencyTable.tsx  # 다중 통화 표
│   ├── DollarFAQ.tsx           # 달러 FAQ
│   ├── Header.tsx              # 헤더 + 다크모드
│   ├── Footer.tsx              # 푸터
│   ├── FAQ.tsx                 # 메인 FAQ
│   └── AdBanner.tsx            # AdSense 배너
├── lib/
│   ├── salary-calculator.ts    # 핵심 계산 엔진
│   ├── constants.ts            # 4대보험 요율, 세율 구간 (2026)
│   ├── exchange-rates.ts       # 환율 데이터 (2015~2026)
│   ├── exchange-calculator.ts  # 환율 계산 엔진
│   ├── exchange-constants.ts   # 통화 상수
│   ├── salary-seo-data.ts      # SEO 페이지 데이터
│   ├── analytics.ts            # GA4 이벤트 트래킹
│   ├── format.ts               # 숫자 포맷팅
│   └── percentile.ts           # 연봉 백분위
└── hooks/
    ├── useDebounce.ts
    └── useIntersectionObserver.ts
```

## 배포 전략

```
main (production)  ←── PR 머지 ──  develop (preview)
       │                              │
       ▼                              ▼
  salary-calc.kr              salary-calculator-sepia.vercel.app
```

1. **develop** 브랜치에서 기능 개발
2. worktree 브랜치(`worktree/기능명`)로 병렬 작업 → `develop`에 `--no-ff` 머지
3. **develop → main** PR 생성 → 리뷰 후 머지
4. main 머지 시 Vercel이 자동으로 프로덕션 배포

### Git 브랜치 전략

- `main` — 프로덕션 (branch protection)
- `develop` — 개발/테스트
- `worktree/*` — 기능별 병렬 작업 (작업 후 삭제)

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 린트
npm run lint
```

## SEO

- **SSG**: 연봉 상세 페이지 10개 정적 생성
- **JSON-LD**: WebApplication + FAQPage 구조화 데이터
- **사이트맵**: `/sitemap.xml` 동적 생성
- **메타데이터**: 페이지별 title, description, Open Graph, canonical URL
- **Naver 웹마스터**: 인증 완료

## 2026년 기준 데이터

- 건강보험: 7.19% (근로자 3.595%)
- 장기요양보험: 13.14%
- 국민연금: 9% (근로자 4.5%, 상한 637만원)
- 고용보험: 1.8% (근로자 0.9%)
- 소득세: 6단계 누진세율 (1,400만~5억 초과)
