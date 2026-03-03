'use client';

import { useState } from 'react';
import AdBanner from '@/components/AdBanner';
import { trackFAQClick } from '@/lib/analytics';

const faqs = [
  {
    question: '4대보험이란 무엇인가요?',
    answer:
      '4대보험은 국민연금, 건강보험, 장기요양보험, 고용보험을 말합니다. 근로자와 사업주가 각각 일정 비율을 부담하며, 본 계산기는 근로자 부담분만 계산합니다. 2026년 기준 근로자 부담 합계는 약 8.99%입니다.',
  },
  {
    question: '비과세 식대란 무엇인가요?',
    answer:
      '비과세 식대는 근로자에게 지급되는 식사 관련 수당 중 월 20만원까지 소득세가 과세되지 않는 금액입니다. 대부분의 회사에서 식대 명목으로 월 20만원을 비과세로 처리합니다.',
  },
  {
    question: '연봉과 월급의 차이는 무엇인가요?',
    answer:
      '연봉은 1년간 받는 총 급여이고, 월급은 연봉을 12로 나눈 금액입니다. 일부 회사는 연봉 외에 별도 상여금(성과급)을 지급하기도 합니다. 본 계산기는 연봉 ÷ 12 = 월 급여로 계산합니다.',
  },
  {
    question: '실수령액은 어떻게 계산되나요?',
    answer:
      '실수령액 = 월 급여(세전) - 4대보험(국민연금 + 건강보험 + 장기요양보험 + 고용보험) - 소득세 - 지방소득세입니다. 4대보험은 비과세 금액을 제외한 과세 대상 소득에 각 보험 요율을 곱하여 산출합니다.',
  },
  {
    question: '연말정산으로 환급받을 수 있나요?',
    answer:
      '매월 급여에서 원천징수되는 소득세는 간이세액표에 의한 추정치입니다. 연말정산을 통해 실제 세금을 정산하므로, 공제 항목(의료비, 교육비, 기부금, 신용카드 등)에 따라 환급받거나 추가 납부할 수 있습니다.',
  },
  {
    question: '국민연금에 상한액이 있나요?',
    answer:
      '네, 국민연금은 소득월액 상한이 있습니다. 2026년 기준 상한 소득월액은 약 590만원으로, 월 소득이 이를 초과하더라도 590만원 기준으로 보험료가 산정됩니다.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        자주 묻는 질문
      </h2>
      <dl className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <dt>
                <button
                  onClick={() => {
                    const isOpening = openIndex !== idx;
                    setOpenIndex(isOpening ? idx : null);
                    trackFAQClick({ questionIndex: idx, questionText: faq.question, isOpen: isOpening });
                  }}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {faq.question}
                  </span>
                  <span className="text-gray-400 text-lg leading-none">
                    {openIndex === idx ? '−' : '+'}
                  </span>
                </button>
              </dt>
              {openIndex === idx && (
                <dd
                  id={`faq-answer-${idx}`}
                  className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {faq.answer}
                </dd>
              )}
            </div>
            {idx === 2 && (
              <div className="my-2">
                <AdBanner format="fluid" layout="in-article" className="w-full" />
              </div>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}

export { faqs };
