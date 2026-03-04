/**
 * 환율 계산 관련 상수 및 타입 정의
 * 다중 통화 지원 및 시간대별 환율 비교
 */

// 지원 통화 목록
export const SUPPORTED_CURRENCIES = [
  'USD',
  'EUR',
  'JPY',
  'GBP',
  'CNY',
] as const;
export type CurrencyCode = (typeof SUPPORTED_CURRENCIES)[number];

// 과거 환율 비교 프리셋
export const RATE_PRESETS = [
  { label: '1년 전', yearsAgo: 1 },
  { label: '3년 전', yearsAgo: 3 },
  { label: '5년 전', yearsAgo: 5 },
  { label: '직접 입력', yearsAgo: 0 }, // custom
] as const;

// 통화별 소수점 자릿수
export const CURRENCY_DECIMALS: Record<CurrencyCode, number> = {
  USD: 2,
  EUR: 2,
  JPY: 0,
  GBP: 2,
  CNY: 2,
} as const;

// 통화별 기호
export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  JPY: '¥',
  GBP: '£',
  CNY: '¥',
} as const;

// 통화별 국가명
export const CURRENCY_NAMES: Record<CurrencyCode, string> = {
  USD: '미국 (달러)',
  EUR: '유럽연합 (유로)',
  JPY: '일본 (엔)',
  GBP: '영국 (파운드)',
  CNY: '중국 (위안)',
} as const;

// 통화별 국기 이모지
export const CURRENCY_FLAGS: Record<CurrencyCode, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  JPY: '🇯🇵',
  GBP: '🇬🇧',
  CNY: '🇨🇳',
} as const;
