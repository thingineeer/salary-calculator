'use client';

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧮</span>
          <h1 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300">
            2026 연봉 실수령액 계산기
          </h1>
        </div>
        <span className="text-xs text-gray-400 hidden sm:block">
          4대보험 + 소득세 자동 계산
        </span>
      </div>
    </header>
  );
}
