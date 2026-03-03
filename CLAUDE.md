# CLAUDE.md - 연봉 실수령액 계산기 프로젝트

## 프로젝트 개요
- **이름:** salary-calculator (2026 연봉 실수령액 계산기)
- **스택:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + Recharts
- **배포:** Vercel (salary-calc.kr 커스텀 도메인 연결됨)
- **목표:** SEO 최적화된 한국어 연봉 계산기, AdSense 수익화

## Git 규칙 (필수)
- **커밋 author:** `thingineeer <dlaudwls1203@naver.com>`
- **mj.lee / MJ 사용 금지:** 커밋 author에 mj.lee나 MJ가 포함되면 안 됨
- **Co-Authored-By 사용 금지:** 커밋 메시지에 Co-Authored-By 넣지 말 것
- 커밋 전 반드시 `git config user.name` / `git config user.email` 확인
- pre-commit hook이 mj.lee/i-sens.com을 차단함

## 주요 명령어
```bash
npm run dev        # 개발 서버 (localhost:3000)
npm run build      # 프로덕션 빌드
npm run lint       # ESLint 검사
```

## 프로젝트 구조
```
src/
├── app/
│   ├── layout.tsx          # 공통 레이아웃 + 메타태그 + JSON-LD
│   ├── page.tsx            # 메인 계산기 페이지 ('use client')
│   ├── globals.css         # 글로벌 Tailwind 스타일
│   ├── salary/
│   │   ├── page.tsx        # 연봉별 비교표 허브 (탭 UI)
│   │   ├── layout.tsx      # 비교표 메타데이터
│   │   └── [amount]/
│   │       └── page.tsx    # 개별 연봉 상세 (SSG, 10개)
│   ├── about/              # 소개 페이지
│   ├── privacy/            # 개인정보처리방침
│   ├── terms/              # 이용약관
│   ├── sitemap.ts          # 동적 사이트맵
│   └── robots.ts           # robots.txt
├── components/
│   ├── SalaryForm.tsx      # 입력 폼
│   ├── SalaryResult.tsx    # 결과 카드
│   ├── DeductionChart.tsx  # 도넛 차트 (dynamic import)
│   ├── SalaryTable.tsx     # 비교 테이블
│   ├── JobChangeSimulator.tsx # 이직 시뮬레이터
│   ├── SalaryPercentile.tsx   # 백분위 표시
│   ├── AdBanner.tsx        # 광고 (AdSense)
│   ├── Header.tsx          # 헤더 + 다크모드 토글
│   ├── Footer.tsx          # 푸터
│   └── FAQ.tsx             # FAQ 아코디언 (다중 열림)
├── lib/
│   ├── salary-calculator.ts # 핵심 계산 로직
│   ├── salary-seo-data.ts   # SEO 페이지 데이터 (10개 연봉)
│   ├── analytics.ts         # GA4 이벤트 트래킹
│   ├── constants.ts         # 4대보험 요율, 세율 구간
│   ├── format.ts            # 숫자 포맷팅
│   ├── percentile.ts        # 연봉 백분위
│   └── calculator/          # 확장 가능한 계산기 엔진
└── hooks/
    ├── useDebounce.ts
    └── useIntersectionObserver.ts
```

## 코딩 규칙
- 모든 UI 텍스트는 한국어
- Tailwind CSS만 사용 (인라인 style 금지)
- 컴포넌트는 함수형 + TypeScript 인터페이스 필수
- 숫자 포맷팅: 천단위 콤마 (toLocaleString('ko-KR'))
- 금액 단위: 원
- 폰트: Pretendard Variable (CDN)
- 모바일 퍼스트 반응형 디자인
- `npm run build` 에러 없이 통과 필수

## SEO
- 10개 개별 연봉 페이지: 2400, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000만원
- /salary 비교표 허브 페이지
- JSON-LD: WebApplication + FAQPage
- GA4: G-B7WKMPWCD3
- AdSense: ca-pub-5283496525222246

## 주의사항
- Recharts는 dynamic import (ssr: false)
- layout.tsx는 서버 컴포넌트
- 'use client' 페이지는 별도 layout.tsx에서 metadata export
