import type { FC, SVGProps } from 'react';

interface BowStickerProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  ribbonColor?: string;
  shadowColor?: string;
}

/**
 * Coquette pink bow / ribbon sticker for scrapbook-styled widgets
 */
export const BowSticker: FC<BowStickerProps> = ({
  size = 48,
  color = '#EFA9C4',
  ribbonColor = '#F7DCE7',
  shadowColor = '#D8799E',
  className,
  style,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        filter: 'drop-shadow(0 3px 6px rgba(239, 169, 196, 0.45))',
        ...style,
      }}
      {...props}
    >
      <defs>
        <linearGradient
          id="bowGradientLeft"
          x1="12"
          y1="16"
          x2="28"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={ribbonColor} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <linearGradient
          id="bowGradientRight"
          x1="52"
          y1="16"
          x2="36"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={ribbonColor} />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <linearGradient
          id="knotGradient"
          x1="28"
          y1="22"
          x2="36"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFF8F1" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor={shadowColor} />
        </linearGradient>
        <linearGradient
          id="tailLeft"
          x1="26"
          y1="30"
          x2="16"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={ribbonColor} />
        </linearGradient>
        <linearGradient
          id="tailRight"
          x1="38"
          y1="30"
          x2="48"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={ribbonColor} />
        </linearGradient>
      </defs>

      {/* Trailing ribbon tails */}
      <path
        d="M28 29 C25 36 21 44 14 52 C18 50 23 49 26 51 C27 45 29 38 31 31 Z"
        fill="url(#tailLeft)"
        opacity="0.95"
      />
      <path
        d="M36 29 C39 36 43 44 50 52 C46 50 41 49 38 51 C37 45 35 38 33 31 Z"
        fill="url(#tailRight)"
        opacity="0.95"
      />

      {/* Left bow loop */}
      <path
        d="M30 26 C22 16 10 16 8 24 C6 31 16 34 29 28 Z"
        fill="url(#bowGradientLeft)"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="1.2"
      />
      {/* Left inner fold shadow */}
      <path
        d="M16 22 C13 24 13 27 18 27"
        stroke={shadowColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Right bow loop */}
      <path
        d="M34 26 C42 16 54 16 56 24 C58 31 48 34 35 28 Z"
        fill="url(#bowGradientRight)"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="1.2"
      />
      {/* Right inner fold shadow */}
      <path
        d="M48 22 C51 24 51 27 46 27"
        stroke={shadowColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Center knot */}
      <rect
        x="27.5"
        y="21.5"
        width="9"
        height="10"
        rx="4.5"
        fill="url(#knotGradient)"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="1"
      />
    </svg>
  );
};
