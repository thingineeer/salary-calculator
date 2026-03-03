import { CalculatorEngine, ValidationResult } from './types';
import { calculateSalary, SalaryResult } from '../salary-calculator';

export interface SalaryInput {
  annualSalary: number;
  dependents: number;
  childrenUnder20: number;
  nonTaxableAllowance: number;
}

export class SalaryEngine implements CalculatorEngine<SalaryInput, SalaryResult> {
  calculate(input: SalaryInput): SalaryResult {
    return calculateSalary(input);
  }

  validate(input: SalaryInput): ValidationResult {
    const errors = [];

    if (input.annualSalary < 0 || isNaN(input.annualSalary)) {
      errors.push({ field: 'annualSalary', message: '연봉은 0원 이상이어야 합니다.' });
    }
    if (input.annualSalary > 1_000_000_000) {
      errors.push({ field: 'annualSalary', message: '연봉은 10억원 이하로 입력해주세요.' });
    }
    if (input.dependents < 1) {
      errors.push({ field: 'dependents', message: '부양가족 수는 1명 이상이어야 합니다. (본인 포함)' });
    }
    if (input.childrenUnder20 < 0) {
      errors.push({ field: 'childrenUnder20', message: '20세 이하 자녀 수는 0명 이상이어야 합니다.' });
    }
    if (input.nonTaxableAllowance < 0) {
      errors.push({ field: 'nonTaxableAllowance', message: '비과세액은 0원 이상이어야 합니다.' });
    }

    return { isValid: errors.length === 0, errors };
  }
}
