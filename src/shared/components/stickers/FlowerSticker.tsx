import type { FC, SVGProps } from 'react';

interface FlowerStickerProps extends SVGProps<SVGSVGElement> {
  size?: number;
  petalColor?: string;
  petalGradientColor?: string;
  centerColor?: string;
}

/**
 * Pastel cherry blossom / sakura flower for widget corners and cards
 */
export const FlowerSticker: FC<FlowerStickerProps> = ({
  size = 32,
  petalColor = '#F7DCE7',
  petalGradientColor = '#EFA9C4',
  centerColor = '#FFF8F1',
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
        filter: 'drop-shadow(0 2px 5px rgba(239, 169, 196, 0.4))',
        ...style,
      }}
      {...props}
    >
      <defs>
        <radialGradient id="petalGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="40%" stopColor={petalColor} />
          <stop offset="100%" stopColor={petalGradientColor} />
        </radialGradient>
        <radialGradient id="centerGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor={centerColor} />
          <stop offset="100%" stopColor="#E5C79E" />
        </radialGradient>
      </defs>

      {/* 5 soft petals rotated symmetrically */}
      <g transform="translate(24, 24)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            transform={`rotate(${angle}) translate(0, -13)`}
            d="M0 -7 C5 -7 8 -3 8 4 C8 11 4 14 0 14 C-4 14 -8 11 -8 4 C-8 -3 -5 -7 0 -7 Z"
            fill="url(#petalGrad)"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="0.8"
          />
        ))}

        {/* Pearled floral center with pistil */}
        <circle cx="0" cy="0" r="4.5" fill="url(#centerGrad)" stroke="#EFA9C4" strokeWidth="0.8" />
        <circle cx="-1" cy="-1" r="1.2" fill="#FFFFFF" opacity="0.9" />

        {/* Subtle pollen/pearl beads */}
        <circle cx="-2" cy="1.5" r="0.8" fill="#D8799E" opacity="0.6" />
        <circle cx="2" cy="-1.5" r="0.8" fill="#D8799E" opacity="0.6" />
        <circle cx="1.5" cy="2" r="0.7" fill="#D8799E" opacity="0.6" />
      </g>
    </svg>
  );
};
