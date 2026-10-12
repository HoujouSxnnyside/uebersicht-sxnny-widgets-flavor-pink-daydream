import { css } from '@emotion/css';
import type { CSSProperties, FC, ReactNode } from 'react';
import { theme } from '@/shared/styles/theme';

export interface DreamCardProps {
  children: ReactNode;
  variant?: 'stationery' | 'cream' | 'notebook' | 'confectionery' | 'bubble';
  className?: string;
  style?: CSSProperties;
  padding?: string;
  borderRadius?: string;
}

const baseCardStyle = css`
  position: relative;
  user-select: none;
  box-sizing: border-box;
  pointer-events: auto;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
  will-change: transform;

  /* Deep luxury multi-tier colored occlusion shadow against any desktop background */
  box-shadow: 
    0 4px 10px rgba(180, 70, 105, 0.12),
    0 16px 36px rgba(180, 70, 105, 0.16),
    0 32px 64px rgba(239, 169, 196, 0.22),
    inset 0 1px 2px rgba(255, 255, 255, 1);

  &:hover {
    box-shadow: 
      0 6px 14px rgba(180, 70, 105, 0.16),
      0 22px 48px rgba(180, 70, 105, 0.22),
      0 40px 80px rgba(239, 169, 196, 0.30),
      inset 0 1px 2px rgba(255, 255, 255, 1);
    transform: translateY(-2px) scale(1.008);
  }
`;

/**
 * 1. Stationery Variant:
 * 100% solid, fully opaque Japanese luxury stationery paper with vivid polka dots (lunares)
 * and an inner stitched dashed seam for ultimate accessibility & tactile charm.
 */
const variantStationeryStyle = css`
  background-color: #FFFDFB;
  background-image: 
    radial-gradient(circle, rgba(235, 140, 175, 0.32) 1.5px, transparent 1.5px),
    linear-gradient(160deg, #FFFFFF 0%, #FFF8FA 35%, #FEEDF4 100%);
  background-size: 16px 16px, 100% 100%;
  background-repeat: repeat, no-repeat;
  border: 2px solid #FFFFFF;

  /* Rounded inner stitched couture seam */
  &::after {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1.5px dashed rgba(235, 140, 175, 0.55);
    border-radius: calc(${theme.radii.xl} - 5px);
    pointer-events: none;
    z-index: 1;
  }
`;

/**
 * 2. Notebook Variant:
 * Solid memo notepad background with faint dotted grid for diary & tasks.
 */
const variantNotebookStyle = css`
  background-color: #FFFAFA;
  background-image: 
    radial-gradient(circle, rgba(235, 140, 175, 0.35) 1.2px, transparent 1.2px),
    linear-gradient(180deg, #FFFFFF 0%, #FFF7F4 60%, #FEEDF2 100%);
  background-size: 15px 15px, 100% 100%;
  background-repeat: repeat, no-repeat;
  border: 2px solid #FFFFFF;

  &::after {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1.5px solid rgba(239, 169, 196, 0.45);
    border-radius: calc(${theme.radii.xl} - 5px);
    pointer-events: none;
    z-index: 1;
  }
`;

/**
 * 3. Confectionery Variant:
 * Warm blush glaze gradient with a luminous candy rim and pearl lunares.
 */
const variantConfectioneryStyle = css`
  background-color: #FFF9FA;
  background-image: 
    radial-gradient(circle, rgba(240, 150, 185, 0.35) 1.8px, transparent 1.8px),
    linear-gradient(145deg, #FFFFFF 0%, #FEEAF2 55%, #FBD9E7 100%);
  background-size: 18px 18px, 100% 100%;
  background-repeat: repeat, no-repeat;
  border: 2px solid #FFFFFF;

  &::after {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1.5px dashed rgba(216, 121, 158, 0.55);
    border-radius: calc(${theme.radii.xl} - 5px);
    pointer-events: none;
    z-index: 1;
  }
`;

const getVariantStyle = (variant: DreamCardProps['variant']) => {
  switch (variant) {
    case 'notebook':
      return variantNotebookStyle;
    case 'confectionery':
      return variantConfectioneryStyle;
    default:
      return variantStationeryStyle;
  }
};

/**
 * DreamCard — The unified Awwwards-level luxury tactile stationery container.
 * 100% opaque, ultra-accessible against any wallpaper, with handcrafted polka-dots (lunares),
 * stitched borders, and multi-tier ambient shadows.
 */
export const DreamCard: FC<DreamCardProps> = ({
  children,
  variant = 'stationery',
  className,
  style,
  padding = '20px 24px',
  borderRadius = theme.radii.xl,
}) => {
  return (
    <article
      className={`${baseCardStyle} ${getVariantStyle(variant)} ${className || ''}`.trim()}
      style={{
        padding,
        borderRadius,
        ...style,
      }}
    >
      {children}
    </article>
  );
};
