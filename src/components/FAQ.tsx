'use client';

import { useState } from 'react';
import { trackFAQClick } from '@/lib/analytics';
import { ChevronDownIcon } from '@/components/icons';
import { faqs } from '@/lib/faq-data';

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 card-hover">
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
                    const isOpening = !openIndices.has(idx);
                    setOpenIndices(prev => {
                      const next = new Set(prev);
                      if (isOpening) {
                        next.add(idx);
                      } else {
                        next.delete(idx);
                      }
                      return next;
                    });
                    trackFAQClick({ questionIndex: idx, questionText: faq.question, isOpen: isOpening });
                  }}
                  aria-expanded={openIndices.has(idx)}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {faq.question}
                  </span>
                  <span className={`transition-transform ${openIndices.has(idx) ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon size={20} />
                  </span>
                </button>
              </dt>
              {openIndices.has(idx) ? (
                <dd
                  id={`faq-answer-${idx}`}
                  className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {faq.answer}
                </dd>
              ) : null}
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

export { faqs };
