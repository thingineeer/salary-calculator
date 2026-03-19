'use client';

import { useEffect, useRef } from 'react';
import { getSalaryPercentile } from '@/lib/percentile';
import { trackPercentileView } from '@/lib/analytics';

interface Props {
  annualSalary: number;
}

export default function SalaryPercentile({ annualSalary }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewTracked = useRef(false);

  const percentile = annualSalary >= 10_000_000 ? getSalaryPercentile(annualSalary) : 0;

  // GA4: 백분위 뷰포트 진입 시 1회 트래킹
  useEffect(() => {
    if (annualSalary < 10_000_000) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewTracked.current) {
          trackPercentileView({ annualSalary, percentile });
          viewTracked.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [annualSalary, percentile]);

  if (annualSalary < 10_000_000) return null;
  const barWidth = Math.max(2, Math.min(98, 100 - percentile));

  return (
    <div ref={containerRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
        나의 연봉 위치
      </h3>
      <div className="text-center mb-3">
        <span className="text-2xl font-bold text-blue-700 dark:text-blue-300 tabular-nums">
          상위 {percentile}%
        </span>
        <p className="text-xs text-gray-400 mt-1">
          전체 근로자 기준 (통계청 임금구조 기본통계 참고)
        </p>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          role="progressbar"
          aria-valuenow={percentile}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="연봉 백분위"
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
          style={{ width: `${barWidth}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>하위</span>
        <span>상위</span>
      </div>
    </div>
  );
}
