'use client';

import { formatNumber } from '@/lib/format';

interface MultiCurrencyTableProps {
  netSalary: number;
  currentRate: number;
}

export default function MultiCurrencyTable({
  netSalary,
  currentRate,
}: MultiCurrencyTableProps) {
  // 주요 통화 환율 (KRW 기준, 표본 데이터)
  const currencies = [
    { code: 'USD', name: '미국 달러', rate: currentRate },
    { code: 'EUR', name: '유로', rate: Math.round(currentRate * 1.08) },
    { code: 'JPY', name: '일본 엔', rate: Math.round(currentRate * 0.0085 * 100) / 100 },
    { code: 'GBP', name: '영국 파운드', rate: Math.round(currentRate * 1.25) },
    { code: 'CNY', name: '중국 위안', rate: Math.round(currentRate * 0.14 * 100) / 100 },
    { code: 'HKD', name: '홍콩 달러', rate: Math.round(currentRate * 0.13 * 100) / 100 },
    { code: 'SGD', name: '싱가포르 달러', rate: Math.round(currentRate * 0.75) },
    { code: 'AUD', name: '호주 달러', rate: Math.round(currentRate * 0.65) },
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
                환율 (1 = KRW)
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                월 실수령액
              </th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => {
              const converted = Math.floor(netSalary / currency.rate * 100) / 100;
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
                    {formatNumber(Math.round(currency.rate))}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-blue-600 dark:text-blue-400">
                    {currency.code === 'JPY'
                      ? formatNumber(Math.floor(converted))
                      : converted.toFixed(2)}
                    {currency.code !== 'JPY' && <span className="text-xs">{currency.code}</span>}
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
