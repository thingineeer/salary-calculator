# MEMORY.md - 프로젝트 핵심 상태

## 배포 정보
- 프로덕션 URL: https://salary-calc.kr
- Vercel URL: https://salary-calculator-sepia.vercel.app
- 도메인: salary-calc.kr (가비아, DNS → Vercel A/CNAME 설정 완료)

## SEO 설정
- Google Search Console: salary-calc.kr + vercel.app 둘 다 등록됨
- 인증 방식: HTML 파일 (public/google1986f6fc01f0211f.html) + 메타태그
- 환경변수: NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (Vercel에 설정됨)
- sitemap.xml, robots.txt 모두 salary-calc.kr 기준

## 기술 스택
- Next.js 16 (App Router) + TypeScript + Tailwind CSS + Recharts
- 폰트: Pretendard Variable (CDN)
- 분석: @vercel/analytics
