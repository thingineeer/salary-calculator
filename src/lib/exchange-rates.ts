export interface ExchangeRate {
  currency: string;
  rate: number;
  symbol: string;
  flag: string;
  name: string;
}

export interface HistoricalRateData {
  [key: string]: number;
}

// 2015~2026년 월별 평균 USD/KRW 환율 (ECB/Frankfurter 기준 실제 데이터)
export const HISTORICAL_RATES: Record<string, HistoricalRateData> = {
  '2015': {
    '1': 1089, '2': 1102, '3': 1113, '4': 1086, '5': 1094, '6': 1114,
    '7': 1147, '8': 1179, '9': 1185, '10': 1145, '11': 1154, '12': 1171,
  },
  '2016': {
    '1': 1204, '2': 1217, '3': 1185, '4': 1147, '5': 1175, '6': 1167,
    '7': 1142, '8': 1111, '9': 1110, '10': 1127, '11': 1164, '12': 1184,
  },
  '2017': {
    '1': 1182, '2': 1142, '3': 1134, '4': 1134, '5': 1126, '6': 1132,
    '7': 1134, '8': 1132, '9': 1132, '10': 1132, '11': 1101, '12': 1090,
  },
  '2018': {
    '1': 1066, '2': 1078, '3': 1072, '4': 1070, '5': 1077, '6': 1094,
    '7': 1124, '8': 1122, '9': 1120, '10': 1132, '11': 1127, '12': 1120,
  },
  '2019': {
    '1': 1122, '2': 1123, '3': 1132, '4': 1143, '5': 1185, '6': 1174,
    '7': 1177, '8': 1211, '9': 1195, '10': 1184, '11': 1168, '12': 1173,
  },
  '2020': {
    '1': 1168, '2': 1195, '3': 1219, '4': 1223, '5': 1230, '6': 1207,
    '7': 1199, '8': 1187, '9': 1178, '10': 1144, '11': 1115, '12': 1098,
  },
  '2021': {
    '1': 1100, '2': 1112, '3': 1131, '4': 1117, '5': 1123, '6': 1123,
    '7': 1146, '8': 1161, '9': 1173, '10': 1182, '11': 1184, '12': 1180,
  },
  '2022': {
    '1': 1196, '2': 1198, '3': 1221, '4': 1237, '5': 1267, '6': 1279,
    '7': 1309, '8': 1321, '9': 1395, '10': 1428, '11': 1358, '12': 1290,
  },
  '2023': {
    '1': 1246, '2': 1278, '3': 1306, '4': 1324, '5': 1327, '6': 1297,
    '7': 1284, '8': 1323, '9': 1333, '10': 1351, '11': 1307, '12': 1303,
  },
  '2024': {
    '1': 1327, '2': 1332, '3': 1332, '4': 1370, '5': 1364, '6': 1381,
    '7': 1383, '8': 1352, '9': 1332, '10': 1362, '11': 1394, '12': 1431,
  },
  '2025': {
    '1': 1452, '2': 1445, '3': 1459, '4': 1443, '5': 1389, '6': 1366,
    '7': 1378, '8': 1390, '9': 1393, '10': 1424, '11': 1460, '12': 1467,
  },
  '2026': {
    '1': 1457, '2': 1448, '3': 1470,
  },
};

// 주요 통화 현재 환율 (2026년 3월 기준)
export const CURRENCY_RATES: ExchangeRate[] = [
  {
    currency: 'USD',
    rate: 1410,
    symbol: '$',
    flag: '🇺🇸',
    name: '미국 달러',
  },
  {
    currency: 'EUR',
    rate: 1485,
    symbol: '€',
    flag: '🇪🇺',
    name: '유로',
  },
  {
    currency: 'JPY',
    rate: 9.5,
    symbol: '¥',
    flag: '🇯🇵',
    name: '일본 엔',
  },
  {
    currency: 'GBP',
    rate: 1750,
    symbol: '£',
    flag: '🇬🇧',
    name: '영국 파운드',
  },
  {
    currency: 'CNY',
    rate: 195,
    symbol: '¥',
    flag: '🇨🇳',
    name: '중국 위안',
  },
];

/**
 * 현재 환율 조회 (정적 폴백)
 * @returns 주요 통화 환율 배열
 */
export function getCurrentRates(): ExchangeRate[] {
  return CURRENCY_RATES;
}

/**
 * 특정 통화의 현재 환율 조회
 * @param currency 통화 코드 (USD, EUR, JPY, GBP, CNY)
 * @returns 환율 객체 또는 undefined
 */
export function getCurrentRate(currency: string): ExchangeRate | undefined {
  return CURRENCY_RATES.find((rate) => rate.currency === currency);
}

/**
 * 과거 환율 조회
 * @param year 연도
 * @param month 월 (1~12)
 * @returns USD/KRW 환율
 */
export function getHistoricalRate(year: number, month: number): number | null {
  const yearData = HISTORICAL_RATES[year.toString()];
  if (!yearData) {
    return null;
  }

  const monthKey = month.toString();
  const rate = yearData[monthKey];

  if (rate === undefined) {
    return null;
  }

  return rate;
}

/**
 * 환율 API를 통한 실시간 환율 조회 (선택적)
 * 외부 API 호출 실패 시 정적 데이터 반환
 * @param currency 통화 코드
 * @returns 환율 객체
 */
export async function fetchCurrentRate(
  currency: string = 'USD'
): Promise<ExchangeRate | null> {
  try {
    // ExchangeRate-API 사용 (무료, 월 1,500 요청)
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/KRW`
    );

    if (!response.ok) {
      throw new Error('API 호출 실패');
    }

    const data = await response.json();
    const rate = data.rates[currency];

    if (!rate) {
      // 폴백: 정적 데이터에서 조회
      return getCurrentRate(currency) || null;
    }

    // API 응답을 기반으로 KRW 역산
    const krwRate = 1 / rate;
    const staticRate = getCurrentRate(currency);

    if (!staticRate) {
      return null;
    }

    return {
      ...staticRate,
      rate: Math.round(krwRate * 100) / 100,
    };
  } catch (error) {
    // 에러 시 폴백 반환
    console.warn(`환율 조회 실패: ${error instanceof Error ? error.message : 'Unknown error'}. 정적 데이터를 사용합니다.`);
    return getCurrentRate(currency) || null;
  }
}

/**
 * 선택적: 모든 통화의 현재 환율을 실시간으로 조회
 * @returns 환율 배열
 */
export async function fetchAllCurrentRates(): Promise<ExchangeRate[]> {
  try {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/KRW`
    );

    if (!response.ok) {
      throw new Error('API 호출 실패');
    }

    const data = await response.json();
    const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'CNY'];

    const updatedRates = currencies.map((currency) => {
      const rate = data.rates[currency];
      const krwRate = 1 / rate;
      const staticRate = getCurrentRate(currency);

      if (!staticRate) {
        return null;
      }

      return {
        ...staticRate,
        rate: Math.round(krwRate * 100) / 100,
      };
    });

    return updatedRates.filter((rate): rate is ExchangeRate => rate !== null);
  } catch (error) {
    // 에러 시 정적 데이터 반환
    console.warn(`환율 일괄 조회 실패: ${error instanceof Error ? error.message : 'Unknown error'}. 정적 데이터를 사용합니다.`);
    return getCurrentRates();
  }
}

/**
 * 금액을 외화로 환산
 * @param amountKrw KRW 금액
 * @param currency 통화 코드
 * @param rate 환율
 * @returns 외화 금액
 */
export function convertToForeignCurrency(
  amountKrw: number,
  currency: string,
  rate?: number
): number {
  const exchangeRate = rate || getCurrentRate(currency)?.rate;

  if (!exchangeRate) {
    console.warn(`${currency} 환율을 찾을 수 없습니다.`);
    return 0;
  }

  return Math.round((amountKrw / exchangeRate) * 100) / 100;
}

/**
 * 외화를 KRW로 환산
 * @param amountForeign 외화 금액
 * @param currency 통화 코드
 * @param rate 환율
 * @returns KRW 금액
 */
export function convertToKrw(
  amountForeign: number,
  currency: string,
  rate?: number
): number {
  const exchangeRate = rate || getCurrentRate(currency)?.rate;

  if (!exchangeRate) {
    console.warn(`${currency} 환율을 찾을 수 없습니다.`);
    return 0;
  }

  return Math.round(amountForeign * exchangeRate);
}
