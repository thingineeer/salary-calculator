import { NextResponse } from 'next/server';

// 폴백 환율 (API 실패 시 사용)
const FALLBACK_RATE = 1500;

// 캐시: 1시간마다 갱신
let cachedRate: { rate: number; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1시간

export async function GET() {
  // 캐시가 유효하면 캐시 반환
  if (cachedRate && Date.now() - cachedRate.timestamp < CACHE_DURATION) {
    return NextResponse.json({
      rate: cachedRate.rate,
      source: 'cache',
      updatedAt: new Date(cachedRate.timestamp).toISOString(),
    });
  }

  try {
    // ExchangeRate-API (무료, 일 1,500 요청)
    const response = await fetch(
      'https://open.er-api.com/v6/latest/USD',
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`API 응답 오류: ${response.status}`);
    }

    const data = await response.json();
    const krwRate = data.rates?.KRW;

    if (!krwRate || typeof krwRate !== 'number') {
      throw new Error('KRW 환율 데이터 없음');
    }

    const rate = Math.round(krwRate);

    // 캐시 업데이트
    cachedRate = { rate, timestamp: Date.now() };

    return NextResponse.json({
      rate,
      source: 'api',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn(
      '환율 API 호출 실패:',
      error instanceof Error ? error.message : error
    );

    // 캐시가 있으면 만료되어도 반환
    if (cachedRate) {
      return NextResponse.json({
        rate: cachedRate.rate,
        source: 'stale-cache',
        updatedAt: new Date(cachedRate.timestamp).toISOString(),
      });
    }

    // 최종 폴백
    return NextResponse.json({
      rate: FALLBACK_RATE,
      source: 'fallback',
      updatedAt: new Date().toISOString(),
    });
  }
}
