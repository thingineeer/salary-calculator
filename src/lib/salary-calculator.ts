import {
  INSURANCE_RATES,
  NATIONAL_PENSION_UPPER_LIMIT,
  TAX_BRACKETS,
  EARNED_INCOME_DEDUCTION_BRACKETS,
  DEFAULT_NON_TAXABLE_ALLOWANCE,
} from './constants';

export interface SalaryInput {
  annualSalary: number; // 연봉 (원)
  dependents: number; // 부양가족 수 (본인 포함, 기본 1)
  childrenUnder20: number; // 20세 이하 자녀 수
  nonTaxableAllowance: number; // 비과세 월액 (기본 200,000원 = 식대)
}

export interface SalaryResult {
  monthlySalary: number; // 월 급여 (세전)
  nationalPension: number; // 국민연금
  healthInsurance: number; // 건강보험
  longTermCare: number; // 장기요양보험
  employmentInsurance: number; // 고용보험
  incomeTax: number; // 소득세
  localIncomeTax: number; // 지방소득세
  totalDeduction: number; // 공제 합계
  netSalary: number; // 실수령액
  effectiveTaxRate: number; // 실효세율 (%)
}

// 근로소득공제 계산
function calcEarnedIncomeDeduction(totalSalary: number): number {
  for (const bracket of EARNED_INCOME_DEDUCTION_BRACKETS) {
    if (totalSalary <= bracket.limit) {
      return bracket.base + (totalSalary - bracket.threshold) * bracket.rate;
    }
  }
  return 0;
}

// 과세표준에 따른 산출세액
function calcTaxByBracket(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome <= bracket.limit) {
      return taxableIncome * bracket.rate - bracket.deduction;
    }
  }
  return 0;
}

// 근로소득세액공제 계산
function calcEarnedIncomeTaxCredit(
  calculatedTax: number,
  totalSalary: number
): number {
  if (calculatedTax <= 0) return 0;

  // 세액공제 금액 계산
  let credit: number;
  if (calculatedTax <= 1_300_000) {
    credit = calculatedTax * 0.55;
  } else {
    credit = 715_000 + (calculatedTax - 1_300_000) * 0.3;
  }

  // 한도 적용
  let limit: number;
  if (totalSalary <= 33_000_000) {
    limit = 740_000;
  } else if (totalSalary <= 70_000_000) {
    limit = Math.max(660_000, 740_000 - (totalSalary - 33_000_000) * 0.008);
  } else {
    limit = Math.max(500_000, 660_000 - (totalSalary - 70_000_000) * 0.5);
  }

  return Math.min(credit, limit);
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const {
    annualSalary,
    dependents = 1,
    childrenUnder20 = 0,
    nonTaxableAllowance = DEFAULT_NON_TAXABLE_ALLOWANCE,
  } = input;

  const monthlySalary = Math.floor(annualSalary / 12);

  // === 4대보험 계산 (월 기준) ===

  // 과세 대상 월 소득 (비과세 제외, 최소 0)
  const taxableMonthly = Math.max(0, monthlySalary - nonTaxableAllowance);

  // 국민연금: 상한액 적용
  const pensionBase = Math.min(taxableMonthly, NATIONAL_PENSION_UPPER_LIMIT);
  const nationalPension = Math.floor(
    pensionBase * INSURANCE_RATES.nationalPension
  );

  // 건강보험
  const healthInsurance = Math.floor(
    taxableMonthly * INSURANCE_RATES.healthInsurance
  );

  // 장기요양보험 (건강보험료에 연동)
  const longTermCare = Math.floor(
    healthInsurance * INSURANCE_RATES.longTermCare
  );

  // 고용보험
  const employmentInsurance = Math.floor(
    taxableMonthly * INSURANCE_RATES.employmentInsurance
  );

  // === 소득세 계산 (연 기준 → 월 환산) ===

  // 1. 비과세 제외한 과세 대상 연소득 (최소 0)
  const annualNonTaxable = nonTaxableAllowance * 12;
  const taxableAnnualSalary = Math.max(0, annualSalary - annualNonTaxable);

  // 2. 근로소득공제
  const earnedIncomeDeduction = calcEarnedIncomeDeduction(taxableAnnualSalary);

  // 3. 근로소득금액
  const earnedIncome = taxableAnnualSalary - earnedIncomeDeduction;

  // 4. 인적공제 (기본공제: 1인당 150만원)
  const personalDeduction = dependents * 1_500_000;

  // 자녀세액공제는 별도 처리 (20세 이하 자녀)
  // 1명: 15만원, 2명: 30만원, 3명 이상: 30만원 + (자녀수-2) × 30만원
  let childTaxCredit = 0;
  if (childrenUnder20 === 1) childTaxCredit = 150_000;
  else if (childrenUnder20 === 2) childTaxCredit = 300_000;
  else if (childrenUnder20 >= 3)
    childTaxCredit = 300_000 + (childrenUnder20 - 2) * 300_000;

  // 5. 과세표준
  const taxableIncome = Math.max(0, earnedIncome - personalDeduction);

  // 6. 산출세액
  const calculatedTax = calcTaxByBracket(taxableIncome);

  // 7. 근로소득세액공제
  const taxCredit = calcEarnedIncomeTaxCredit(calculatedTax, taxableAnnualSalary);

  // 8. 결정세액 (연간)
  const annualIncomeTax = Math.max(0, calculatedTax - taxCredit - childTaxCredit);

  // 9. 월 소득세
  const incomeTax = Math.floor(annualIncomeTax / 12);

  // 10. 지방소득세 (소득세의 10%)
  const localIncomeTax = Math.floor(incomeTax * 0.1);

  // === 합산 ===
  const totalDeduction =
    nationalPension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localIncomeTax;

  const netSalary = monthlySalary - totalDeduction;

  const effectiveTaxRate =
    monthlySalary > 0
      ? Math.round((totalDeduction / monthlySalary) * 1000) / 10
      : 0;

  return {
    monthlySalary,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeduction,
    netSalary,
    effectiveTaxRate,
  };
}
