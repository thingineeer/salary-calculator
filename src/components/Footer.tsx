'use client';

import Link from 'next/link';
import { trackNavigation } from '@/lib/analytics';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
        <p>
          본 계산기는 2026년 기준 4대보험 요율 및 근로소득 간이세액표를 바탕으로
          <strong> 추정치</strong>를 제공합니다.
        </p>
        <p>
          실제 수령액은 회사 급여 체계, 비과세 항목, 연말정산 결과 등에 따라 달라질
          수 있습니다.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <span>© {new Date().getFullYear()} 연봉 실수령액 계산기</span>
          <span>·</span>
          <Link
            href="/about"
            onClick={() => trackNavigation('about')}
            className="hover:underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            소개
          </Link>
          <span>·</span>
          <Link
            href="/privacy"
            onClick={() => trackNavigation('privacy')}
            className="hover:underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            개인정보처리방침
          </Link>
          <span>·</span>
          <Link
            href="/terms"
            onClick={() => trackNavigation('terms')}
            className="hover:underline hover:text-gray-600 dark:hover:text-gray-300"
          >
            이용약관
          </Link>
          <span>·</span>
          <span>dlaudwls1203@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
