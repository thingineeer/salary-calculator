'use client';

import { useRef } from 'react';
import { formatNumber, parseFormattedNumber, getAdjustedCursorPosition } from '@/lib/format';
import { DEFAULT_NON_TAXABLE_ALLOWANCE } from '@/lib/constants';
import { trackFormInteraction } from '@/lib/analytics';

interface SalaryFormProps {
  annualSalary: number;
  dependents: number;
  childrenUnder20: number;
  nonTaxableAllowance: number;
  onChange: (field: string, value: number) => void;
}

const MAX_SALARY = 1_000_000_000; // 10억
const MIN_SALARY = 0;
const SLIDER_MIN = 20_000_000;
const SLIDER_MAX = 300_000_000;

export default function SalaryForm({
  annualSalary,
  dependents,
  childrenUnder20,
  nonTaxableAllowance,
  onChange,
}: SalaryFormProps) {
  const salaryInputRef = useRef<HTMLInputElement>(null);
  const nonTaxableInputRef = useRef<HTMLInputElement>(null);

  const salaryWarning =
    annualSalary > MAX_SALARY
      ? '최대 10억원까지 입력 가능합니다.'
      : annualSalary > 0 && annualSalary < 1_000_000
        ? '연봉을 정확히 입력해 주세요. (예: 50,000,000)'
        : null;

  const handleSalaryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oldValue = e.target.value;
    const oldCursorPos = e.target.selectionStart ?? oldValue.length;
    const raw = parseFormattedNumber(oldValue);
    if (isNaN(raw) || raw < MIN_SALARY) {
      onChange('annualSalary', 0);
      return;
    }
    const value = Math.min(raw, MAX_SALARY);
    onChange('annualSalary', value);
    trackFormInteraction({ field: 'annualSalary', inputMethod: 'direct_input', value });

    const newFormatted = value > 0 ? formatNumber(value) : '';
    requestAnimationFrame(() => {
      if (salaryInputRef.current) {
        const newPos = getAdjustedCursorPosition(oldValue, newFormatted, oldCursorPos);
        salaryInputRef.current.setSelectionRange(newPos, newPos);
      }
    });
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onChange('annualSalary', value);
    trackFormInteraction({ field: 'annualSalary', inputMethod: 'slider', value });
  };

  const handleNonTaxable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oldValue = e.target.value;
    const oldCursorPos = e.target.selectionStart ?? oldValue.length;
    const raw = parseFormattedNumber(oldValue);
    if (isNaN(raw) || raw < 0) {
      onChange('nonTaxableAllowance', 0);
      return;
    }
    const value = Math.min(raw, 1_000_000);
    onChange('nonTaxableAllowance', value);
    trackFormInteraction({ field: 'nonTaxableAllowance', inputMethod: 'direct_input', value });

    const newFormatted = formatNumber(value);
    requestAnimationFrame(() => {
      if (nonTaxableInputRef.current) {
        const newPos = getAdjustedCursorPosition(oldValue, newFormatted, oldCursorPos);
        nonTaxableInputRef.current.setSelectionRange(newPos, newPos);
      }
    });
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-5 card-hover"
      role="form"
      aria-label="급여 정보 입력 폼"
    >
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        급여 정보 입력
      </h2>

      {/* 연봉 입력 */}
      <div className="space-y-2">
        <label
          htmlFor="salary-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          연봉 (원)
        </label>
        <input
          ref={salaryInputRef}
          id="salary-input"
          type="text"
          inputMode="numeric"
          value={annualSalary > 0 ? formatNumber(annualSalary) : ''}
          onChange={handleSalaryInput}
          spellCheck={false}
          autoComplete="off"
          placeholder="예: 50,000,000\u2026"
          aria-describedby="salary-hint salary-warning"
          className="w-full px-4 py-3 text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
        />
        {salaryWarning ? (
          <p id="salary-warning" className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg" role="alert">
            ⚠ {salaryWarning}
          </p>
        ) : null}
        <label htmlFor="salary-slider" className="sr-only">
          연봉 슬라이더
        </label>
        <div className="space-y-1">
          <div className="text-center text-xs font-medium text-blue-600 dark:text-blue-400">
            {formatNumber(Math.max(SLIDER_MIN, Math.min(annualSalary || SLIDER_MIN, SLIDER_MAX)))}원
          </div>
          <input
            id="salary-slider"
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={1_000_000}
            value={Math.max(SLIDER_MIN, Math.min(annualSalary || SLIDER_MIN, SLIDER_MAX))}
            onChange={handleSlider}
            aria-label="연봉 범위 슬라이더"
            className="w-full accent-blue-600 touch-manipulation"
          />
          <div id="salary-hint" className="flex justify-between text-xs text-gray-400">
            <span>2,000만</span>
            <span>3억</span>
          </div>
        </div>
      </div>

      {/* 부양가족 */}
      <div className="space-y-1">
        <label
          htmlFor="dependents-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          부양가족 수 (본인 포함)
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          배우자, 20세 이하 자녀 등을 포함한 수입니다
        </p>
        <select
          id="dependents-select"
          value={dependents}
          onChange={(e) => {
            const value = Number(e.target.value);
            onChange('dependents', value);
            trackFormInteraction({ field: 'dependents', inputMethod: 'stepper', value });
          }}
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white dark:[color-scheme:dark] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
        <label
          htmlFor="children-select"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          20세 이하 자녀 수
        </label>
        <select
          id="children-select"
          value={childrenUnder20}
          onChange={(e) => {
            const value = Number(e.target.value);
            onChange('childrenUnder20', value);
            trackFormInteraction({ field: 'childrenUnder20', inputMethod: 'stepper', value });
          }}
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white dark:[color-scheme:dark] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
        <label
          htmlFor="nontaxable-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          비과세액 (월, 식대 등)
        </label>
        <input
          ref={nonTaxableInputRef}
          id="nontaxable-input"
          type="text"
          inputMode="numeric"
          value={formatNumber(nonTaxableAllowance)}
          onChange={handleNonTaxable}
          aria-describedby="nontaxable-hint"
          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        />
        <p id="nontaxable-hint" className="text-xs text-gray-400">
          기본값: {formatNumber(DEFAULT_NON_TAXABLE_ALLOWANCE)}원 (식대)
        </p>
      </div>
    </div>
  );
}
