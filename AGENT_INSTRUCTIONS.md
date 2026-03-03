# 연봉 실수령 계산기 - 에이전트 빌드 지시서

## 프로젝트 개요

**프로젝트명:** salary-calculator (연봉 실수령 계산기)
**목표:** 연봉을 입력하면 4대보험 + 소득세 공제 후 월 실수령액을 자동 계산하는 웹사이트를 만들고 Vercel에 배포
**수익 모델:** Google AdSense 광고 (금융 니치 RPM $30~$50)
**기술 스택:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
**배포:** Vercel (CLI로 배포)
**도메인:** Vercel 기본 도메인 사용 (추후 커스텀 도메인 연결)

---

## Phase 1: 프로젝트 초기 설정

### 1.1 프로젝트 생성

```bash
npx create-next-app@latest salary-calculator \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
cd salary-calculator
```

### 1.2 추가 패키지 설치

```bash
npm install recharts
npm install @vercel/analytics
npm install next-sitemap
npm install -D @types/node
```

---

## Phase 2: 핵심 계산 로직 구현

### 2.1 파일: `src/lib/salary-calculator.ts`

2026년 기준 4대보험 요율과 소득세 계산 로직을 구현해야 한다.

#### 4대보험 요율 (2026년 기준, 근로자 부담분)

| 항목 | 요율 | 비고 |
|------|------|------|
| 국민연금 | 4.5% | 월 상한액 약 590만원 (상한 소득월액 기준) |
| 건강보험 | 3.545% | 보수월액 기준 |
| 장기요양보험 | 건강보험료의 12.95% | 건강보험료에 연동 |
| 고용보험 | 0.9% | 근로자 부담분 |

#### 근로소득세 계산 (간이세액표 기반)

소득세는 국세청 간이세액표를 기반으로 계산한다. 간소화를 위해 아래 근사 로직을 사용:

1. 연봉에서 비과세(식대 월 20만원 = 연 240만원)를 제외한 과세 대상 소득 산출
2. 근로소득공제 적용
3. 기본공제(본인 150만원) + 부양가족 수에 따른 추가 공제
4. 산출세액 계산 (과세표준 구간별 세율 적용)
5. 근로소득세액공제 적용
6. 지방소득세 = 소득세의 10%

#### 2026년 소득세 과세표준 구간

| 과세표준 | 세율 | 누진공제 |
|----------|------|----------|
| 1,400만원 이하 | 6% | 0 |
| 1,400만~5,000만원 | 15% | 126만원 |
| 5,000만~8,800만원 | 24% | 576만원 |
| 8,800만~1.5억원 | 35% | 1,544만원 |
| 1.5억~3억원 | 38% | 1,994만원 |
| 3억~5억원 | 40% | 2,594만원 |
| 5억~10억원 | 42% | 3,594만원 |
| 10억원 초과 | 45% | 6,594만원 |

#### 근로소득공제

| 총급여액 | 공제액 |
|----------|--------|
| 500만원 이하 | 총급여의 70% |
| 500만~1,500만원 | 350만 + 500만 초과분의 40% |
| 1,500만~4,500만원 | 750만 + 1,500만 초과분의 15% |
| 4,500만~1억원 | 1,200만 + 4,500만 초과분의 5% |
| 1억원 초과 | 1,475만 + 1억 초과분의 2% |

#### 근로소득세액공제

| 산출세액 | 공제액 |
|----------|--------|
| 130만원 이하 | 산출세액의 55% |
| 130만원 초과 | 71.5만 + 130만 초과분의 30% |

※ 한도: 총급여 3,300만원 이하 → 74만원, 3,300만~7,000만원 → 74만-(총급여-3,300만)×0.008 (66만원 한도), 7,000만원 초과 → 66만-(총급여-7,000만)×0.5 (50만원 한도)

### 2.2 계산 함수 인터페이스

```typescript
interface SalaryInput {
  annualSalary: number;        // 연봉 (원)
  dependents: number;          // 부양가족 수 (본인 포함, 기본 1)
  childrenUnder20: number;     // 20세 이하 자녀 수
  nonTaxableAllowance: number; // 비과세 월액 (기본 200,000원 = 식대)
}

interface SalaryResult {
  monthlySalary: number;           // 월 급여 (세전)
  nationalPension: number;         // 국민연금
  healthInsurance: number;         // 건강보험
  longTermCare: number;            // 장기요양보험
  employmentInsurance: number;     // 고용보험
  incomeTax: number;               // 소득세
  localIncomeTax: number;          // 지방소득세
  totalDeduction: number;          // 공제 합계
  netSalary: number;               // 실수령액
  effectiveTaxRate: number;        // 실효세율 (%)
}

function calculateSalary(input: SalaryInput): SalaryResult
```

---

## Phase 3: UI/UX 구현

### 3.1 페이지 구조

```
src/
├── app/
│   ├── layout.tsx          # 공통 레이아웃 (헤더, 푸터, 메타태그)
│   ├── page.tsx            # 메인 계산기 페이지
│   ├── globals.css         # 글로벌 스타일
│   ├── sitemap.ts          # 동적 사이트맵
│   └── robots.ts           # robots.txt
├── components/
│   ├── SalaryForm.tsx      # 입력 폼 (연봉, 부양가족, 비과세)
│   ├── SalaryResult.tsx    # 결과 표시 (실수령액, 공제 내역)
│   ├── DeductionChart.tsx  # 공제 항목 파이차트 (Recharts)
│   ├── SalaryTable.tsx     # 연봉 구간별 비교 테이블
│   ├── AdBanner.tsx        # 광고 배너 플레이스홀더
│   ├── Header.tsx          # 헤더
│   ├── Footer.tsx          # 푸터
│   └── FAQ.tsx             # 자주 묻는 질문 (SEO용)
└── lib/
    ├── salary-calculator.ts # 계산 로직
    └── constants.ts         # 세율, 보험요율 상수
```

### 3.2 메인 페이지 레이아웃

```
┌─────────────────────────────────────────┐
│  🧮 2026 연봉 실수령액 계산기           │
│  (Header with logo + nav)               │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────┐  ┌────────────┐  │
│  │ [입력 폼]         │  │ [Ad 300x250]│ │
│  │                   │  │             │ │
│  │ 연봉: [________]  │  └────────────┘ │
│  │ 부양가족: [1 ▼]   │                 │
│  │ 비과세: [200,000]  │                 │
│  │                   │                 │
│  │ [계산하기 버튼]    │                 │
│  └──────────────────┘                  │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 💰 월 실수령액: 3,245,670원         ││
│  │                                     ││
│  │ ┌───────────┐ ┌──────────────────┐ ││
│  │ │ 파이차트   │ │ 공제 항목 상세   │ ││
│  │ │ (Recharts) │ │ 국민연금: xxx원  │ ││
│  │ │           │ │ 건강보험: xxx원  │ ││
│  │ │           │ │ 소득세:  xxx원   │ ││
│  │ └───────────┘ └──────────────────┘ ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ [Ad Banner 728x90]                  ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ 📊 연봉별 실수령액 비교표           ││
│  │ 3000만~1억 구간 테이블              ││
│  └─────────────────────────────────────┘│
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ ❓ 자주 묻는 질문 (FAQ)              ││
│  │ - 4대보험이란?                       ││
│  │ - 비과세 식대란?                     ││
│  │ - 연말정산 환급은?                   ││
│  └─────────────────────────────────────┘│
│                                         │
│  (Footer)                               │
└─────────────────────────────────────────┘
```

### 3.3 디자인 가이드

- **컬러 팔레트:** 파란색 계열 (#1E40AF 메인, #3B82F6 액센트, #EFF6FF 배경)
- **폰트:** Pretendard (한국어), system-ui fallback
- **반응형:** 모바일 퍼스트 (Tailwind breakpoints)
- **입력 UX:**
  - 연봉 입력 시 실시간으로 천단위 콤마 표시
  - 슬라이더 + 직접 입력 동시 지원 (2,000만 ~ 3억 범위)
  - 입력과 동시에 결과가 실시간 업데이트 (debounce 불필요, 계산이 가벼움)
- **결과 표시:**
  - 실수령액을 크고 눈에 띄게 표시
  - 공제 항목별 금액 + 비율 표시
  - Recharts 도넛 차트로 시각화
- **다크모드:** Tailwind dark: 클래스 활용

### 3.4 SEO 최적화 (매우 중요)

#### 메타태그 (layout.tsx)

```typescript
export const metadata: Metadata = {
  title: '2026 연봉 실수령액 계산기 - 4대보험 소득세 자동 계산',
  description: '2026년 최신 세율 기준 연봉 실수령액을 자동으로 계산합니다. 4대보험료, 소득세, 지방소득세 공제 후 월급 실수령액을 확인하세요.',
  keywords: '연봉계산기, 실수령액계산기, 월급계산기, 세후연봉, 4대보험계산, 소득세계산, 2026연봉계산기',
  openGraph: {
    title: '2026 연봉 실수령액 계산기',
    description: '연봉을 입력하면 4대보험과 세금 공제 후 실수령액을 바로 확인!',
    type: 'website',
  },
};
```

#### 구조화 데이터 (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "2026 연봉 실수령액 계산기",
  "description": "4대보험 및 소득세 공제 후 월 실수령액 자동 계산",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" }
}
```

#### FAQ 구조화 데이터도 추가 (FAQPage schema)

#### sitemap.ts

```typescript
export default function sitemap() {
  return [
    { url: 'https://사이트URL/', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ];
}
```

#### robots.ts

```typescript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://사이트URL/sitemap.xml',
  };
}
```

### 3.5 연봉별 비교 테이블 (SalaryTable.tsx)

SEO 및 사용자 편의를 위해 주요 연봉 구간별 비교표를 자동 생성하여 페이지 하단에 표시:

| 연봉 | 월 급여 | 공제 합계 | 실수령액 | 실효세율 |
|------|---------|-----------|----------|----------|
| 3,000만원 | 2,500,000 | ... | ... | ...% |
| 4,000만원 | 3,333,333 | ... | ... | ...% |
| 5,000만원 | 4,166,667 | ... | ... | ...% |
| ... | ... | ... | ... | ... |
| 10,000만원 | 8,333,333 | ... | ... | ...% |

이 테이블은 계산 로직에서 자동 생성한다.

### 3.6 FAQ 컴포넌트

SEO를 위해 최소 5개의 FAQ 항목:

1. **4대보험이란 무엇인가요?** - 국민연금, 건강보험, 장기요양보험, 고용보험 설명
2. **비과세 식대는 무엇인가요?** - 월 20만원 비과세 혜택 설명
3. **연봉과 월급의 차이는?** - 연봉 ÷ 12 = 월급 (상여금 별도인 경우 설명)
4. **실수령액은 어떻게 계산되나요?** - 월급 - 4대보험 - 소득세 - 지방소득세
5. **연말정산으로 환급 받을 수 있나요?** - 간이세액 vs 실제세액 차이 설명

---

## Phase 4: 광고 배치

### 4.1 AdBanner 컴포넌트

처음에는 AdSense 승인 전이므로 플레이스홀더로 구현한다:

```typescript
// AdBanner.tsx
export default function AdBanner({ slot, format, className }: AdBannerProps) {
  // AdSense 승인 후 실제 코드로 교체
  return (
    <div className={`ad-placeholder bg-gray-100 border border-dashed border-gray-300
      flex items-center justify-center text-gray-400 text-sm ${className}`}>
      광고 영역
    </div>
  );
}
```

### 4.2 광고 위치 (3개소)

1. 사이드바 (데스크톱) 또는 입력 폼 아래 (모바일): 300x250
2. 결과 영역과 비교 테이블 사이: 728x90 (반응형)
3. 페이지 하단: 728x90 (반응형)

---

## Phase 5: 빌드 & 배포

### 5.1 빌드 확인

```bash
npm run build
```

빌드 에러가 없는지 확인한다. lint 에러가 있으면 수정한다.

### 5.2 Vercel 배포

```bash
vercel --yes
```

프로덕션 배포:

```bash
vercel --prod --yes
```

### 5.3 배포 후 확인사항

- [ ] 메인 페이지 정상 로딩
- [ ] 계산기 입력/결과 정상 동작
- [ ] 모바일 반응형 정상
- [ ] 차트 렌더링 정상
- [ ] sitemap.xml 접근 가능
- [ ] robots.txt 접근 가능

---

## 중요 규칙

1. **계산 정확도 최우선:** 4대보험 요율과 소득세 계산이 정확해야 한다. 잘못된 계산은 사이트 신뢰도를 떨어뜨린다.
2. **SEO가 생명:** 메타태그, 구조화 데이터, FAQ, 비교 테이블 등 SEO 요소를 빠짐없이 구현한다.
3. **성능 최적화:** 정적 생성(SSG) 활용, 이미지 최적화, Lighthouse 점수 90+ 목표.
4. **모바일 퍼스트:** 트래픽의 60%+ 가 모바일이므로 모바일에서 완벽하게 동작해야 한다.
5. **한국어 콘텐츠:** 모든 UI, 텍스트, FAQ는 한국어로 작성한다.
6. **에러 없는 배포:** `npm run build`가 에러 없이 통과해야 하며, Vercel 배포가 성공적이어야 한다.
