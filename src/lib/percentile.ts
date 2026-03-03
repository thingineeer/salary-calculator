// 2024 통계청 임금구조기본통계 근사 데이터 (연봉 기준, 근로자 전체)
// 연봉(만원) → 상위 백분위(%)
const PERCENTILE_TABLE = [
  { salary: 2400, percentile: 70 },
  { salary: 3000, percentile: 55 },
  { salary: 3600, percentile: 43 },
  { salary: 4000, percentile: 35 },
  { salary: 4500, percentile: 28 },
  { salary: 5000, percentile: 22 },
  { salary: 5500, percentile: 18 },
  { salary: 6000, percentile: 14 },
  { salary: 7000, percentile: 10 },
  { salary: 8000, percentile: 7 },
  { salary: 9000, percentile: 5 },
  { salary: 10000, percentile: 3.5 },
  { salary: 12000, percentile: 2 },
  { salary: 15000, percentile: 1 },
  { salary: 20000, percentile: 0.5 },
];

export function getSalaryPercentile(annualSalaryWon: number): number {
  const salaryMan = annualSalaryWon / 10_000;

  if (salaryMan <= PERCENTILE_TABLE[0].salary) {
    return Math.min(99, PERCENTILE_TABLE[0].percentile + (PERCENTILE_TABLE[0].salary - salaryMan) * 0.03);
  }

  const last = PERCENTILE_TABLE[PERCENTILE_TABLE.length - 1];
  if (salaryMan >= last.salary) {
    return Math.max(0.1, last.percentile);
  }

  for (let i = 0; i < PERCENTILE_TABLE.length - 1; i++) {
    const curr = PERCENTILE_TABLE[i];
    const next = PERCENTILE_TABLE[i + 1];
    if (salaryMan >= curr.salary && salaryMan < next.salary) {
      const ratio = (salaryMan - curr.salary) / (next.salary - curr.salary);
      return Math.round((curr.percentile - ratio * (curr.percentile - next.percentile)) * 10) / 10;
    }
  }

  return 50;
}
