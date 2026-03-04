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
  selectedPreset: string;
  onSalaryChange: (field: string, value: number) => void;
  onCurrentRateChange: (rate: number) => void;
  onPastRateChange: (rate: number) => void;
  onPresetChange: (preset: string) => void;
}

const MAX_SALARY = 1_000_000_000;
const MIN_SALARY = 0;
const SLIDER_MIN = 20_000_000;
const SLIDER_MAX = 300_000_000;

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
  selectedPreset,
  onSalaryChange,
  onCurrentRateChange,
  onPastRateChange,
  onPresetChange,
}: ExchangeRateFormProps) {
  const salaryWarning =
    annualSalary > MAX_SALARY
      ? '최대 10억원까지 입력 가능합니다.'
      : annualSalary > 0 && annualSalary < 1_000_000
        ? '연봉을 정확히 입력해 주세요. (예: 50,000,000)'
        : null;

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

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onSalaryChange('annualSalary', value);
    trackFormInteraction({ field: 'annualSalary', inputMethod: 'slider', value });
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
        급여 정보 입력
      </h2>

      {/* 급여 정보 섹션 */}
      <div className="space-y-5">

        {/* 연봉 입력 */}
        <div className="space-y-2">
          <label
            htmlFor="salary-input"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            연봉 (원)
          </label>
          <input
            id="salary-input"
            type="text"
            inputMode="numeric"
            value={annualSalary > 0 ? formatNumber(annualSalary) : ''}
            onChange={handleSalaryInput}
            placeholder="예: 50,000,000…"
            aria-describedby="salary-hint salary-warning"
            className="w-full px-4 py-3 text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition"
          />
          {salaryWarning ? (
            <p id="salary-warning" className="text-xs text-amber-500" role="alert">
              {salaryWarning}
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
              className="w-full accent-blue-600 touch-action-manipulation"
            />
            <div id="salary-hint" className="flex justify-between text-xs text-gray-400">
              <span>2,000만</span>
              <span>3억</span>
            </div>
          </div>
        </div>

        {/* 부양가족 */}
        <div className="space-y-1 mb-5">
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
        <div className="space-y-1 mb-5">
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
            예: 100,000원 (월 100,000원 × 12개월 = 연 1,200,000원)
          </p>
        </div>
      </div>

      {/* 환율 정보 섹션 */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          기준 환율
        </h2>

        {/* 현재 환율 */}
        <div className="space-y-2 mb-6">
          <label
            htmlFor="current-rate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            현재 환율
          </label>
          <input
            id="current-rate"
            type="text"
            inputMode="numeric"
            value={currentRate > 0 ? formatNumber(currentRate) : ''}
            onChange={handleCurrentRateInput}
            placeholder="1,380"
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          />
          <p className="text-xs text-gray-400">
            현재 환율: {currentRate > 0 ? formatNumber(currentRate) : '미설정'} 원/USD (2026.03.03 기준)
          </p>
        </div>

        {/* 과거 환율 비교 */}
        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-4">
          과거 환율 비교
        </h3>

        {/* 과거 환율 라디오 선택 */}
        <div className="space-y-3">
          {/* 1년 전 */}
          <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${selectedPreset === 'oneYearAgo' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            <input
              type="radio"
              name="exchange-rate-preset"
              value="oneYearAgo"
              checked={selectedPreset === 'oneYearAgo'}
              onChange={(e) => handlePresetRadioChange(e.target.value)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
              {RATE_PRESETS.oneYearAgo.label}
            </span>
            {selectedPreset === 'oneYearAgo' && pastRate > 0 && (
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{formatNumber(pastRate)}원</span>
            )}
          </label>

          {/* 3년 전 */}
          <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${selectedPreset === 'threeYearsAgo' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            <input
              type="radio"
              name="exchange-rate-preset"
              value="threeYearsAgo"
              checked={selectedPreset === 'threeYearsAgo'}
              onChange={(e) => handlePresetRadioChange(e.target.value)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
              {RATE_PRESETS.threeYearsAgo.label}
            </span>
            {selectedPreset === 'threeYearsAgo' && pastRate > 0 && (
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{formatNumber(pastRate)}원</span>
            )}
          </label>

          {/* 5년 전 */}
          <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${selectedPreset === 'fiveYearsAgo' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            <input
              type="radio"
              name="exchange-rate-preset"
              value="fiveYearsAgo"
              checked={selectedPreset === 'fiveYearsAgo'}
              onChange={(e) => handlePresetRadioChange(e.target.value)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">
              {RATE_PRESETS.fiveYearsAgo.label}
            </span>
            {selectedPreset === 'fiveYearsAgo' && pastRate > 0 && (
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{formatNumber(pastRate)}원</span>
            )}
          </label>

          {/* 직접 입력 */}
          <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition ${selectedPreset === 'custom' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            <input
              type="radio"
              name="exchange-rate-preset"
              value="custom"
              checked={selectedPreset === 'custom'}
              onChange={(e) => handlePresetRadioChange(e.target.value)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">직접 입력</span>
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
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-600 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">원/USD</span>
          </label>
        </div>
      </div>
    </div>
  );
}
