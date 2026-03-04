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

// 2015~2026년 월별 평균 USD/KRW 환율 (정적 데이터)
export const HISTORICAL_RATES: Record<string, HistoricalRateData> = {
  '2015': {
    '1': 1099, '2': 1082, '3': 1084, '4': 1084, '5': 1089, '6': 1095,
    '7': 1112, '8': 1121, '9': 1150, '10': 1173, '11': 1191, '12': 1202,
  },
  '2016': {
    '1': 1230, '2': 1219, '3': 1206, '4': 1180, '5': 1139, '6': 1130,
    '7': 1131, '8': 1140, '9': 1138, '10': 1120, '11': 1108, '12': 1104,
  },
  '2017': {
    '1': 1108, '2': 1109, '3': 1098, '4': 1074, '5': 1073, '6': 1090,
    '7': 1110, '8': 1140, '9': 1146, '10': 1127, '11': 1110, '12': 1113,
  },
  '2018': {
    '1': 1102, '2': 1088, '3': 1078, '4': 1076, '5': 1067, '6': 1070,
    '7': 1104, '8': 1168, '9': 1172, '10': 1163, '11': 1118, '12': 1115,
  },
  '2019': {
    '1': 1115, '2': 1119, '3': 1119, '4': 1165, '5': 1180, '6': 1184,
    '7': 1213, '8': 1214, '9': 1223, '10': 1196, '11': 1173, '12': 1156,
  },
  '2020': {
    '1': 1160, '2': 1142, '3': 1175, '4': 1196, '5': 1201, '6': 1193,
    '7': 1188, '8': 1190, '9': 1153, '10': 1140, '11': 1110, '12': 1086,
  },
  '2021': {
    '1': 1084, '2': 1110, '3': 1116, '4': 1128, '5': 1132, '6': 1152,
    '7': 1162, '8': 1170, '9': 1177, '10': 1192, '11': 1186, '12': 1187,
  },
  '2022': {
    '1': 1199, '2': 1201, '3': 1233, '4': 1245, '5': 1255, '6': 1282,
    '7': 1305, '8': 1309, '9': 1330, '10': 1413, '11': 1419, '12': 1308,
  },
  '2023': {
    '1': 1299, '2': 1300, '3': 1307, '4': 1306, '5': 1290, '6': 1301,
    '7': 1305, '8': 1306, '9': 1310, '10': 1310, '11': 1308, '12': 1290,
  },
  '2024': {
    '1': 1308, '2': 1325, '3': 1343, '4': 1355, '5': 1375, '6': 1410,
    '7': 1425, '8': 1430, '9': 1430, '10': 1380, '11': 1340, '12': 1350,
  },
  '2025': {
    '1': 1365, '2': 1380, '3': 1375, '4': 1370, '5': 1385, '6': 1395,
    '7': 1410, '8': 1415, '9': 1420, '10': 1425, '11': 1430, '12': 1435,
  },
  '2026': {
    '1': 1420, '2': 1415, '3': 1410,
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
