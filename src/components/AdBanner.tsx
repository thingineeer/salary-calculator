interface AdBannerProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle';
  className?: string;
}

export default function AdBanner({
  className = '',
}: AdBannerProps) {
  // AdSense 승인 후 실제 코드로 교체
  return (
    <div
      className={`ad-placeholder bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm ${className}`}
    >
      광고 영역
    </div>
  );
}
