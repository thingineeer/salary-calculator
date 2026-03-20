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
- 국민연금: 4.75% (상한 637만/659만)
- 건강보험: 3.595%
- 장기요양: 13.14%
- 고용보험: 0.9%
- 최저시급: 10,320원

## 현재 기능 (142페이지)
- 연봉 실수령액 계산기 (메인)
- 연봉별 비교표 (127개 SEO 페이지 + 허브)
- 이직 연봉 시뮬레이터
- 달러 환산 + 환율 차트 (네이버 금융)
- 시급/일급 계산기 (양방향, HIG disclosure 근무 조건)
- 최저임금 정보 (연도별 추이 + USD 비교)
- 결과 URL 공유 (원클릭 복사)
- 배당금 CTA (mysnowball.kr 크로스 프로모션)
- 다크모드, GA4, AdSense 자동 광고

## TODO (우선순위 순)
- [메모리에서 읽은 TODO — 아래 참고]
1. OG Image 실제 파일 생성
2. AdSense 수익 모니터링
3. 퇴직금 계산기 (/retirement)
4. 프리랜서 3.3% 계산기 (/freelancer)
5. 카카오톡 공유 기능
6. E2E 테스트 (Playwright) 도입
7. 국민연금 상한액 7월 변경 반영

## 주의사항
- git author: thingineeer <dlaudwls1203@naver.com>
- Co-Authored-By 금지
- mj.lee 금지
```

## 4단계: 작업 시작

사용자에게 "어떤 작업부터 시작할까요?" 물어보고, TODO 목록에서 선택하거나 새로운 작업을 받으세요.

$ARGUMENTS가 있으면 해당 작업을 바로 시작하세요.
