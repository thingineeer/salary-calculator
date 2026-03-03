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
