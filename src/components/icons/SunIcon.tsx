interface IconProps {
  className?: string;
  size?: number;
}

export default function SunIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sun-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      {/* Central sun circle */}
      <circle cx="12" cy="12" r="4.5" fill="url(#sun-grad)" />
      {/* 8 rays radiating outward at 0°, 45°, 90°, 135°, 180°, 225°, 270°, 315° */}
      {/* Top ray (270° / up) */}
      <line x1="12" y1="5.5" x2="12" y2="2.5" stroke="url(#sun-grad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bottom ray (90° / down) */}
      <line x1="12" y1="18.5" x2="12" y2="21.5" stroke="url(#sun-grad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Right ray (0°) */}
      <line x1="18.5" y1="12" x2="21.5" y2="12" stroke="url(#sun-grad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Left ray (180°) */}
      <line x1="5.5" y1="12" x2="2.5" y2="12" stroke="url(#sun-grad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Top-right ray (315°) */}
      <line x1="16.6" y1="7.4" x2="18.72" y2="5.28" stroke="url(#sun-grad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bottom-left ray (135°) */}
      <line x1="7.4" y1="16.6" x2="5.28" y2="18.72" stroke="url(#sun-grad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Top-left ray (225°) */}
      <line x1="7.4" y1="7.4" x2="5.28" y2="5.28" stroke="url(#sun-grad)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bottom-right ray (45°) */}
      <line x1="16.6" y1="16.6" x2="18.72" y2="18.72" stroke="url(#sun-grad)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
