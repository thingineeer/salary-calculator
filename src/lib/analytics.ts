// GA4 Measurement ID
export const GA_MEASUREMENT_ID = 'G-B7WKMPWCD3';

// GA4 이벤트 전송 헬퍼
export const sendGAEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// ============================================
// 커스텀 이벤트 함수들 (데이터 기반 의사결정용)
// ============================================

/**
 * 연봉 계산 이벤트
 * - 어떤 연봉 구간의 사용자가 많은지 파악
 * - 비과세/부양가족 설정 패턴 분석
 */
export const trackSalaryCalculation = (params: {
  annualSalary: number;
  dependents: number;
  childrenUnder20: number;
  nonTaxableAllowance: number;
  netSalary: number;
}) => {
  const salaryRange = getSalaryRange(params.annualSalary);
  sendGAEvent('salary_calculated', {
    salary_range: salaryRange,
    annual_salary: params.annualSalary,
    dependents: params.dependents,
    children_under_20: params.childrenUnder20,
    non_taxable_allowance: params.nonTaxableAllowance,
    net_monthly_salary: params.netSalary,
  });
};

/**
 * 폼 상호작용 이벤트
 * - 어떤 입력 필드를 가장 많이 조작하는지
 * - 슬라이더 vs 직접입력 선호도
 */
export const trackFormInteraction = (params: {
  field: string;
  inputMethod: 'slider' | 'direct_input' | 'stepper';
  value: number;
}) => {
  sendGAEvent('form_interaction', {
    field_name: params.field,
    input_method: params.inputMethod,
    field_value: params.value,
  });
};

/**
 * FAQ 클릭 이벤트
 * - 어떤 FAQ가 가장 많이 열리는지 -> 콘텐츠 우선순위 결정
 */
export const trackFAQClick = (params: {
  questionIndex: number;
  questionText: string;
  isOpen: boolean;
}) => {
  sendGAEvent('faq_interaction', {
    question_index: params.questionIndex,
    question_text: params.questionText.substring(0, 100),
    action: params.isOpen ? 'open' : 'close',
  });
};

/**
 * 비교 테이블 조회 이벤트
 * - 테이블까지 스크롤하는 사용자 비율
 */
export const trackTableView = () => {
  sendGAEvent('salary_table_viewed');
};

/**
 * 다크모드 토글 이벤트
 * - 다크모드 선호도 파악
 */
export const trackThemeToggle = (theme: 'dark' | 'light') => {
  sendGAEvent('theme_toggle', {
    theme: theme,
  });
};

/**
 * 스크롤 깊이 이벤트 (25%, 50%, 75%, 100%)
 * - 사용자가 페이지를 얼마나 보는지
 * - 이탈 지점 파악 -> UI 개선
 */
export const trackScrollDepth = (depth: number) => {
  sendGAEvent('scroll_depth', {
    percent_scrolled: depth,
  });
};

/**
 * 외부 링크 클릭 (Footer 등)
 */
export const trackOutboundClick = (url: string, label: string) => {
  sendGAEvent('outbound_click', {
    link_url: url,
    link_label: label,
  });
};

/**
 * 광고 영역 가시성 (향후 AdSense 최적화용)
 */
export const trackAdImpression = (params: {
  adFormat: string;
  adPosition: string;
}) => {
  sendGAEvent('ad_impression', {
    ad_format: params.adFormat,
    ad_position: params.adPosition,
  });
};

/**
 * 공유 이벤트 (향후 공유 기능 추가 시)
 */
export const trackShare = (method: string) => {
  sendGAEvent('share', {
    method: method,
    content_type: 'salary_result',
  });
};

/**
 * 이직 시뮬레이터 사용 이벤트
 * - 사용자가 목표 연봉을 얼마로 설정하는지
 * - 이직 의향 분석 데이터
 */
export const trackJobSimulation = (params: {
  currentSalary: number;
  targetSalary: number;
  increaseRate: number;
  netDiff: number;
}) => {
  sendGAEvent('job_simulation', {
    current_salary_range: getSalaryRange(params.currentSalary),
    target_salary_range: getSalaryRange(params.targetSalary),
    increase_rate: params.increaseRate,
    net_diff: params.netDiff,
  });
};

/**
 * 네비게이션 클릭 이벤트
 * - 사용자가 어떤 페이지로 이동하는지
 */
export const trackNavigation = (destination: string) => {
  sendGAEvent('navigation_click', {
    destination,
  });
};

/**
 * 연봉 백분위 조회 이벤트
 * - 사용자가 자신의 위치에 관심 있는지
 */
export const trackPercentileView = (params: {
  annualSalary: number;
  percentile: number;
}) => {
  sendGAEvent('percentile_viewed', {
    salary_range: getSalaryRange(params.annualSalary),
    percentile: params.percentile,
  });
};

/**
 * 연봉 상세 페이지 클릭 이벤트
 * - 어떤 연봉의 상세 페이지를 가장 많이 보는지
 */
export const trackSalaryDetailClick = (salary: number) => {
  sendGAEvent('salary_detail_click', {
    salary_amount: salary,
    salary_range: getSalaryRange(salary * 10_000),
  });
};

/**
 * 차트 조회 이벤트
 * - 공제 비율 차트까지 보는 사용자 비율
 */
export const trackChartView = () => {
  sendGAEvent('chart_viewed');
};

/**
 * 시뮬레이터 조회 이벤트
 * - 이직 시뮬레이터까지 스크롤하는 비율
 */
export const trackSimulatorView = () => {
  sendGAEvent('simulator_viewed');
};

/**
 * 달러 환산 계산 이벤트
 * - 사용자가 어떤 연봉을 달러로 환산하는지
 * - 환율 변화에 따른 사용 패턴
 */
export const trackDollarCalculation = (params: {
  annualSalary: number;
  currentRate: number;
  pastRate: number;
  annualUSD: number;
  monthlyNetUSD: number;
}) => {
  sendGAEvent('dollar_calculated', {
    salary_range: getSalaryRange(params.annualSalary),
    current_rate: params.currentRate,
    past_rate: params.pastRate,
    annual_usd: Math.round(params.annualUSD),
    monthly_net_usd: Math.round(params.monthlyNetUSD),
  });
};

/**
 * 환율 프리셋 선택 이벤트
 * - 사용자가 미리 설정된 환율을 사용하는지
 * - 직접입력 vs 프리셋 선호도
 */
export const trackExchangeRatePreset = (preset: string) => {
  sendGAEvent('exchange_preset_selected', {
    preset_type: preset,
  });
};

/**
 * 다중 통화 조회 이벤트
 * - 사용자가 여러 통화로 비교하는지
 */
export const trackCurrencyView = () => {
  sendGAEvent('multi_currency_viewed');
};

/**
 * 환율 차트 조회 이벤트
 * - 사용자가 시간대별 환율 변화를 보는지
 */
export const trackExchangeChartView = (period: string) => {
  sendGAEvent('exchange_chart_viewed', {
    chart_period: period,
  });
};

/**
 * 달러 FAQ 클릭 이벤트
 * - 어떤 달러 관련 FAQ가 가장 많이 열리는지
 */
export const trackDollarFAQClick = (params: {
  questionIndex: number;
  questionText: string;
  isOpen: boolean;
}) => {
  sendGAEvent('dollar_faq_interaction', {
    question_index: params.questionIndex,
    question_text: params.questionText.substring(0, 100),
    action: params.isOpen ? 'open' : 'close',
  });
};

// ============================================
// 유틸리티 함수
// ============================================

function getSalaryRange(salary: number): string {
  if (salary < 30_000_000) return 'under_3000';
  if (salary < 40_000_000) return '3000_4000';
  if (salary < 50_000_000) return '4000_5000';
  if (salary < 60_000_000) return '5000_6000';
  if (salary < 70_000_000) return '6000_7000';
  if (salary < 80_000_000) return '7000_8000';
  if (salary < 100_000_000) return '8000_1억';
  return 'over_1억';
}
