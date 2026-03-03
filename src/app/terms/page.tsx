import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '이용약관 - 연봉 실수령액 계산기',
  description: '연봉 실수령액 계산기의 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          이용약관
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              제1조 (목적)
            </h2>
            <p>
              이 약관은 연봉 실수령액 계산기(이하 &quot;서비스&quot;)의 이용에 관한
              기본적인 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              제2조 (서비스의 내용)
            </h2>
            <p>
              본 서비스는 사용자가 입력한 연봉 정보를 바탕으로 4대보험료 및 소득세를
              계산하여 월 실수령액의 추정치를 제공합니다. 본 서비스는 무료로
              제공됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              제3조 (면책사항)
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                본 서비스에서 제공하는 계산 결과는 참고용 추정치이며, 실제 급여와
                차이가 있을 수 있습니다.
              </li>
              <li>
                계산 결과의 정확성을 보장하지 않으며, 이를 근거로 한 의사결정에 대해
                책임을 지지 않습니다.
              </li>
              <li>
                세율 및 보험요율은 정부 정책에 따라 변경될 수 있으며, 본 서비스는
                이를 즉시 반영하지 못할 수 있습니다.
              </li>
              <li>
                정확한 급여 정보는 회사 급여 담당자 또는 세무사에게 문의하시기
                바랍니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              제4조 (지적재산권)
            </h2>
            <p>
              본 서비스의 디자인, 코드, 콘텐츠에 대한 지적재산권은 운영자에게
              있습니다. 무단 복제, 배포, 수정은 금지됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              제5조 (광고)
            </h2>
            <p>
              본 서비스는 Google AdSense 등을 통해 광고를 게재할 수 있으며, 광고
              내용에 대한 책임은 해당 광고주에게 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              제6조 (약관의 변경)
            </h2>
            <p>
              본 약관은 필요에 따라 변경될 수 있으며, 변경 시 본 페이지를 통해
              공지합니다.
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
            시행일: 2026년 3월 3일
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← 계산기로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
