'use client';

import { useSyncExternalStore, useCallback } from 'react';
import Link from 'next/link';
import { trackThemeToggle } from '@/lib/analytics';

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

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    trackThemeToggle(next ? 'dark' : 'light');
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🧮</span>
          <h1 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300">
            2026 연봉 실수령액 계산기
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">
            4대보험 + 소득세 자동 계산
          </span>
          <button
            onClick={toggleTheme}
            aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-lg"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
