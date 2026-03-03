/**
 * 모든 계산기가 구현해야 하는 공통 인터페이스
 */
export interface CalculatorEngine<TInput, TResult> {
  calculate(input: TInput): TResult;
  validate(input: TInput): ValidationResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * 계산기 메타데이터 (향후 라우팅/메뉴용)
 */
export interface CalculatorMeta {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isActive: boolean;
}
