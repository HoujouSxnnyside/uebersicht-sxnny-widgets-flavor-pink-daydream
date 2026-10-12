import type { FC, SVGProps } from 'react';

interface PearlStickerProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Lustrous pearl sticker for jewelry accents and decorative details
 */
export const PearlSticker: FC<PearlStickerProps> = ({ size = 18, className, style, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{
        filter: 'drop-shadow(0 2px 4px rgba(239, 169, 196, 0.45))',
        ...style,
      }}
      {...props}
    >
      <defs>
        <radialGradient id="pearlShine" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#FFF8F1" />
          <stop offset="75%" stopColor="#F7DCE7" />
          <stop offset="100%" stopColor="#E0B7CA" />
        </radialGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="url(#pearlShine)"
        stroke="rgba(255, 255, 255, 0.9)"
        strokeWidth="0.8"
      />
      <ellipse
        cx="8.5"
        cy="7.5"
        rx="3.5"
        ry="2"
        fill="#FFFFFF"
        opacity="0.9"
        transform="rotate(-30 8.5 7.5)"
      />
    </svg>
  );
};
