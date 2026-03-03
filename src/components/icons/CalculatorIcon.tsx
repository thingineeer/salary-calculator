interface IconProps {
  className?: string;
  size?: number;
}

export default function CalculatorIcon({ className = '', size = 32 }: IconProps) {
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
        <linearGradient id="calc-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        <linearGradient id="screen-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>

      {/* Body - rounded rectangle with gradient fill */}
      <rect x="3" y="1" width="18" height="22" rx="3" fill="url(#calc-grad)" />

      {/* Subtle inner shadow / border highlight */}
      <rect
        x="3.5"
        y="1.5"
        width="17"
        height="21"
        rx="2.5"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="0.5"
        fill="none"
      />

      {/* Screen area - dark recessed display */}
      <rect x="5.5" y="3.5" width="13" height="5" rx="1.5" fill="url(#screen-grad)" />

      {/* Screen glare accent */}
      <rect
        x="6"
        y="4"
        width="8"
        height="1"
        rx="0.5"
        fill="white"
        fillOpacity="0.15"
      />

      {/* Button grid - 3 columns x 3 rows */}
      {/* Row 1 */}
      <rect x="5.5" y="10.5" width="3.5" height="2.5" rx="0.75" fill="white" fillOpacity="0.3" />
      <rect x="10.25" y="10.5" width="3.5" height="2.5" rx="0.75" fill="white" fillOpacity="0.3" />
      <rect x="15" y="10.5" width="3.5" height="2.5" rx="0.75" fill="white" fillOpacity="0.3" />

      {/* Row 2 */}
      <rect x="5.5" y="14.25" width="3.5" height="2.5" rx="0.75" fill="white" fillOpacity="0.3" />
      <rect x="10.25" y="14.25" width="3.5" height="2.5" rx="0.75" fill="white" fillOpacity="0.3" />
      <rect x="15" y="14.25" width="3.5" height="2.5" rx="0.75" fill="white" fillOpacity="0.3" />

      {/* Row 3 - bottom row with wider "equals" button */}
      <rect x="5.5" y="18" width="3.5" height="2.5" rx="0.75" fill="white" fillOpacity="0.3" />
      <rect x="10.25" y="18" width="8.25" height="2.5" rx="0.75" fill="white" fillOpacity="0.45" />
    </svg>
  );
}
