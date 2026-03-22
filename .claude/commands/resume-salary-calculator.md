---
name: resume-salary-calculator
description: "다른 컴퓨터에서 pull 받은 후 프로젝트 컨텍스트를 빠르게 복원하는 커맨드. 현재 상태, TODO, 아키텍처를 한눈에 파악하고 바로 작업 시작."
---

# salary-calculator 프로젝트 재개

다른 컴퓨터에서 작업을 이어받았습니다. 프로젝트 컨텍스트를 빠르게 복원해주세요.

## 1단계: 환경 확인

아래를 순서대로 실행하세요:

```bash
# git 상태
git status && git log --oneline -5

# 브랜치 확인
git branch -a

# git author 확인 (반드시 thingineeer)
git config user.name && git config user.email

# 의존성 설치
npm install

# 빌드 확인
npm run build
```

## 2단계: 프로젝트 현황 파악

아래 파일들을 읽어서 현재 상태를 파악하세요:

1. `CLAUDE.md` — 프로젝트 규칙, 구조, 코딩 규칙
2. 메모리 파일 (auto memory에서 자동 로드됨) — 최근 세션 기록, TODO, 확정 요율

## 3단계: 핵심 정보 요약 보고

아래 형식으로 현재 상태를 요약해서 보고하세요:

```
## 프로젝트 상태
- 사이트: www.salary-calc.kr
- 브랜치: [현재 브랜치]
- 마지막 커밋: [커밋 메시지]
- 빌드: [성공/실패]
- 총 페이지 수: [N개]

## 2026년 확정 요율
- 국민연금: 4.75% (상한 637만원)
- 건강보험: 3.595%
- 장기요양: 13.14%
- 고용보험: 0.9%
- 최저시급: 10,320원

## 아키텍처 (2025-03-23 기준)
- Next.js 16 App Router + TypeScript + Tailwind CSS + Recharts
- 메인 페이지(/): 서버 컴포넌트 (SSR) + CalculatorSection 클라이언트 컴포넌트
  - CalculatorSection.tsx: 인터랙티브 계산기 (children prop으로 서버 콘텐츠 포함)
  - FAQAccordion.tsx: FAQ 아코디언 (클라이언트)
  - faq-data.ts: FAQ 데이터 16개 (서버/클라이언트 공유)
- 개별 연봉 페이지(/salary/[amount]): SSG 127개
- 가이드 페이지 5종: 서버 컴포넌트 (SSR)
- AdBanner: 승인 전 null 반환 (플레이스홀더 없음), 메인 광고 2개로 제한

## 현재 기능 (148페이지)
- 연봉 실수령액 계산기 (메인, SSR)
- 연봉별 비교표 (127개 SSG 페이지 + 허브, 교육 콘텐츠 포함)
- 이직 연봉 시뮬레이터
- 달러 환산 + 환율 차트 (하나은행 매매기준율)
- 시급/일급 계산기 (양방향, 근무 조건 '설정' 토글)
- 최저임금 정보 (2000~2026년 추이 + 시급/월급 USD 환산, 1월 환율 기준)
- FAQ 16개 + JSON-LD 구조화 데이터
- About 페이지 E-E-A-T (서비스 소개, 데이터 출처, 검증 방법 — 거짓 정보 없음)
- 결과 URL 공유 (원클릭 복사)
- 배당금 CTA (mysnowball.kr 크로스 프로모션)
- 다크모드, GA4, AdSense (승인 대기중)
- 픽셀아트 마스코트 SVG + OG 이미지 SVG

## AdSense 상태
- 현재: "가치가 별로 없는 콘텐츠"로 거절 → 대응 완료
- 대응 내용:
  1. 메인 페이지 SSR 전환 (크롤러 인덱싱 가능)
  2. About E-E-A-T 강화 (정직한 서비스 소개)
  3. 광고 5개→2개 축소, 플레이스홀더 제거
  4. FAQ 6→16개 확장 + JSON-LD
  5. Salary 허브 교육 콘텐츠 추가
  6. OG 이미지 생성
  7. Lint 0에러/0경고
- 재심사 요청 필요

## TODO (우선순위 순)
1. AdSense 재심사 요청 후 승인 대기
2. 퇴직금 계산기 (/retirement)
3. 프리랜서 3.3% 계산기 (/freelancer)
4. 카카오톡 공유 기능
5. E2E 테스트 (Playwright) 도입
6. 국민연금 상한액 7월 변경 반영

## 주의사항
- git author: thingineeer <dlaudwls1203@naver.com>
- Co-Authored-By 금지
- mj.lee 금지
- About 페이지에 거짓 정보(가짜 팀, 가짜 경력, 가짜 전문가 검증) 절대 넣지 말 것
```

## 4단계: 작업 시작

사용자에게 "어떤 작업부터 시작할까요?" 물어보고, TODO 목록에서 선택하거나 새로운 작업을 받으세요.

$ARGUMENTS가 있으면 해당 작업을 바로 시작하세요.
