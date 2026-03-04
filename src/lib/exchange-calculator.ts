/**
 * 환율 계산 엔진
 * KRW 기반 연봉을 다양한 통화로 환산하고,
 * 시간대별 환율 변화를 비교
 */

import {
  SUPPORTED_CURRENCIES,
  type CurrencyCode,
  CURRENCY_DECIMALS,
  CURRENCY_SYMBOLS,
  CURRENCY_NAMES,
  CURRENCY_FLAGS,
} from './exchange-constants';

export interface ExchangeInput {
  annualSalaryKRW: number; // 한국 연봉 (원)
  currentRate: number; // 현재 환율 (원/USD)
  pastRate: number; // 과거 환율 (원/USD)
  netMonthlySalary: number; // 세후 월 실수령액 (원)
}

export interface ExchangeResult {
  current: {
    annualUSD: number; // 현재 환율 기준 연봉 (USD)
    monthlyGrossUSD: number; // 현재 환율 기준 월급 세전 (USD)
    monthlyNetUSD: number; // 현재 환율 기준 월급 세후 (USD)
  };
  past: {
    annualUSD: number;
    monthlyGrossUSD: number;
    monthlyNetUSD: number;
  };
  diff: {
    monthlyNetDiff: number; // 월 실수령 차이 (USD)
    percentChange: number; // 변동률 (%)
    direction: 'up' | 'down' | 'same';
  };
}

export interface MultiCurrencyResult {
  currency: CurrencyCode;
  symbol: string;
  flag: string;
  name: string;
  annualConverted: number;
  monthlyNetConverted: number;
  rate: number;
}

/**
 * 기본 환율 계산: KRW → USD 기준으로 현재/과거 비교
 * @param input - 연봉, 환율, 세후 월급 정보
 * @returns 현재/과거 환율 기준 환산액 및 변화율
 */
export function calculateExchange(input: ExchangeInput): ExchangeResult {
  const {
    annualSalaryKRW,
    currentRate,
    pastRate,
    netMonthlySalary,
  } = input;

  // 월 급여 세전 (연봉 / 12)
  const monthlyGrossKRW = Math.floor(annualSalaryKRW / 12);

  // === 현재 환율 기준 ===
  const currentAnnualUSD = Math.round(
    (annualSalaryKRW / currentRate) * 100
  ) / 100;
  const currentMonthlyGrossUSD = Math.round(
    (monthlyGrossKRW / currentRate) * 100
  ) / 100;
  const currentMonthlyNetUSD = Math.round(
    (netMonthlySalary / currentRate) * 100
  ) / 100;

  // === 과거 환율 기준 ===
  const pastAnnualUSD = Math.round((annualSalaryKRW / pastRate) * 100) / 100;
  const pastMonthlyGrossUSD = Math.round(
    (monthlyGrossKRW / pastRate) * 100
  ) / 100;
  const pastMonthlyNetUSD = Math.round(
    (netMonthlySalary / pastRate) * 100
  ) / 100;

  // === 변화 계산 ===
  const monthlyNetDiff = Math.round(
    (currentMonthlyNetUSD - pastMonthlyNetUSD) * 100
  ) / 100;
  const percentChange =
    pastMonthlyNetUSD > 0
      ? Math.round(
          ((monthlyNetDiff / pastMonthlyNetUSD) * 100) * 100
        ) / 100
      : 0;

  let direction: 'up' | 'down' | 'same' = 'same';
  if (monthlyNetDiff > 0) direction = 'up';
  else if (monthlyNetDiff < 0) direction = 'down';

  return {
    current: {
      annualUSD: currentAnnualUSD,
      monthlyGrossUSD: currentMonthlyGrossUSD,
      monthlyNetUSD: currentMonthlyNetUSD,
    },
    past: {
      annualUSD: pastAnnualUSD,
      monthlyGrossUSD: pastMonthlyGrossUSD,
      monthlyNetUSD: pastMonthlyNetUSD,
    },
    diff: {
      monthlyNetDiff,
      percentChange,
      direction,
    },
  };
}

/**
 * 다중 통화 환산: USD 환율을 기반으로 다른 통화들로 변환
 * @param annualSalaryKRW - 한국 연봉 (원)
 * @param netMonthlySalary - 세후 월 실수령액 (원)
 * @param rates - 통화별 환율 (원/통화)
 * @returns 각 통화별 환산 결과 배열
 */
export function calculateMultiCurrency(
  annualSalaryKRW: number,
  netMonthlySalary: number,
  rates: Partial<Record<CurrencyCode, number>>
): MultiCurrencyResult[] {
  return SUPPORTED_CURRENCIES
    .filter((currency) => rates[currency] !== undefined && rates[currency]! > 0)
    .map((currency) => {
      const rate = rates[currency]!;
      const annualConverted = Math.round(
        (annualSalaryKRW / rate) * 100
      ) / 100;
      const monthlyNetConverted = Math.round(
        (netMonthlySalary / rate) * 100
      ) / 100;

      return {
        currency,
        symbol: CURRENCY_SYMBOLS[currency],
        flag: CURRENCY_FLAGS[currency],
        name: CURRENCY_NAMES[currency],
        annualConverted,
        monthlyNetConverted,
        rate,
      };
    });
}

/**
 * 통화별 금액 포맷팅
 * @param amount - 금액
 * @param currency - 통화 코드
 * @returns 포맷된 금액 문자열
 */
export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const decimals = CURRENCY_DECIMALS[currency];
  const symbol = CURRENCY_SYMBOLS[currency];

  // 천단위 구분자 추가 (천 단위 콤마)
  const formatted = amount
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${symbol}${formatted}`;
}

/**
 * 환율 유효성 검사
 * @param rate - 확인할 환율
 * @returns 유효 여부
 */
export function isValidRate(rate: number): boolean {
  return typeof rate === 'number' && rate > 0 && isFinite(rate);
}

/**
 * 두 시점의 환율 변화율 계산
 * @param currentRate - 현재 환율
 * @param pastRate - 과거 환율
 * @returns 변화율 (%)
 */
export function calculateRateChange(
  currentRate: number,
  pastRate: number
): number {
  if (pastRate <= 0) return 0;
  return Math.round(
    (((currentRate - pastRate) / pastRate) * 100) * 100
  ) / 100;
}

/**
 * 환율 기반 구매력 지수 (상대적 연봉 비교)
 * 같은 실수령액이 다른 시점에 얼마나 다른 가치를 가지는가
 * @param currentMonthlyNetUSD - 현재 환율 기준 월 실수령 (USD)
 * @param pastMonthlyNetUSD - 과거 환율 기준 월 실수령 (USD)
 * @returns 구매력 지수 (100 = 동일)
 */
export function calculatePurchasingPowerIndex(
  currentMonthlyNetUSD: number,
  pastMonthlyNetUSD: number
): number {
  if (pastMonthlyNetUSD <= 0) return 100;
  return Math.round((currentMonthlyNetUSD / pastMonthlyNetUSD) * 100);
}
