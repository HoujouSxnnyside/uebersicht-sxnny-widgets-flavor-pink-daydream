import type { FC, SVGProps } from 'react';

interface TeddyStickerProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Coquette Teddy Bear SVG illustration for Teddy Corner widget
 */
export const TeddySticker: FC<TeddyStickerProps> = ({ size = 72, className, style, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        filter: 'drop-shadow(0 4px 10px rgba(239, 169, 196, 0.45))',
        ...style,
      }}
      {...props}
    >
      <defs>
        {/* Soft cream fur gradient */}
        <radialGradient id="teddyBody" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF8F1" />
          <stop offset="60%" stopColor="#F5E5D8" />
          <stop offset="100%" stopColor="#E8D0C0" />
        </radialGradient>
        {/* Inner ear blush tone */}
        <radialGradient id="teddyInnerEar" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8F1" />
          <stop offset="80%" stopColor="#F7DCE7" />
          <stop offset="100%" stopColor="#EFA9C4" />
        </radialGradient>
        {/* Pink ribbon bow */}
        <linearGradient
          id="teddyBowGrad"
          x1="30"
          y1="52"
          x2="50"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#F7DCE7" />
          <stop offset="100%" stopColor="#EFA9C4" />
        </linearGradient>
      </defs>

      {/* Left ear */}
      <circle
        cx="24"
        cy="22"
        r="11"
        fill="url(#teddyBody)"
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="1"
      />
      <circle cx="24" cy="22" r="6" fill="url(#teddyInnerEar)" />

      {/* Right ear */}
      <circle
        cx="56"
        cy="22"
        r="11"
        fill="url(#teddyBody)"
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="1"
      />
      <circle cx="56" cy="22" r="6" fill="url(#teddyInnerEar)" />

      {/* Arms / Upper paws */}
      <ellipse cx="21" cy="56" rx="8" ry="11" fill="url(#teddyBody)" transform="rotate(25 21 56)" />
      <ellipse
        cx="59"
        cy="56"
        rx="8"
        ry="11"
        fill="url(#teddyBody)"
        transform="rotate(-25 59 56)"
      />

      {/* Body */}
      <ellipse
        cx="40"
        cy="58"
        rx="19"
        ry="17"
        fill="url(#teddyBody)"
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="1"
      />
      {/* Light belly patch */}
      <ellipse cx="40" cy="59" rx="12" ry="10" fill="#FFF8F1" opacity="0.8" />

      {/* Lower paws */}
      <circle cx="28" cy="70" r="7.5" fill="url(#teddyBody)" />
      <circle cx="28" cy="70" r="4.5" fill="url(#teddyInnerEar)" opacity="0.8" />
      <circle cx="52" cy="70" r="7.5" fill="url(#teddyBody)" />
      <circle cx="52" cy="70" r="4.5" fill="url(#teddyInnerEar)" opacity="0.8" />

      {/* Head */}
      <ellipse
        cx="40"
        cy="35"
        rx="20"
        ry="18"
        fill="url(#teddyBody)"
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="1"
      />

      {/* Snout */}
      <ellipse cx="40" cy="39" rx="8" ry="6.5" fill="#FFF8F1" />
      {/* Inverted heart nose */}
      <path
        d="M 37.5 36.5 C 37.5 35 40 35 40 36.5 C 40 35 42.5 35 42.5 36.5 C 42.5 38 40 40 40 40 C 40 40 37.5 38 37.5 36.5 Z"
        fill="#8E6D7B"
      />
      {/* Smiling mouth */}
      <path d="M 40 40 L 40 42" stroke="#8E6D7B" strokeWidth="1" strokeLinecap="round" />
      <path
        d="M 37 42 Q 40 44 43 42"
        stroke="#8E6D7B"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bright eyes with white glints */}
      <circle cx="31" cy="33" r="2.5" fill="#4A343E" />
      <circle cx="30" cy="32" r="0.9" fill="#FFFFFF" />
      <circle cx="49" cy="33" r="2.5" fill="#4A343E" />
      <circle cx="48" cy="32" r="0.9" fill="#FFFFFF" />

      {/* Rosy blush cheeks */}
      <ellipse cx="26" cy="38" rx="3.5" ry="2" fill="#EFA9C4" opacity="0.6" />
      <ellipse cx="54" cy="38" rx="3.5" ry="2" fill="#EFA9C4" opacity="0.6" />

      {/* Pink neck ribbon bow */}
      <g transform="translate(40, 50)">
        {/* Knot */}
        <circle cx="0" cy="0" r="3" fill="#D8799E" />
        {/* Bow loops */}
        <path
          d="M 0 0 C -5 -6 -10 0 -3 2 Z"
          fill="url(#teddyBowGrad)"
          stroke="#D8799E"
          strokeWidth="0.8"
        />
        <path
          d="M 0 0 C 5 -6 10 0 3 2 Z"
          fill="url(#teddyBowGrad)"
          stroke="#D8799E"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
};
