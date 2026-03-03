#!/bin/bash
# ============================================================
# 연봉 실수령 계산기 - Claude Code 에이전트 빌드 & 배포
# 사용법: bash run-agent.sh
# 사전조건: claude, node, npm, vercel, git CLI 접근 가능
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INSTRUCTIONS="$SCRIPT_DIR/AGENT_INSTRUCTIONS.md"

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  연봉 실수령 계산기 - 에이전트 빌드 시작  ${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# 1. 사전 체크
echo -e "${YELLOW}[1/3] 사전 환경 체크...${NC}"

check_cmd() {
  if command -v "$1" &> /dev/null; then
    echo -e "  ✅ $1 $(command -v "$1")"
  else
    echo -e "  ❌ $1 이 설치되어 있지 않습니다. 설치 후 다시 실행해주세요."
    exit 1
  fi
}

check_cmd node
check_cmd npm
check_cmd npx
check_cmd vercel
check_cmd git
check_cmd claude

echo ""
echo -e "${YELLOW}[2/3] 지시서 확인...${NC}"
if [ -f "$INSTRUCTIONS" ]; then
  echo -e "  ✅ AGENT_INSTRUCTIONS.md 확인됨"
else
  echo -e "  ❌ AGENT_INSTRUCTIONS.md 파일을 찾을 수 없습니다."
  exit 1
fi

echo ""
echo -e "${YELLOW}[3/3] Claude Code 에이전트 실행...${NC}"
echo -e "${GREEN}  → 에이전트가 프로젝트를 생성하고 Vercel에 배포합니다.${NC}"
echo -e "${GREEN}  → 예상 소요 시간: 15~40분${NC}"
echo ""

# 2. Claude Code 에이전트 실행
claude -p "
너는 시니어 풀스택 개발자 에이전트다. 아래 지시서를 읽고 연봉 실수령 계산기 웹사이트를 처음부터 만들어서 Vercel에 배포해라.

## 작업 순서 (반드시 순서대로)

### Step 1: 프로젝트 생성
- 현재 디렉토리에 salary-calculator 폴더를 만들고 Next.js 프로젝트를 생성해라
- npx create-next-app@latest salary-calculator --typescript --tailwind --eslint --app --src-dir --import-alias '@/*' --use-npm
- cd salary-calculator 후 recharts, @vercel/analytics 설치

### Step 2: 계산 로직 구현
- src/lib/salary-calculator.ts 에 4대보험 + 소득세 계산 로직 구현
- src/lib/constants.ts 에 세율, 보험요율 상수 정의
- 지시서의 세율표와 공제율을 정확하게 반영해라

### Step 3: UI 컴포넌트 구현
- src/components/ 에 SalaryForm, SalaryResult, DeductionChart, SalaryTable, FAQ, Header, Footer, AdBanner 구현
- Tailwind CSS로 스타일링 (파란색 테마, 반응형, 다크모드)
- Recharts로 도넛 차트 구현
- 연봉 입력 시 실시간 결과 업데이트
- 천단위 콤마 포맷팅

### Step 4: 메인 페이지 조립
- src/app/page.tsx 에 모든 컴포넌트 조립
- src/app/layout.tsx 에 SEO 메타태그, JSON-LD 구조화 데이터, Pretendard 폰트 설정
- src/app/sitemap.ts, src/app/robots.ts 생성
- FAQ 구조화 데이터 (FAQPage schema) 추가

### Step 5: 빌드 & 배포
- npm run build 실행하여 에러가 없는지 확인
- 에러가 있으면 반드시 수정 후 다시 빌드
- git init && git add -A && git commit -m 'Initial commit: salary calculator MVP'
- vercel --prod --yes 로 프로덕션 배포
- 배포된 URL을 출력해라

## 지시서 전문:

$(cat "$INSTRUCTIONS")

## 최종 확인사항
- 빌드 에러 없이 성공해야 한다
- Vercel 배포가 성공해야 한다
- 배포된 URL을 마지막에 반드시 출력해라
- 계산 로직이 정확해야 한다 (연봉 5000만원 기준 실수령액 약 340~360만원 범위인지 확인)
" --allowedTools "Bash(*)" "Read(*)" "Write(*)" "Edit(*)" --max-turns 100 --verbose

echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  에이전트 작업 완료!                       ${NC}"
echo -e "${GREEN}============================================${NC}"
