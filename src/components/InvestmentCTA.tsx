import { formatNumber } from '@/lib/format';

interface InvestmentCTAProps {
  amount: number;      // 연봉 만원 단위
  netSalary: number;   // 월 실수령액 원 단위
}

function getTier(amount: number) {
  if (amount <= 3500) return 'low';
  if (amount <= 6000) return 'mid';
  return 'high';
}

export default function InvestmentCTA({ amount, netSalary }: InvestmentCTAProps) {
  const tier = getTier(amount);

  // 월 투자 제안금 계산
  const ratio = tier === 'low' ? 0.1 : tier === 'mid' ? 0.17 : 0.3;
  const suggestedMonthly = Math.round(netSalary * ratio / 10000) * 10000; // 만원 단위 반올림

  const utmParams = `utm_source=salary-calc&utm_medium=cross-promo&utm_campaign=salary-${amount}`;

  const link =
    tier === 'high'
      ? `https://mysnowball.kr/fire?${utmParams}`
      : `https://mysnowball.kr/simulator?stock=SCHD&monthly=${suggestedMonthly}&years=20&drip=1&${utmParams}`;

  const heading =
    tier === 'low'
      ? '소액이라도 시작하면 복리의 마법'
      : tier === 'mid'
        ? '저축 여력을 배당 투자로'
        : '경제적 자유(FIRE), 시뮬레이션 해보세요';

  const description =
    tier === 'low'
      ? `월 실수령액 ${formatNumber(netSalary)}원 중 약 ${formatNumber(suggestedMonthly)}원만 투자해도, 20년 후 복리 효과를 확인할 수 있습니다.`
      : tier === 'mid'
        ? `월 ${formatNumber(suggestedMonthly)}원씩 배당주에 투자하면 20년 후 얼마가 될까요? 배당 재투자 시뮬레이션으로 확인하세요.`
        : `월 ${formatNumber(suggestedMonthly)}원 투자 시 경제적 자유까지 몇 년이 걸릴까요? FIRE 시뮬레이터로 나만의 은퇴 시나리오를 만들어보세요.`;

  const buttonText =
    tier === 'high' ? 'FIRE 시뮬레이터 체험하기' : '배당금 시뮬레이터로 확인하기';

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 rounded-2xl p-4 sm:p-6 shadow-lg">
      <p className="text-white/80 text-xs font-medium tracking-wide mb-1">
        실수령액 활용 TIP
      </p>
      <h3 className="text-white text-lg font-bold mb-2">
        {heading}
      </h3>
      <p className="text-white/90 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener"
        className="inline-block bg-white text-emerald-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-emerald-50 transition-colors shadow-md"
      >
        {buttonText} &rarr;
      </a>
    </div>
  );
}
