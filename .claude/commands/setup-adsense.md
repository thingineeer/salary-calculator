---
name: setup-adsense
description: "AdSense 승인 후 광고 슬롯 연동. 승인되자마자 실행하면 즉시 광고가 노출됩니다."
---

# AdSense 광고 슬롯 연동

AdSense 승인이 완료되었습니다! 광고 슬롯을 연동합니다.

## 1단계: 현재 AdBanner 구현 확인

`src/components/AdBanner.tsx`를 읽어서 현재 구현 상태를 확인하세요.
현재는 `slot` prop이 없으면 플레이스홀더("광고 영역")를 보여주고 있습니다.

## 2단계: AdSense에서 광고 단위 생성

사용자에게 AdSense 대시보드(https://www.google.com/adsense/)에서 아래 광고 단위를 생성하라고 안내하세요:

| 위치 | 광고 형태 | 권장 크기 | 변수명 제안 |
|------|----------|----------|-----------|
| 사이드바 (PC) | 디스플레이 | 300x250 | `SLOT_SIDEBAR` |
| 결과 아래 | 디스플레이 (자동) | 반응형 | `SLOT_AFTER_RESULT` |
| 테이블 중간 | 인피드 | 반응형 | `SLOT_IN_FEED` |
| FAQ 중간 | 인아티클 | fluid | `SLOT_IN_ARTICLE` |
| 하단 | 디스플레이 (자동) | 반응형 | `SLOT_FOOTER` |

## 3단계: 슬롯 ID 적용

사용자가 슬롯 ID를 제공하면, `src/app/page.tsx`와 다른 페이지에서 AdBanner 컴포넌트에 slot prop을 추가하세요:

```tsx
// Before (플레이스홀더)
<AdBanner format="auto" adPosition="after_result" />

// After (실제 광고)
<AdBanner slot="1234567890" format="auto" adPosition="after_result" />
```

## 4단계: 자동 광고 (대안)

만약 개별 슬롯을 만들기 번거롭다면, **AdSense 자동 광고**를 활성화하는 방법도 있습니다:
- AdSense 대시보드 → 사이트 → salary-calc.kr → 자동 광고 ON
- 이러면 `adsbygoogle.js`가 자동으로 최적 위치에 광고를 배치합니다
- 현재 layout.tsx에 이미 adsbygoogle.js 스크립트가 로드되어 있으므로, 자동 광고만 켜면 됩니다

## 5단계: 확인

배포 후 크롬으로 salary-calc.kr에 접속하여:
1. 광고가 실제로 표시되는지 확인
2. 모바일/데스크탑 모두 확인
3. 다크모드에서 광고 영역이 깨지지 않는지 확인

## 참고
- Publisher ID: ca-pub-5283496525222246
- ads.txt: 정상 배포됨 (승인됨 상태)
- adsbygoogle.js: layout.tsx에 이미 로드됨
