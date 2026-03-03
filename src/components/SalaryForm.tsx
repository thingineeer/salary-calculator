'use client';

import { formatNumber, parseFormattedNumber } from '@/lib/format';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';

interface SalaryFormProps {
  annualSalary: number;
  dependents: number;
  childrenUnder20: number;
  nonTaxableAllowance: number;
  onChange: (field: string, value: number) => void;
}

export default function SalaryForm({
  annualSalary,
  dependents,
  childrenUnder20,
  nonTaxableAllowance,
  onChange,
}: SalaryFormProps) {
  const handleSalaryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFormattedNumber(e.target.value);
    if (raw >= 0 && raw <= 10_000_000_000) {
      onChange('annualSalary', raw);
    }
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('annualSalary', Number(e.target.value));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-5">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        급여 정보 입력
      </h2>

      {/* 연봉 입력 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          연봉 (원)
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={annualSalary > 0 ? formatNumber(annualSalary) : ''}
          onChange={handleSalaryInput}
          placeholder="예: 50,000,000"
          className="w-full px-4 py-3 text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
        />
        <input
          type="range"
          min={20_000_000}
          max={300_000_000}
          step={1_000_000}
          value={annualSalary || 50_000_000}
          onChange={handleSlider}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>2,000만</span>
          <span>3억</span>
        </div>
      </div>

      {/* 부양가족 */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          부양가족 수 (본인 포함)
        </label>
        <select
          value={dependents}
          onChange={(e) => onChange('dependents', Number(e.target.value))}
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}명
            </option>
          ))}
        </select>
      </div>

      {/* 20세 이하 자녀 */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          20세 이하 자녀 수
        </label>
        <select
          value={childrenUnder20}
          onChange={(e) => onChange('childrenUnder20', Number(e.target.value))}
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}명
            </option>
          ))}
        </select>
      </div>

      {/* 비과세 */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          비과세액 (월, 식대 등)
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={formatNumber(nonTaxableAllowance)}
          onChange={(e) =>
            onChange('nonTaxableAllowance', parseFormattedNumber(e.target.value))
          }
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-400">
          기본값: {formatNumber(DEFAULT_NON_TAXABLE_ALLOWANCE)}원 (식대)
        </p>
      </div>
    </div>
  );
}
