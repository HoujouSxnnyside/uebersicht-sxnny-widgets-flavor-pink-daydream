import type { FC, SVGProps } from 'react';

interface ButterflyStickerProps extends SVGProps<SVGSVGElement> {
  size?: number;
  wingColor?: string;
  accentColor?: string;
}

/**
 * Aesthetic pastel butterfly with delicate lavender wings
 */
export const ButterflySticker: FC<ButterflyStickerProps> = ({
  size = 36,
  wingColor = '#B9A6D8',
  accentColor = '#F7DCE7',
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
        filter: 'drop-shadow(0 3px 6px rgba(185, 166, 216, 0.45))',
        ...style,
      }}
      {...props}
    >
      <defs>
        <linearGradient
          id="wingGradLeft"
          x1="24"
          y1="8"
          x2="6"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFF8F1" />
          <stop offset="40%" stopColor={accentColor} />
          <stop offset="100%" stopColor={wingColor} />
        </linearGradient>
        <linearGradient
          id="wingGradRight"
          x1="24"
          y1="8"
          x2="42"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFF8F1" />
          <stop offset="40%" stopColor={accentColor} />
          <stop offset="100%" stopColor={wingColor} />
        </linearGradient>
      </defs>

      {/* Alas superiores */}
      <path
        d="M24 20 C18 10 8 10 6 18 C4 26 14 28 23 23 Z"
        fill="url(#wingGradLeft)"
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="1"
      />
      <path
        d="M24 20 C30 10 40 10 42 18 C44 26 34 28 25 23 Z"
        fill="url(#wingGradRight)"
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="1"
      />

      {/* Alas inferiores */}
      <path
        d="M23 24 C16 26 11 32 14 38 C18 41 24 34 24 27 Z"
        fill="url(#wingGradLeft)"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="0.8"
      />
      <path
        d="M25 24 C32 26 37 32 34 38 C30 41 24 34 24 27 Z"
        fill="url(#wingGradRight)"
        stroke="rgba(255, 255, 255, 0.6)"
        strokeWidth="0.8"
      />

      {/* Cuerpo y antenas */}
      <path d="M24 16 L24 32" stroke="#8E6D7B" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M24 16 C22 12 19 11 17 12" stroke="#8E6D7B" strokeWidth="1" strokeLinecap="round" />
      <path d="M24 16 C26 12 29 11 31 12" stroke="#8E6D7B" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
};
