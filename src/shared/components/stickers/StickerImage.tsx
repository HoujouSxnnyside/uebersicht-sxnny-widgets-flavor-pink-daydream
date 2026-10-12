import { css } from '@emotion/css';
import type { CSSProperties, FC } from 'react';

export interface StickerImageProps {
  src: string;
  alt?: string;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  interactive?: boolean;
  glow?: boolean;
  rotate?: number;
}

const interactiveStickerStyle = css`
  display: inline-block;
  user-select: none;
  filter: drop-shadow(0 3px 6px rgba(180, 80, 110, 0.18))
    drop-shadow(0 8px 18px rgba(239, 169, 196, 0.25));
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease;
  will-change: transform;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px) scale(1.08) rotate(2deg);
    filter: drop-shadow(0 6px 14px rgba(180, 80, 110, 0.26))
      drop-shadow(0 16px 28px rgba(239, 169, 196, 0.38));
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

const staticStickerStyle = css`
  display: inline-block;
  user-select: none;
  pointer-events: none;
  filter: drop-shadow(0 2px 5px rgba(180, 80, 110, 0.16))
    drop-shadow(0 6px 14px rgba(239, 169, 196, 0.22));
`;

const glowStyle = css`
  filter: drop-shadow(0 0 14px rgba(239, 169, 196, 0.6))
    drop-shadow(0 4px 10px rgba(180, 80, 110, 0.22));
`;

/**
 * StickerImage — Ultra-crisp WebP die-cut sticker component with
 * Apple-grade spring physics, gloss shadows, and interactive hover peeling.
 */
export const StickerImage: FC<StickerImageProps> = ({
  src,
  alt = 'Pink Daydream Sticker',
  size,
  width,
  height,
  className,
  style,
  interactive = false,
  glow = false,
  rotate = 0,
}) => {
  const w = width ?? size ?? 48;
  const h = height ?? size ?? 48;

  const baseClass = interactive ? interactiveStickerStyle : staticStickerStyle;
  const glowClass = glow ? glowStyle : '';

  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      decoding="async"
      loading="eager"
      draggable={false}
      className={`${baseClass} ${glowClass} ${className || ''}`.trim()}
      style={{
        width: `${w}px`,
        height: `${h}px`,
        objectFit: 'contain',
        transform: rotate !== 0 ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    />
  );
};
