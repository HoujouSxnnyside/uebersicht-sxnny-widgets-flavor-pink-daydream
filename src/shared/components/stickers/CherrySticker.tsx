import type { FC, SVGProps } from 'react';

interface CherryStickerProps extends SVGProps<SVGSVGElement> {
  size?: number;
  cherryColor?: string;
  stemColor?: string;
}

/**
 * Kawaii pastel cherry pair sticker for scrapbook accents
 */
export const CherrySticker: FC<CherryStickerProps> = ({
  size = 36,
  cherryColor = '#EFA9C4',
  stemColor = '#9CB891',
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
        filter: 'drop-shadow(0 3px 6px rgba(239, 169, 196, 0.4))',
        ...style,
      }}
      {...props}
    >
      <defs>
        <radialGradient id="cherryLeft" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF8F1" />
          <stop offset="35%" stopColor={cherryColor} />
          <stop offset="100%" stopColor="#D8799E" />
        </radialGradient>
        <radialGradient id="cherryRight" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF8F1" />
          <stop offset="35%" stopColor={cherryColor} />
          <stop offset="100%" stopColor="#D8799E" />
        </radialGradient>
      </defs>

      {/* Sage green stem leaf */}
      <path
        d="M25 8 C30 5 36 9 34 14 C29 16 26 12 25 8 Z"
        fill="#C9DCC0"
        stroke={stemColor}
        strokeWidth="0.8"
      />

      {/* Curved stems */}
      <path
        d="M25 8 C20 16 15 22 17 32"
        stroke={stemColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M25 8 C26 16 31 22 33 33"
        stroke={stemColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Left cherry */}
      <circle
        cx="16"
        cy="33"
        r="8.5"
        fill="url(#cherryLeft)"
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="0.8"
      />
      <ellipse
        cx="14"
        cy="30"
        rx="2"
        ry="1.2"
        fill="#FFFFFF"
        opacity="0.85"
        transform="rotate(-30 14 30)"
      />

      {/* Right cherry */}
      <circle
        cx="33"
        cy="34"
        r="8.5"
        fill="url(#cherryRight)"
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="0.8"
      />
      <ellipse
        cx="31"
        cy="31"
        rx="2"
        ry="1.2"
        fill="#FFFFFF"
        opacity="0.85"
        transform="rotate(-30 31 31)"
      />
    </svg>
  );
};
