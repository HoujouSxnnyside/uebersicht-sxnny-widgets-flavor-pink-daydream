import type { FC, SVGProps } from 'react';

interface StrawberryStickerProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Kawaii scrapbook pastel strawberry sticker for Strawberry Diary
 */
export const StrawberrySticker: FC<StrawberryStickerProps> = ({
  size = 36,
  className,
  style,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
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
        {/* Strawberry body gradient */}
        <radialGradient id="strawberryBody" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="30%" stopColor="#EFA9C4" />
          <stop offset="75%" stopColor="#D8799E" />
          <stop offset="100%" stopColor="#C25A82" />
        </radialGradient>
        {/* Sage green sepals gradient */}
        <linearGradient
          id="strawberryLeaf"
          x1="24"
          y1="6"
          x2="24"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#C9DCC0" />
          <stop offset="100%" stopColor="#9CB891" />
        </linearGradient>
      </defs>

      {/* Rounded heart strawberry body */}
      <path
        d="M24 42 C16 42 10 32 10 22 C10 14 16 12 24 14 C32 12 38 14 38 22 C38 32 32 42 24 42 Z"
        fill="url(#strawberryBody)"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="1"
      />

      {/* Specular gloss highlight */}
      <ellipse
        cx="18"
        cy="20"
        rx="3.5"
        ry="2"
        fill="#FFFFFF"
        opacity="0.6"
        transform="rotate(-30 18 20)"
      />

      {/* Cream seed accents */}
      <ellipse cx="20" cy="27" rx="0.9" ry="1.4" fill="#FFF8F1" opacity="0.9" />
      <ellipse cx="28" cy="27" rx="0.9" ry="1.4" fill="#FFF8F1" opacity="0.9" />
      <ellipse cx="24" cy="33" rx="0.9" ry="1.4" fill="#FFF8F1" opacity="0.9" />
      <ellipse cx="16" cy="23" rx="0.8" ry="1.2" fill="#FFF8F1" opacity="0.8" />
      <ellipse cx="32" cy="23" rx="0.8" ry="1.2" fill="#FFF8F1" opacity="0.8" />
      <ellipse cx="24" cy="22" rx="0.8" ry="1.3" fill="#FFF8F1" opacity="0.9" />
      <ellipse cx="24" cy="37" rx="0.7" ry="1" fill="#FFF8F1" opacity="0.7" />

      {/* Top sepals / leaves */}
      <path
        d="M24 14 C21 9 13 11 15 15 C19 16 22 15 24 14 Z"
        fill="url(#strawberryLeaf)"
        stroke="#8FA686"
        strokeWidth="0.5"
      />
      <path
        d="M24 14 C27 9 35 11 33 15 C29 16 26 15 24 14 Z"
        fill="url(#strawberryLeaf)"
        stroke="#8FA686"
        strokeWidth="0.5"
      />
      <path
        d="M24 14 C24 7 28 6 28 10 C27 12 25 13 24 14 Z"
        fill="url(#strawberryLeaf)"
        stroke="#8FA686"
        strokeWidth="0.5"
      />
      <path
        d="M24 14 C20 13 19 18 23 18 C24 17 24 15 24 14 Z"
        fill="url(#strawberryLeaf)"
        stroke="#8FA686"
        strokeWidth="0.5"
      />
      <path
        d="M24 14 C28 13 29 18 25 18 C24 17 24 15 24 14 Z"
        fill="url(#strawberryLeaf)"
        stroke="#8FA686"
        strokeWidth="0.5"
      />

      {/* Stem */}
      <path d="M24 12 C23.5 8 26 6 25 4" stroke="#8FA686" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};
