'use client';

import { useState } from 'react';
import { trackDollarFAQClick } from '@/lib/analytics';
import { ChevronDownIcon } from '@/components/icons';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: '환율 환산은 어떻게 계산되나요?',
    answer:
      '환율 환산은 월 실수령액(세금과 4대보험 공제 후의 금액)을 선택한 환율로 나누어 계산합니다. 예를 들어, 월 실수령액이 300만원이고 환율이 1,200원/달러라면 약 2,500달러가 됩니다.',
  },
  {
    id: 'faq-2',
    question: '현재 환율과 비교 환율의 차이는?',
    answer:
      '현재 환율은 오늘의 환율로 현재 급여를 달러로 얼마나 받을 수 있는지 보여줍니다. 비교 환율은 과거의 환율로 설정하여 환율 변동에 따른 달러 가치 변화를 비교할 수 있습니다.',
  },
  {
    id: 'faq-3',
    question: '환율은 어디서 가져온 것인가요?',
    answer:
      '현재 환율은 페이지 접속 시 실시간 API(open.er-api.com)에서 자동으로 가져옵니다. 다만 참고용이므로, 실제 국제 송금이나 환전이 필요하다면 한국은행, 각 은행, 또는 외환 전문 업체의 최신 고시환율을 확인하세요.',
  },
  {
    id: 'faq-4',
    question: '왜 환율 변동이 급여에 중요한가요?',
    answer:
      '해외 송금, 국제 거래, 또는 달러 기준 자산을 관리할 때 환율은 매우 중요합니다. 환율이 오르면 같은 금액의 달러를 얻기 위해 더 많은 원화가 필요합니다.',
  },
  {
    id: 'faq-5',
    question: '여러 통화로 변환할 수 있나요?',
    answer:
      '네, 다중 통화 변환 표에서 달러, 유로, 일본 엔, 파운드 등 주요 통화로 환산한 금액을 확인할 수 있습니다. 모두 월 실수령액을 기준으로 계산됩니다.',
  },
  {
    id: 'faq-6',
    question: '세금이 공제된 후의 금액으로 계산되나요?',
    answer:
      '예, 환율 환산은 4대보험과 소득세, 지방소득세를 모두 공제한 월 실수령액을 기준으로 합니다. 세전 급여가 아닌 실제 받는 금액으로 계산되므로 더 정확합니다.',
  },
];

export default function DollarFAQ() {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggleQuestion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      const isOpen = next.has(id);
      if (isOpen) {
        next.delete(id);
      } else {
        next.add(id);
      }
      trackDollarFAQClick({
        questionIndex: faqItems.findIndex((item) => item.id === id),
        questionText: faqItems.find((item) => item.id === id)?.question || '',
        isOpen: !isOpen,
      });
      return next;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        자주 묻는 질문
      </h3>
      <div className="space-y-2">
        {faqItems.map((item) => (
          <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleQuestion(item.id)}
              className="w-full px-4 py-3 text-left font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition flex items-center justify-between focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl"
              aria-expanded={openIds.has(item.id)}
              aria-controls={`${item.id}-content`}
            >
              <span className="font-semibold">{item.question}</span>
              <span className={`transition-transform ${openIds.has(item.id) ? 'rotate-180' : ''}`}>
                <ChevronDownIcon size={20} />
              </span>
            </button>
            {openIds.has(item.id) && (
              <div
                id={`${item.id}-content`}
                className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
