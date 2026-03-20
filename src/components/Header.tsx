'use client';

import { useSyncExternalStore, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackThemeToggle, trackNavigation } from '@/lib/analytics';
import { CalculatorIcon, SunIcon, MoonIcon } from '@/components/icons';

function getThemeSnapshot() {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return false;
}

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

export default function Header() {
  const dark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);
  const pathname = usePathname();
  const isSalaryActive = pathname === '/salary' || pathname.startsWith('/salary/');
  const isDollarActive = pathname === '/dollar' || pathname.startsWith('/dollar/');
  const isHourlyActive = pathname === '/hourly' || pathname.startsWith('/hourly/');

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    trackThemeToggle(next ? 'dark' : 'light');
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm"
      >
        본문으로 건너뛰기
      </a>
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CalculatorIcon size={28} />
          <span className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300">
            2026 연봉 실수령액 계산기
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/salary"
            onClick={() => trackNavigation('salary_comparison')}
            aria-current={isSalaryActive ? 'page' : undefined}
            className={`text-sm font-medium px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors ${isSalaryActive ? 'ring-2 ring-blue-500 font-bold' : ''}`}
          >
            연봉 비교표
          </Link>
          <Link
            href="/dollar"
            onClick={() => trackNavigation('dollar_calculator')}
            aria-current={isDollarActive ? 'page' : undefined}
            className={`text-sm font-medium px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800/40 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 transition-colors ${isDollarActive ? 'ring-2 ring-green-500 font-bold' : ''}`}
          >
            달러 환산
          </Link>
          <Link
            href="/hourly"
            onClick={() => trackNavigation('hourly_calculator')}
            aria-current={isHourlyActive ? 'page' : undefined}
            className={`text-sm font-medium px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/40 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-colors ${isHourlyActive ? 'ring-2 ring-amber-500 font-bold' : ''}`}
          >
            시급 계산
          </Link>
          <button
            onClick={toggleTheme}
            aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors text-lg"
          >
            {dark ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
