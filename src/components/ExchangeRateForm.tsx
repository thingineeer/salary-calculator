'use client';

import { formatNumber, parseFormattedNumber } from '@/lib/format';
import { trackFormInteraction, trackExchangeRatePreset } from '@/lib/analytics';

interface ExchangeRateFormProps {
  annualSalary: number;
  dependents: number;
  childrenUnder20: number;
  nonTaxableAllowance: number;
  currentRate: number;
  pastRate: number;
  pastAnnualSalary: number;
  selectedPreset: string;
  onSalaryChange: (field: string, value: number) => void;
  onCurrentRateChange: (rate: number) => void;
  onPastRateChange: (rate: number) => void;
  onPastSalaryChange: (salary: number) => void;
  onPresetChange: (preset: string) => void;
}

const MAX_SALARY = 1_000_000_000;
const MIN_SALARY = 0;

const RATE_PRESETS = {
  oneYearAgo: { label: '1년 전 (2025.03)', months: 12 },
  threeYearsAgo: { label: '3년 전 (2023.03)', months: 36 },
  fiveYearsAgo: { label: '5년 전 (2021.03)', months: 60 },
  custom: { label: '직접 입력', months: 0 },
};

export default function ExchangeRateForm({
  annualSalary,
  dependents,
  childrenUnder20,
  nonTaxableAllowance,
  currentRate,
  pastRate,
  pastAnnualSalary,
  selectedPreset,
  onSalaryChange,
  onCurrentRateChange,
  onPastRateChange,
  onPastSalaryChange,
  onPresetChange,
}: ExchangeRateFormProps) {
  const handleSalaryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFormattedNumber(e.target.value);
    if (isNaN(raw) || raw < MIN_SALARY) {
      onSalaryChange('annualSalary', 0);
      return;
    }
    const value = Math.min(raw, MAX_SALARY);
    onSalaryChange('annualSalary', value);
    trackFormInteraction({ field: 'annualSalary', inputMethod: 'direct_input', value });
  };

  const handlePastSalaryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFormattedNumber(e.target.value);
    if (isNaN(raw) || raw < MIN_SALARY) {
      onPastSalaryChange(0);
      return;
    }
    const value = Math.min(raw, MAX_SALARY);
    onPastSalaryChange(value);
    trackFormInteraction({ field: 'pastAnnualSalary', inputMethod: 'direct_input', value });
  };

  const handleNonTaxable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFormattedNumber(e.target.value);
    if (isNaN(raw) || raw < 0) {
      onSalaryChange('nonTaxableAllowance', 0);
      return;
    }
    const value = Math.min(raw, 1_000_000);
    onSalaryChange('nonTaxableAllowance', value);
    trackFormInteraction({ field: 'nonTaxableAllowance', inputMethod: 'direct_input', value });
  };

  const handlePresetRadioChange = (preset: string) => {
    onPresetChange(preset);
    trackExchangeRatePreset(preset);
  };

  const handleCurrentRateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFormattedNumber(e.target.value);
    if (isNaN(raw) || raw < 0) {
      onCurrentRateChange(0);
      return;
    }
    const value = Math.min(raw, 10_000);
    onCurrentRateChange(value);
    trackFormInteraction({ field: 'currentRate', inputMethod: 'direct_input', value });
  };

  const handlePastRateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFormattedNumber(e.target.value);
    if (isNaN(raw) || raw < 0) {
      onPastRateChange(0);
      return;
    }
    const value = Math.min(raw, 10_000);
    onPastRateChange(value);
    trackFormInteraction({ field: 'pastRate', inputMethod: 'direct_input', value });
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6"
      role="form"
      aria-label="환율 비교 폼"
    >
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        환율 비교 계산기
      </h2>

      {/* 이전/현재 2컬럼 레이아웃 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 이전 상황 */}
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">이전 상황</h3>

          <div className="space-y-1">
            <label
              htmlFor="past-salary-input"
              className="block text-xs font-medium text-gray-600 dark:text-gray-300"
            >
              연봉 (원)
            </label>
            <input
              id="past-salary-input"
              type="text"
              inputMode="numeric"
              value={pastAnnualSalary > 0 ? formatNumber(pastAnnualSalary) : ''}
              onChange={handlePastSalaryInput}
              placeholder="예: 40,000,000"
              aria-label="이전 연봉"
              className="w-full px-3 py-2.5 text-base font-semibold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="past-rate-label"
              className="block text-xs font-medium text-gray-600 dark:text-gray-300"
            >
              환율 (원/USD)
            </label>

            {/* 프리셋 라디오 */}
            <div className="space-y-2">
              {(Object.entries(RATE_PRESETS) as [string, { label: string; months: number }][]).map(
                ([key, preset]) => (
                  <label
                    key={key}
                    className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition text-sm ${
                      selectedPreset === key
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exchange-rate-preset"
                      value={key}
                      checked={selectedPreset === key}
                      onChange={(e) => handlePresetRadioChange(e.target.value)}
                      className="w-3.5 h-3.5 accent-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300 flex-1">{preset.label}</span>
                    {key !== 'custom' && selectedPreset === key && pastRate > 0 && (
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 tabular-nums">
                        {formatNumber(pastRate)}원
                      </span>
                    )}
                    {key === 'custom' && (
                      <input
                        type="text"
                        inputMode="numeric"
                        value={selectedPreset === 'custom' && pastRate > 0 ? formatNumber(pastRate) : ''}
                        onChange={handlePastRateInput}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedPreset !== 'custom') {
                            handlePresetRadioChange('custom');
                          }
                        }}
                        placeholder="1,300"
                        disabled={selectedPreset !== 'custom'}
                        aria-label="이전 환율 직접 입력"
                        className="w-20 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-600 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed tabular-nums"
                      />
                    )}
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* 현재 상황 */}
        <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400">현재 상황</h3>

          <div className="space-y-1">
            <label
              htmlFor="salary-input"
              className="block text-xs font-medium text-gray-600 dark:text-gray-300"
            >
              연봉 (원)
            </label>
            <input
              id="salary-input"
              type="text"
              inputMode="numeric"
              value={annualSalary > 0 ? formatNumber(annualSalary) : ''}
              onChange={handleSalaryInput}
              placeholder="예: 50,000,000"
              aria-label="현재 연봉"
              className="w-full px-3 py-2.5 text-base font-semibold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="current-rate"
              className="block text-xs font-medium text-gray-600 dark:text-gray-300"
            >
              환율 (원/USD)
            </label>
            <input
              id="current-rate"
              type="text"
              inputMode="numeric"
              value={currentRate > 0 ? formatNumber(currentRate) : ''}
              onChange={handleCurrentRateInput}
              placeholder="1,500"
              aria-label="현재 환율"
              className="w-full px-3 py-2.5 text-base font-semibold border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
            />
            <p className="text-xs text-gray-400">
              실시간 자동 반영
            </p>
          </div>
        </div>
      </div>

      {/* 상세 설정 (접기) */}
      <details className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <summary className="cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300 select-none hover:text-blue-600 dark:hover:text-blue-400 transition">
          상세 설정 (부양가족, 비과세 등)
        </summary>
        <div className="mt-4 space-y-4">
          {/* 부양가족 */}
          <div className="space-y-1">
            <label
              htmlFor="dependents-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              부양가족 수 (본인 포함)
            </label>
            <select
              id="dependents-select"
              value={dependents}
              onChange={(e) => {
                const value = Number(e.target.value);
                onSalaryChange('dependents', value);
                trackFormInteraction({ field: 'dependents', inputMethod: 'stepper', value });
              }}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white dark:[color-scheme:dark] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                onSalaryChange('childrenUnder20', value);
                trackFormInteraction({ field: 'childrenUnder20', inputMethod: 'stepper', value });
              }}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white dark:[color-scheme:dark] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}명
                </option>
              ))}
            </select>
          </div>

          {/* 비과세액 */}
          <div className="space-y-1">
            <label
              htmlFor="nontaxable-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              비과세액 (월, 식대 등)
            </label>
            <input
              id="nontaxable-input"
              type="text"
              inputMode="numeric"
              value={formatNumber(nonTaxableAllowance)}
              onChange={handleNonTaxable}
              aria-describedby="nontaxable-hint"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            />
            <p id="nontaxable-hint" className="text-xs text-gray-400">
              예: 100,000원 (월 100,000원 x 12개월 = 연 1,200,000원)
            </p>
          </div>
        </div>
      </details>
    </div>
  );
}
