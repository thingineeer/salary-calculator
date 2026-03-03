# CLI 작업 지시서

이 파일을 읽고 아래 작업들을 순서대로 진행해주세요.
CLAUDE.md에 프로젝트 규칙이 있으니 먼저 읽어주세요.

---

## 1. layout.tsx openGraph URL 추가
src/app/layout.tsx의 openGraph 객체에 url 필드 추가:
```typescript
openGraph: {
  title: '2026 연봉 실수령액 계산기',
  description: '연봉을 입력하면 4대보험과 세금 공제 후 실수령액을 바로 확인! 2026년 최신 세율 기준.',
  type: 'website',
  locale: 'ko_KR',
  url: 'https://salary-calc.kr',  // 이거 추가
},
```

## 2. 다크모드 지원
AGENT_INSTRUCTIONS.md에 명시된 다크모드 구현:
- tailwind.config.ts에 `darkMode: 'class'` 설정
- globals.css에 dark mode CSS 변수 추가
- Header.tsx에 다크모드 토글 버튼 (해/달 아이콘)
- 모든 컴포넌트에 `dark:` Tailwind 클래스 추가
- localStorage로 테마 저장, 시스템 기본값 감지

## 3. 연봉 슬라이더 입력 추가
SalaryForm.tsx에 range 슬라이더 추가:
- 범위: 20,000,000 ~ 300,000,000원
- step: 1,000,000원 (100만원 단위)
- 슬라이더 ↔ 텍스트 입력 양방향 동기화
- 슬라이더 위에 현재 값 표시
- Tailwind로 슬라이더 스타일링 (accent-blue-600)

## 4. Lighthouse 성능 최적화
목표: 모든 항목 90점 이상
- fold 아래 컴포넌트 lazy loading:
  ```typescript
  const SalaryTable = dynamic(() => import('@/components/SalaryTable'));
  const FAQ = dynamic(() => import('@/components/FAQ'));
  ```
- Pretendard 폰트 font-display: swap 확인
- 불필요한 번들 사이즈 줄이기
- next/image 사용 (아이콘/이미지 있을 경우)

## 5. 에러 핸들링 강화
- SalaryForm에 입력값 검증 추가
- 음수, 0, NaN 방지
- 최소 0원 ~ 최대 10억원 범위 제한
- 잘못된 입력 시 사용자 피드백 (경고 메시지)

## 6. 접근성(a11y) 개선
- form input에 적절한 `<label>` 연결
- aria-label, aria-describedby 추가
- 키보드 탭 순서 확인
- DeductionChart에 aria-label 또는 sr-only 텍스트
- 색상 대비 WCAG AA 기준 충족 확인

## 7. 빌드 & 배포
모든 작업 완료 후:
```bash
npm run build    # 에러 없이 통과 확인
npm run lint     # lint 에러 수정
vercel --prod --yes  # 프로덕션 배포
```
