'use client';

import { SalaryResult as SalaryResultType } from '@/lib/salary-calculator';
import { formatNumber } from '@/lib/format';

interface DollarResultProps {
  currentSalaryResult: SalaryResultType;
  pastSalaryResult: SalaryResultType;
  currentRate: number;
  pastRate: number;
  currentAnnualSalary: number;
  pastAnnualSalary: number;
}

export default function DollarResult({
  currentSalaryResult,
  pastSalaryResult,
  currentRate,
  pastRate,
  currentAnnualSalary,
  pastAnnualSalary,
}: DollarResultProps) {
  // 환율이 비현실적이면 계산 불가
  const MIN_RATE = 100;
  const isCurrentRateValid = currentRate >= MIN_RATE;
  const isPastRateValid = pastRate >= MIN_RATE;
  const canCompare = isCurrentRateValid && isPastRateValid && currentAnnualSalary > 0 && pastAnnualSalary > 0;

  const currentDollar = isCurrentRateValid ? Math.floor(currentSalaryResult.netSalary / currentRate) : 0;
  const pastDollar = isPastRateValid ? Math.floor(pastSalaryResult.netSalary / pastRate) : 0;
  const dollarDiff = canCompare ? currentDollar - pastDollar : 0;
  const diffPercent = canCompare && pastDollar > 0 ? ((dollarDiff / pastDollar) * 100).toFixed(1) : '0.0';

  // 원화 실수령 차이
  const krwDiff = currentSalaryResult.netSalary - pastSalaryResult.netSalary;

  const diffColor =
    dollarDiff > 0
      ? 'text-green-600 dark:text-green-400'
      : dollarDiff < 0
        ? 'text-red-600 dark:text-red-400'
        : 'text-gray-500 dark:text-gray-400';

  const diffBg =
    dollarDiff > 0
      ? 'bg-green-50 dark:bg-green-900/30'
      : dollarDiff < 0
        ? 'bg-red-50 dark:bg-red-900/30'
        : 'bg-gray-50 dark:bg-gray-700';

  const diffEmoji = dollarDiff > 0 ? '↑' : dollarDiff < 0 ? '↓' : '→';

  // 핵심 인사이트 문구
  const getInsight = () => {
    if (!canCompare) {
      return '연봉과 환율을 모두 입력하면 비교 결과를 확인할 수 있습니다';
    }

    const salaryUp = currentAnnualSalary > pastAnnualSalary;
    const rateUp = currentRate > pastRate;

    if (salaryUp && rateUp && dollarDiff <= 0) {
      return '연봉은 올랐지만, 환율 상승으로 달러 가치는 오히려 줄었습니다';
    }
    if (salaryUp && rateUp && dollarDiff > 0) {
      return '연봉 인상분이 환율 상승분을 넘어서 달러 가치가 증가했습니다';
    }
    if (salaryUp && !rateUp) {
      return '연봉도 오르고 환율도 떨어져서 달러 가치가 크게 올랐습니다';
    }
    if (!salaryUp && rateUp) {
      return '연봉은 그대로인데 환율이 올라서 달러 가치가 줄었습니다';
    }
    if (dollarDiff === 0) {
      return '달러 기준으로 보면 실질적으로 변화가 없습니다';
    }
    return dollarDiff > 0 ? '달러 기준 실수령액이 증가했습니다' : '달러 기준 실수령액이 감소했습니다';
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-6 space-y-5 card-hover"
      aria-label="달러 환산 비교 결과"
      role="region"
    >
      {/* 핵심: 차이 금액 */}
      <div className={`text-center py-5 rounded-xl ${canCompare ? diffBg : 'bg-gray-50 dark:bg-gray-700'}`} aria-live="polite">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          달러 기준 월 실수령 변화
        </p>
        {canCompare ? (
          <>
            <p className={`text-4xl sm:text-5xl font-extrabold tabular-nums ${diffColor}`}>
              {dollarDiff >= 0 ? '+' : ''}{dollarDiff === 0 ? '' : dollarDiff > 0 ? '' : '-'}${formatNumber(Math.abs(dollarDiff))}
            </p>
            <p className={`text-base font-semibold mt-1 tabular-nums ${diffColor}`}>
              {diffEmoji} {dollarDiff >= 0 ? '+' : ''}{diffPercent}%
            </p>
          </>
        ) : (
          <p className="text-2xl font-bold text-gray-400 dark:text-gray-500">
            -
          </p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 px-4">
          {getInsight()}
        </p>
      </div>

      {/* 이전/현재 비교 카드 */}
      <div className="grid grid-cols-2 gap-3">
        {/* 이전 */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">이전</p>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-200 tabular-nums">
            ${formatNumber(pastDollar)}
          </p>
          <div className="mt-2 space-y-0.5">
            <p className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
              연봉 {formatNumber(pastAnnualSalary / 10000)}만원
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              환율 {formatNumber(pastRate)}원
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              월 실수령 {formatNumber(pastSalaryResult.netSalary)}원
            </p>
          </div>
        </div>

        {/* 현재 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center border border-blue-200 dark:border-blue-800">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-3">현재</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 tabular-nums">
            ${formatNumber(currentDollar)}
          </p>
          <div className="mt-2 space-y-0.5">
            <p className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
              연봉 {formatNumber(currentAnnualSalary / 10000)}만원
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              환율 {formatNumber(currentRate)}원
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              월 실수령 {formatNumber(currentSalaryResult.netSalary)}원
            </p>
          </div>
        </div>
      </div>

      {/* 한줄 요약 */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-500 space-y-0.5">
        <p>
          원화 월 실수령: {krwDiff >= 0 ? '+' : ''}{formatNumber(krwDiff)}원
          {krwDiff > 0 && dollarDiff <= 0 && ' (올랐지만 환율 때문에 달러로는...)'}
        </p>
      </div>
    </div>
  );
}
