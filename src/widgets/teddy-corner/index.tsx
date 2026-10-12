import { css, keyframes } from '@emotion/css';
import {
  ASSET_BUNNY_BERRY_BALLOON,
  ASSET_BUNNY_BERRY_BOW,
  ASSET_BUNNY_CARRYING_BERRY,
  ASSET_BUNNY_CUDDLING_BERRY,
  ASSET_BUNNY_HOLDING_SUN,
  ASSET_STRAWBERRY_HEART,
} from '@/shared/assets/images';
import { MingCuteIcon } from '@/shared/components/icons';
import { DraggableWidget } from '@/shared/components/layout';
import { StickerImage, TapeSticker } from '@/shared/components/stickers';
import { getI18n } from '@/shared/i18n';
import { ensurePinkDaydreamFonts } from '@/shared/styles/global';
import { theme } from '@/shared/styles/theme';
import type { UbersichtRenderProps } from '@/shared/types/ubersicht';

// Inject Pink Daydream embedded fonts
ensurePinkDaydreamFonts();

/**
 * 04 — Teddy & Bunny Corner
 * Awwwards-level interactive desktop companion featuring lively White Bunny
 * mascot poses, spring physics, and encouraging handwritten fortune notes.
 */

export const command = 'date +%M';
export const refreshFrequency = 60000;

export const className = `
  bottom: ${theme.safeArea.bottom};
  left: ${theme.safeArea.left};
  font-family: ${theme.fonts.rounded};
  z-index: 90;
  pointer-events: none;
`;

const floatAnim = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-4px) rotate(1.5deg);
  }
`;

const heartPulseAnim = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.22);
    opacity: 1;
  }
`;

const containerStyle = css`
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  pointer-events: none;
  filter: drop-shadow(0 10px 28px rgba(239, 169, 196, 0.38));
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const mascotWrapperStyle = css`
  position: relative;
  animation: ${floatAnim} 5s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.1) rotate(3deg);
  }

  &:active {
    transform: scale(0.95) rotate(-2deg);
  }
`;

const bubbleCardStyle = css`
  position: relative;
  background-color: #FFFDFB;
  background-image: 
    radial-gradient(circle, rgba(235, 140, 175, 0.32) 1.5px, transparent 1.5px),
    linear-gradient(160deg, #FFFFFF 0%, #FFF8FA 35%, #FEEDF4 100%);
  background-size: 16px 16px, 100% 100%;
  background-repeat: repeat, no-repeat;
  border-radius: ${theme.radii.lg};
  border: 2px solid #FFFFFF;
  padding: 14px 18px 12px 18px;
  max-width: 205px;
  pointer-events: auto;
  box-shadow: 
    0 4px 10px rgba(180, 70, 105, 0.12),
    0 16px 36px rgba(180, 70, 105, 0.16),
    0 32px 64px rgba(239, 169, 196, 0.22),
    inset 0 1px 2px rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 14px rgba(180, 70, 105, 0.16),
      0 22px 48px rgba(180, 70, 105, 0.22);
  }

  /* Rounded inner stitched couture seam */
  &::after {
    content: "";
    position: absolute;
    inset: 4px;
    border: 1.5px dashed rgba(235, 140, 175, 0.55);
    border-radius: calc(${theme.radii.lg} - 4px);
    pointer-events: none;
    z-index: 1;
  }

  /* Bubble pointer */
  &::before {
    content: "";
    position: absolute;
    bottom: 12px;
    left: -7px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 8px solid #FFFFFF;
  }
`;

const tagHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`;

const tagBadgeStyle = css`
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${theme.colors.roseDeep};
  background: linear-gradient(135deg, rgba(255, 248, 241, 0.95), rgba(247, 220, 231, 0.85));
  padding: 2px 8px;
  border-radius: ${theme.radii.full};
  border: 1px solid rgba(239, 169, 196, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const quoteTextStyle = css`
  font-family: ${theme.fonts.handwritten};
  font-size: 18px;
  line-height: 1.25;
  color: ${theme.colors.textPrimary};
  margin: 0;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.85);
  user-select: text;
`;

const heartIconStyle = css`
  color: ${theme.colors.roseDeep};
  animation: ${heartPulseAnim} 2.5s ease-in-out infinite;
  display: inline-flex;
`;

const tapePlacementStyle = css`
  position: absolute;
  top: -9px;
  right: 18px;
  z-index: 2;
  transform: rotate(3deg);
  cursor: grab;
  pointer-events: auto;

  &:active {
    cursor: grabbing;
  }
`;

const quoteBtnStyle = css`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
`;

const MASCOT_POSES = [
  ASSET_BUNNY_BERRY_BOW,
  ASSET_BUNNY_CUDDLING_BERRY,
  ASSET_BUNNY_HOLDING_SUN,
  ASSET_BUNNY_CARRYING_BERRY,
  ASSET_BUNNY_BERRY_BALLOON,
];

export const render = ({ output }: UbersichtRenderProps) => {
  const i18n = getI18n();
  const minute = parseInt(output?.trim() || '0', 10) || 0;
  const quotes = i18n.teddy.quotes;
  const quote = quotes[minute % quotes.length] || quotes[0];

  // Default mascot pose based on time
  const defaultMascot = MASCOT_POSES[minute % MASCOT_POSES.length] || ASSET_BUNNY_BERRY_BOW;

  const handleNextQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const qEl = document.getElementById('teddy-quote-text');
      if (qEl) {
        const nextIdx = Math.floor(Math.random() * quotes.length);
        qEl.textContent = quotes[nextIdx] ?? quotes[0] ?? '';
      }
      const imgEl = document.getElementById('teddy-mascot-img') as HTMLImageElement | null;
      if (imgEl) {
        const nextMascot = MASCOT_POSES[Math.floor(Math.random() * MASCOT_POSES.length)];
        if (nextMascot) imgEl.src = nextMascot;
      }
    } catch {}
  };

  return (
    <DraggableWidget widgetId="teddy-corner" className={containerStyle}>
      {/* Interactive Mascot Companion */}
      <button
        type="button"
        className={mascotWrapperStyle}
        data-no-drag="true"
        data-interactive="true"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={handleNextQuote}
        title="Click mascot for a sweet fortune"
      >
        <img
          id="teddy-mascot-img"
          src={defaultMascot}
          alt="Pink Daydream Mascot Bunny"
          width={98}
          height={98}
          draggable={false}
          style={{ objectFit: 'contain' }}
        />
      </button>

      {/* Stationery note card */}
      <figure className={bubbleCardStyle} style={{ margin: 0 }}>
        {/* Top washi tape sticker (Primary Ergonomic Drag Handle) */}
        <div
          className={`${tapePlacementStyle} widget-drag-handle`}
          data-drag-handle="true"
          title={i18n.common.dragHint}
        >
          <TapeSticker width={52} height={14} color="rgba(247, 220, 231, 0.9)" />
        </div>

        <header className={tagHeaderStyle}>
          <span className={tagBadgeStyle}>
            <MingCuteIcon name="sparkles-line" size={10} color={theme.colors.roseDeep} />
            {i18n.teddy.tagLabel}
          </span>
          <span className={heartIconStyle}>
            <StickerImage src={ASSET_STRAWBERRY_HEART} size={20} alt="Heart" />
          </span>
        </header>

        <button
          type="button"
          className={quoteBtnStyle}
          data-no-drag="true"
          data-interactive="true"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleNextQuote}
          title="Click to cycle fortune"
        >
          <q id="teddy-quote-text" className={quoteTextStyle}>
            {quote}
          </q>
        </button>
      </figure>
    </DraggableWidget>
  );
};

export default render;
