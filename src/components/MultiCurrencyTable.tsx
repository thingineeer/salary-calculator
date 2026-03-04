'use client';

import { formatNumber } from '@/lib/format';

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  displayUnit?: number; // JPY의 경우 100 (100엔 기준 표시)
}

interface MultiCurrencyTableProps {
  netSalary: number;
  currentRate: number;
}

/**
 * 통화 금액을 심볼과 함께 포맷팅합니다.
 * 예: $2,156.48, ¥253,795, CN¥15,403.46
 */
function formatCurrencyAmount(amount: number, currency: CurrencyInfo): string {
  const isWholeNumber = currency.code === 'JPY';
  const integerPart = Math.floor(amount);
  const formattedInteger = integerPart.toLocaleString('ko-KR');

  if (isWholeNumber) {
    return `${currency.symbol}${formattedInteger}`;
  }

  const decimalPart = Math.abs(amount - integerPart).toFixed(2).slice(2);
  return `${currency.symbol}${formattedInteger}.${decimalPart}`;
}

export default function MultiCurrencyTable({
  netSalary,
  currentRate,
}: MultiCurrencyTableProps) {
  // 주요 통화 환율 (KRW 기준, 표본 데이터)
  // rate = 1 외화 단위당 원화 (JPY는 1엔당 원화)
  const currencies: CurrencyInfo[] = [
    { code: 'USD', name: '미국 달러', symbol: '$', rate: currentRate },
    { code: 'EUR', name: '유로', symbol: '\u20AC', rate: Math.round(currentRate * 1.08) },
    { code: 'JPY', name: '일본 엔', symbol: '\u00A5', rate: Math.round(currentRate * 0.0085 * 100) / 100, displayUnit: 100 },
    { code: 'GBP', name: '영국 파운드', symbol: '\u00A3', rate: Math.round(currentRate * 1.25) },
    { code: 'CNY', name: '중국 위안', symbol: 'CN\u00A5', rate: Math.round(currentRate * 0.14 * 100) / 100 },
    { code: 'HKD', name: '홍콩 달러', symbol: 'HK$', rate: Math.round(currentRate * 0.13 * 100) / 100 },
    { code: 'SGD', name: '싱가포르 달러', symbol: 'S$', rate: Math.round(currentRate * 0.75) },
    { code: 'AUD', name: '호주 달러', symbol: 'A$', rate: Math.round(currentRate * 0.65) },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        다중 통화 변환
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        월 실수령액을 다양한 통화로 환산한 금액입니다.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                통화
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                원화 환율
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                월 실수령액
              </th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => {
              const converted = Math.floor(netSalary / currency.rate * 100) / 100;
              // 환율 표시: JPY는 100엔 기준, 나머지는 1단위 기준
              const displayRate = currency.displayUnit
                ? currency.rate * currency.displayUnit
                : currency.rate;

              return (
                <tr
                  key={currency.code}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-gray-800 dark:text-gray-200">
                      {currency.code}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currency.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                    <span>{formatNumber(Math.round(displayRate))}원</span>
                    {currency.displayUnit && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                        ({currency.displayUnit}엔)
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-600 dark:text-blue-400">
                    {formatCurrencyAmount(converted, currency)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        환율은 참고용이며, 실제 환율과 다를 수 있습니다. 정확한 정보는 각 금융기관에 확인하세요.
      </p>
    </div>
  );
}
