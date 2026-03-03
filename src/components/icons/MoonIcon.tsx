interface IconProps {
  className?: string;
  size?: number;
}

export default function MoonIcon({ className = '', size = 24 }: IconProps) {
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
        <linearGradient id="moon-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      {/* Crescent moon - path carved by subtracting a smaller circle from a larger one */}
      <path
        d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646z"
        fill="url(#moon-grad)"
      />
      {/* Small decorative stars */}
      <circle cx="18" cy="5" r="0.75" fill="url(#moon-grad)" opacity="0.8" />
      <circle cx="20.5" cy="9" r="0.5" fill="url(#moon-grad)" opacity="0.6" />
      <circle cx="16" cy="3.5" r="0.5" fill="url(#moon-grad)" opacity="0.5" />
    </svg>
  );
}
