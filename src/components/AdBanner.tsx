'use client';

import { useEffect, useRef } from 'react';
import { trackAdImpression } from '@/lib/analytics';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  layout?: 'in-article' | '';
  className?: string;
  adPosition?: string;
}

const AD_CLIENT = 'ca-pub-5283496525222246';

export default function AdBanner({
  slot,
  format = 'auto',
  layout = '',
  className = '',
  adPosition = 'unknown',
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const impressionTracked = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, [slot]);

  // GA4: 광고 뷰포트 진입 시 impression 트래킹
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !impressionTracked.current) {
          trackAdImpression({ adFormat: format, adPosition });
          impressionTracked.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, [format, adPosition]);

  // AdSense 승인 전: 플레이스홀더 (클릭 불가, 포인터 이벤트 없음)
  if (!slot) {
    return (
      <div
        ref={adRef}
        className={`bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs pointer-events-none select-none ${className}`}
      >
        광고 영역
      </div>
    );
  }

  // AdSense 승인 후: 실제 광고 렌더링
  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout || undefined}
        data-full-width-responsive="true"
      />
    </div>
  );
}
