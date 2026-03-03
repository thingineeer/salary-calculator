'use client';

import { useState, useEffect, useRef } from 'react';
import { calculateSalary } from '@/lib/salary-calculator';
import { formatNumber } from '@/lib/format';
import { trackJobSimulation, trackSimulatorView } from '@/lib/analytics';

interface Props {
  currentSalary: number;
  dependents: number;
  childrenUnder20: number;
  nonTaxableAllowance: number;
}

export default function JobChangeSimulator({
  currentSalary,
  dependents,
  childrenUnder20,
  nonTaxableAllowance,
}: Props) {
  const [targetSalary, setTargetSalary] = useState(
    Math.floor(currentSalary * 1.15 / 1_000_000) * 1_000_000
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const viewTracked = useRef(false);

  const currentResult = calculateSalary({
    annualSalary: currentSalary,
    dependents,
    childrenUnder20,
    nonTaxableAllowance,
  });

  const targetResult = calculateSalary({
    annualSalary: targetSalary,
    dependents,
    childrenUnder20,
    nonTaxableAllowance,
  });

  const netDiff = targetResult.netSalary - currentResult.netSalary;
  const salaryDiff = targetSalary - currentSalary;
  const increaseRate = currentSalary > 0
    ? Math.round((salaryDiff / currentSalary) * 100)
    : 0;

  // GA4: 시뮬레이터 뷰포트 진입 시 1회 트래킹
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewTracked.current) {
          trackSimulatorView();
          viewTracked.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // GA4: 목표 연봉 변경 시 디바운스 트래킹
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSalary > 0 && targetSalary > currentSalary) {
        trackJobSimulation({
          currentSalary,
          targetSalary,
          increaseRate,
          netDiff: Math.max(0, netDiff),
        });
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [targetSalary, currentSalary, increaseRate, netDiff]);

  return (
    <div ref={containerRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
        이직 연봉 시뮬레이터
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        연봉이 오르면 실수령액은 얼마나 증가할까요?
      </p>

      <div className="space-y-3">
        <div>
          <label htmlFor="target-salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            목표 연봉
          </label>
          <input
            id="target-salary"
            type="range"
            min={currentSalary > 0 ? currentSalary : 20_000_000}
            max={Math.min(currentSalary * 2, 300_000_000)}
            step={1_000_000}
            value={targetSalary}
            onChange={(e) => setTargetSalary(Number(e.target.value))}
            className="w-full accent-green-600"
          />
          <div className="text-center text-sm font-semibold text-green-600 dark:text-green-400">
            {formatNumber(targetSalary)}원
            {increaseRate > 0 && (
              <span className="ml-1 text-xs text-gray-400">(+{increaseRate}%)</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">현재 실수령</p>
            <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
              {formatNumber(currentResult.netSalary)}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">목표 실수령</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {formatNumber(targetResult.netSalary)}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">월 실수령 차이</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            +{formatNumber(Math.max(0, netDiff))}원
          </p>
          <p className="text-xs text-gray-400 mt-1">
            연봉 {formatNumber(salaryDiff)}원 인상 시
          </p>
        </div>
      </div>
    </div>
  );
}
