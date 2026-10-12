import type { FC, SVGProps } from 'react';

interface WatermelonStickerProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Kawaii pastel watermelon slice sticker for Strawberry Diary
 */
export const WatermelonSticker: FC<WatermelonStickerProps> = ({
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
        {/* Soft pink watermelon flesh gradient */}
        <radialGradient id="melonFlesh" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="40%" stopColor="#F59CB8" />
          <stop offset="100%" stopColor="#E26D92" />
        </radialGradient>
      </defs>

      {/* Sage green outer rind */}
      <path
        d="M 6 18 A 20 20 0 0 0 42 18 Z"
        fill="#9CB891"
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="0.8"
      />
      {/* White cream rind layer */}
      <path d="M 8 18 A 18 18 0 0 0 40 18 Z" fill="#FFF8F1" />
      {/* Pink melon flesh */}
      <path d="M 10 18 A 16 16 0 0 0 38 18 Z" fill="url(#melonFlesh)" />

      {/* Tiny raindrop seeds */}
      <ellipse cx="18" cy="22" rx="0.9" ry="1.5" fill="#5C414D" transform="rotate(-15 18 22)" />
      <ellipse cx="24" cy="27" rx="0.9" ry="1.5" fill="#5C414D" />
      <ellipse cx="30" cy="22" rx="0.9" ry="1.5" fill="#5C414D" transform="rotate(15 30 22)" />
      <ellipse cx="21" cy="24" rx="0.8" ry="1.3" fill="#5C414D" transform="rotate(-10 21 24)" />
      <ellipse cx="27" cy="24" rx="0.8" ry="1.3" fill="#5C414D" transform="rotate(10 27 24)" />

      {/* Soft highlight */}
      <path
        d="M 12 18 Q 24 19 36 18"
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};
