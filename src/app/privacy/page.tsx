import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '개인정보처리방침 - 연봉 실수령액 계산기',
  description: '연봉 실수령액 계산기의 개인정보처리방침입니다.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: '개인정보처리방침 - 연봉 실수령액 계산기',
    description: '연봉 실수령액 계산기의 개인정보처리방침입니다.',
    type: 'website',
    locale: 'ko_KR',
    url: '/privacy',
    siteName: '2026 연봉 실수령액 계산기',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          개인정보처리방침
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              1. 개인정보의 수집 및 이용 목적
            </h2>
            <p>
              본 웹사이트(&quot;salary-calc.kr&quot;, 이하 &quot;사이트&quot;)는 연봉
              실수령액 계산 서비스를 제공하며, 별도의 회원가입이나 개인정보 수집을 하지
              않습니다. 사용자가 입력하는 연봉, 부양가족 수 등의 정보는 브라우저
              내에서만 처리되며, 서버로 전송되거나 저장되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              2. 자동 수집 정보
            </h2>
            <p>본 사이트는 서비스 개선 및 통계 분석을 위해 다음 정보를 자동으로 수집할 수 있습니다:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>방문자의 IP 주소, 브라우저 종류, 접속 시간</li>
              <li>방문 페이지, 체류 시간 등 이용 통계</li>
            </ul>
            <p className="mt-2">
              이 정보는 Vercel Analytics를 통해 익명으로 수집되며, 개인을 식별할 수
              없습니다.
            </p>
            <p className="mt-2">
              또한 Google Analytics 4(GA4)를 통해 방문자의 사이트 이용 패턴을
              분석합니다. 수집 데이터는 페이지 조회, 체류 시간, 사용 기기 정보
              등이며, 개인을 직접 식별할 수 없는 형태로 처리됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              3. 광고 서비스
            </h2>
            <p>
              본 사이트는 Google AdSense를 통해 광고를 게재할 수 있습니다. Google
              AdSense는 사용자의 관심사에 기반한 광고를 제공하기 위해 쿠키를 사용할 수
              있습니다. 사용자는 Google 광고 설정
              (https://adssettings.google.com)에서 맞춤 광고를 비활성화할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              4. 쿠키 사용
            </h2>
            <p>
              본 사이트는 서비스 제공 및 광고 목적으로 쿠키를 사용할 수 있습니다.
              사용자는 브라우저 설정에서 쿠키 수집을 거부할 수 있으며, 이 경우 일부
              서비스 이용에 제한이 있을 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              5. 개인정보의 제3자 제공
            </h2>
            <p>
              본 사이트는 사용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에
              의해 요구되는 경우는 예외로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              6. 개인정보처리방침의 변경
            </h2>
            <p>
              본 개인정보처리방침은 법률 및 서비스 변경에 따라 수정될 수 있으며, 변경
              시 본 페이지를 통해 공지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              7. 문의
            </h2>
            <p>
              개인정보 관련 문의사항이 있으시면 아래로 연락해 주세요.
            </p>
            <p className="mt-1">이메일: dlaudwls1203@gmail.com</p>
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
