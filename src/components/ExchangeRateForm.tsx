'use client';

import { useRef } from 'react';
import { formatNumber, parseFormattedNumber, getAdjustedCursorPosition } from '@/lib/format';
import { trackFormInteraction, trackExchangeRatePreset } from '@/lib/analytics';

interface ExchangeRateFormProps {
  annualSalary: number;
  pastAnnualSalary: number;
  currentRate: number;
  pastRate: number;
  selectedPreset: string;
  onSalaryChange: (salary: number) => void;
  onPastSalaryChange: (salary: number) => void;
  onCurrentRateChange: (rate: number) => void;
  onPastRateChange: (rate: number) => void;
  onPresetChange: (preset: string) => void;
}

const MAX_SALARY = 1_000_000_000;

export default function ExchangeRateForm({
  annualSalary,
  pastAnnualSalary,
  currentRate,
  pastRate,
  selectedPreset,
  onSalaryChange,
  onPastSalaryChange,
  onCurrentRateChange,
  onPastRateChange,
  onPresetChange,
}: ExchangeRateFormProps) {
  const pastSalaryRef = useRef<HTMLInputElement>(null);
  const pastRateRef = useRef<HTMLInputElement>(null);
  const currentSalaryRef = useRef<HTMLInputElement>(null);
  const currentRateRef = useRef<HTMLInputElement>(null);

  const restoreCursor = (
    ref: React.RefObject<HTMLInputElement | null>,
    oldValue: string,
    newFormatted: string,
    oldCursorPos: number
  ) => {
    requestAnimationFrame(() => {
      if (ref.current) {
        const newPos = getAdjustedCursorPosition(oldValue, newFormatted, oldCursorPos);
        ref.current.setSelectionRange(newPos, newPos);
      }
    });
  };

  const parseSalary = (value: string): number => {
    const raw = parseFormattedNumber(value);
    if (isNaN(raw) || raw < 0) return 0;
    return Math.min(raw, MAX_SALARY);
  };

  const parseRate = (value: string): number => {
    const raw = parseFormattedNumber(value);
    if (isNaN(raw) || raw < 0) return 0;
    return Math.min(raw, 10_000);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 sm:p-6 space-y-4 card-hover"
      role="form"
      aria-label="환율 비교 입력"
    >
      {/* 이전 vs 현재 2컬럼 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 이전 */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">이전</h3>

          <div className="space-y-1">
            <label htmlFor="past-salary" className="block text-xs font-medium text-gray-600 dark:text-gray-300">
              연봉
            </label>
            <div className="relative">
              <input
                ref={pastSalaryRef}
                id="past-salary"
                name="past-salary"
                autoComplete="off"
                type="text"
                inputMode="numeric"
                spellCheck={false}
                value={pastAnnualSalary > 0 ? formatNumber(pastAnnualSalary) : ''}
                onChange={(e) => {
                  const oldValue = e.target.value;
                  const oldCursorPos = e.target.selectionStart ?? oldValue.length;
                  const v = parseSalary(oldValue);
                  onPastSalaryChange(v);
                  trackFormInteraction({ field: 'pastAnnualSalary', inputMethod: 'direct_input', value: v });
                  restoreCursor(pastSalaryRef, oldValue, v > 0 ? formatNumber(v) : '', oldCursorPos);
                }}
                placeholder="41,000,000"
                className="w-full px-3 py-2.5 pr-8 text-base font-semibold border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors tabular-nums"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">원</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">
              당시 환율
            </label>
            {/* 프리셋 버튼 */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: 'oneYearAgo', label: '1년 전' },
                { key: 'threeYearsAgo', label: '3년 전' },
                { key: 'fiveYearsAgo', label: '5년 전' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onPresetChange(key);
                    trackExchangeRatePreset(key);
                  }}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                    selectedPreset === key
                      ? 'border-blue-500 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-400 font-semibold'
                      : 'border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                ref={pastRateRef}
                id="past-rate"
                name="past-rate"
                autoComplete="off"
                type="text"
                inputMode="numeric"
                spellCheck={false}
                value={pastRate > 0 ? formatNumber(pastRate) : ''}
                onChange={(e) => {
                  const oldValue = e.target.value;
                  const oldCursorPos = e.target.selectionStart ?? oldValue.length;
                  const v = parseRate(oldValue);
                  onPastRateChange(v);
                  onPresetChange('custom');
                  trackFormInteraction({ field: 'pastRate', inputMethod: 'direct_input', value: v });
                  restoreCursor(pastRateRef, oldValue, v > 0 ? formatNumber(v) : '', oldCursorPos);
                }}
                placeholder="1,380"
                className="w-full px-3 py-2.5 pr-16 text-base font-semibold border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors tabular-nums"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">원/USD</span>
            </div>
          </div>
        </div>

        {/* 현재 */}
        <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">현재</h3>

          <div className="space-y-1">
            <label htmlFor="current-salary" className="block text-xs font-medium text-gray-600 dark:text-gray-300">
              연봉
            </label>
            <div className="relative">
              <input
                ref={currentSalaryRef}
                id="current-salary"
                name="current-salary"
                autoComplete="off"
                type="text"
                inputMode="numeric"
                spellCheck={false}
                value={annualSalary > 0 ? formatNumber(annualSalary) : ''}
                onChange={(e) => {
                  const oldValue = e.target.value;
                  const oldCursorPos = e.target.selectionStart ?? oldValue.length;
                  const v = parseSalary(oldValue);
                  onSalaryChange(v);
                  trackFormInteraction({ field: 'annualSalary', inputMethod: 'direct_input', value: v });
                  restoreCursor(currentSalaryRef, oldValue, v > 0 ? formatNumber(v) : '', oldCursorPos);
                }}
                placeholder="45,000,000"
                className="w-full px-3 py-2.5 pr-8 text-base font-semibold border border-blue-300 dark:border-blue-600 rounded-lg dark:bg-gray-700 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors tabular-nums"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">원</span>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="current-rate" className="block text-xs font-medium text-gray-600 dark:text-gray-300">
              현재 환율
            </label>
            <div className="relative">
              <input
                ref={currentRateRef}
                id="current-rate"
                name="current-rate"
                autoComplete="off"
                type="text"
                inputMode="numeric"
                spellCheck={false}
                value={currentRate > 0 ? formatNumber(currentRate) : ''}
                onChange={(e) => {
                  const oldValue = e.target.value;
                  const oldCursorPos = e.target.selectionStart ?? oldValue.length;
                  const v = parseRate(oldValue);
                  onCurrentRateChange(v);
                  trackFormInteraction({ field: 'currentRate', inputMethod: 'direct_input', value: v });
                  restoreCursor(currentRateRef, oldValue, v > 0 ? formatNumber(v) : '', oldCursorPos);
                }}
                placeholder="1,500"
                className="w-full px-3 py-2.5 pr-16 text-base font-semibold border border-blue-300 dark:border-blue-600 rounded-lg dark:bg-gray-700 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors tabular-nums"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">원/USD</span>
            </div>
            <p className="text-xs text-blue-500 dark:text-blue-400">최신 환율 자동 반영 · 직접 수정 가능</p>
          </div>
        </div>
      </div>
    </div>
  );
}
