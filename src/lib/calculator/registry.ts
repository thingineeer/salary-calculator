import { CalculatorMeta } from './types';

/**
 * 등록된 계산기 목록
 * 새 계산기 추가 시 여기에 등록하면 자동으로 메뉴/라우팅에 반영
 */
export const calculatorRegistry: CalculatorMeta[] = [
  {
    id: 'salary',
    name: '연봉 실수령액 계산기',
    slug: 'salary',
    description: '4대보험 및 소득세 공제 후 월 실수령액 자동 계산',
    icon: '💰',
    isActive: true,
  },
];

export function getActiveCalculators(): CalculatorMeta[] {
  return calculatorRegistry.filter((c) => c.isActive);
}

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return calculatorRegistry.find((c) => c.slug === slug);
}
