// 2026년 기준 4대보험 요율 (근로자 부담분)
export const INSURANCE_RATES = {
  nationalPension: 0.045, // 국민연금 4.5%
  healthInsurance: 0.03545, // 건강보험 3.545%
  longTermCare: 0.1295, // 장기요양보험 = 건강보험료의 12.95%
  employmentInsurance: 0.009, // 고용보험 0.9%
} as const;

// 국민연금 상한 소득월액 (2026년 기준)
export const NATIONAL_PENSION_UPPER_LIMIT = 5_900_000;

// 소득세 과세표준 구간 (2026년 기준)
export const TAX_BRACKETS = [
  { limit: 14_000_000, rate: 0.06, deduction: 0 },
  { limit: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { limit: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { limit: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { limit: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { limit: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { limit: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { limit: Infinity, rate: 0.45, deduction: 65_940_000 },
] as const;

// 근로소득공제 구간
export const EARNED_INCOME_DEDUCTION_BRACKETS = [
  { limit: 5_000_000, rate: 0.7, base: 0, threshold: 0 },
  { limit: 15_000_000, rate: 0.4, base: 3_500_000, threshold: 5_000_000 },
  { limit: 45_000_000, rate: 0.15, base: 7_500_000, threshold: 15_000_000 },
  { limit: 100_000_000, rate: 0.05, base: 12_000_000, threshold: 45_000_000 },
  { limit: Infinity, rate: 0.02, base: 14_750_000, threshold: 100_000_000 },
] as const;

// 비과세 식대 기본값 (월)
export const DEFAULT_NON_TAXABLE_ALLOWANCE = 200_000;

// 연봉별 비교 테이블 구간 (만원)
export const SALARY_COMPARISON_LIST = [
  3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 9000, 10000,
];
