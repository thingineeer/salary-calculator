# CLAUDE.md - 연봉 실수령액 계산기 프로젝트

## 프로젝트 개요
- **이름:** salary-calculator (2026 연봉 실수령액 계산기)
- **스택:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + Recharts
- **배포:** Vercel (salary-calc.kr 커스텀 도메인 연결됨)
- **목표:** SEO 최적화된 한국어 연봉 계산기, AdSense 수익화

## 주요 명령어
```bash
npm run dev        # 개발 서버 (localhost:3000)
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 검사
vercel --prod --yes  # 프로덕션 배포
```

## 프로젝트 구조
```
src/
├── app/
│   ├── layout.tsx          # 공통 레이아웃 + 메타태그 + JSON-LD
│   ├── page.tsx            # 메인 계산기 페이지 ('use client')
│   ├── globals.css         # 글로벌 Tailwind 스타일
│   ├── privacy/            # 개인정보처리방침 페이지
│   ├── sitemap.ts          # 동적 사이트맵 (salary-calc.kr)
│   └── robots.ts           # robots.txt (salary-calc.kr)
├── components/
│   ├── SalaryForm.tsx      # 입력 폼 (연봉, 부양가족, 비과세)
│   ├── SalaryResult.tsx    # 결과 카드 (실수령액, 공제 상세)
│   ├── DeductionChart.tsx  # 도넛 차트 (Recharts)
│   ├── SalaryTable.tsx     # 연봉 구간별 비교 테이블
│   ├── AdBanner.tsx        # 광고 플레이스홀더 (AdSense 승인 전)
│   ├── Header.tsx          # 헤더
│   ├── Footer.tsx          # 푸터
│   └── FAQ.tsx             # FAQ 아코디언 (SEO용)
└── lib/
    ├── salary-calculator.ts # 핵심 계산 로직
    └── constants.ts         # 4대보험 요율, 세율 구간 상수
```

## 계산 로직 핵심 (constants.ts)
- 국민연금: 4.5% (상한 월 590만원)
- 건강보험: 3.545%
- 장기요양: 건강보험료의 12.95%
- 고용보험: 0.9%
- 소득세: 2026년 과세표준 구간별 (6%~45%)
- 비과세 식대: 월 20만원 기본

## 코딩 규칙
- 모든 UI 텍스트는 한국어
- Tailwind CSS만 사용 (인라인 style 금지)
- 컴포넌트는 함수형 + TypeScript 인터페이스 필수
- 숫자 포맷팅: 천단위 콤마 (toLocaleString('ko-KR'))
- 금액 단위: 원
- 폰트: Pretendard Variable (CDN)
- 모바일 퍼스트 반응형 디자인

## SEO 체크리스트
- layout.tsx에 메타태그, OpenGraph, JSON-LD (WebApplication + FAQPage)
- sitemap.ts / robots.ts → salary-calc.kr 기준
- Google Search Console 등록 완료 (메타태그 인증)
- 환경변수: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (Vercel에 설정됨)

## 주의사항
- `npm run build` 에러 없이 통과 필수
- Recharts는 'use client' 컴포넌트에서만 사용
- layout.tsx는 서버 컴포넌트 (JSON-LD는 dangerouslySetInnerHTML로)
- AdBanner는 현재 플레이스홀더 (추후 AdSense 코드로 교체)
