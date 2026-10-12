import { css } from '@emotion/css';
import {
  ASSET_CANDLE_STICK,
  ASSET_LACE_CAMEO_BOW,
  ASSET_STRAWBERRY_BOW_SEAL,
  ASSET_STRAWBERRY_JAM_JAR,
  ASSET_TEA_CUP,
  ASSET_TWIN_CHERRIES,
} from '@/shared/assets/images';
import { DreamCard } from '@/shared/components/cards';
import { MingCuteIcon } from '@/shared/components/icons';
import { DraggableWidget } from '@/shared/components/layout';
import { StickerImage, TapeSticker } from '@/shared/components/stickers';
import { formatSystemDate, getI18n } from '@/shared/i18n';
import { ensurePinkDaydreamFonts } from '@/shared/styles/global';
import { theme } from '@/shared/styles/theme';
import type { UbersichtRenderProps } from '@/shared/types/ubersicht';

// Inject custom fonts and global styles
ensurePinkDaydreamFonts();

/**
 * 01 — Sweet Time (Pink Daydream Maison Clock)
 * Awwwards-level luxury confectionery clock widget featuring an antique lace
 * cameo medallion and dynamic time-of-day confectionery companions.
 */

export const command = "date '+%Y|%m|%d|%H|%M|%S|%A|%B'";
export const refreshFrequency = 1000;

export const className = `
  top: ${theme.safeArea.top};
  left: ${theme.safeArea.left};
  font-family: ${theme.fonts.rounded};
  z-index: 100;
  pointer-events: none;
`;

interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  period: 'AM' | 'PM';
  dayOfWeek: string;
  monthName: string;
  dayNumber: string;
  year: string;
  rawHour: number;
}

function parseOutputOrNow(output?: string): TimeState {
  const now = new Date();
  const dayOfWeek = formatSystemDate(now, { weekday: 'long' });
  const monthName = formatSystemDate(now, { month: 'short' });

  if (output?.includes('|')) {
    const parts = output.trim().split('|');
    const [pYear, , pDay, pHour, pMin, pSec] = parts;
    if (pYear && pDay && pHour && pMin && pSec) {
      const hNum = parseInt(pHour, 10);
      const isPm = hNum >= 12;
      const h12 = hNum % 12 || 12;

      return {
        hours: String(h12).padStart(2, '0'),
        minutes: pMin,
        seconds: pSec,
        period: isPm ? 'PM' : 'AM',
        dayOfWeek,
        monthName,
        dayNumber: pDay,
        year: pYear,
        rawHour: hNum,
      };
    }
  }

  const h = now.getHours();
  return {
    hours: String(h % 12 || 12).padStart(2, '0'),
    minutes: String(now.getMinutes()).padStart(2, '0'),
    seconds: String(now.getSeconds()).padStart(2, '0'),
    period: h >= 12 ? 'PM' : 'AM',
    dayOfWeek,
    monthName,
    dayNumber: String(now.getDate()),
    year: String(now.getFullYear()),
    rawHour: h,
  };
}

// Containers & Layout
const containerStyle = css`
  position: relative;
  padding-top: 32px;
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 14px;
  display: inline-block;
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const topCameoAnchor = css`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  cursor: grab;
  pointer-events: auto;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: translateX(-50%) translateY(-2px) scale(1.08);
  }

  &:active {
    cursor: grabbing;
    transform: translateX(-50%) scale(0.96);
  }
`;

const cornerStickerLeft = css`
  position: absolute;
  top: 24px;
  left: 0;
  z-index: 8;
  transform: rotate(-12deg);
`;

const cornerStickerRight = css`
  position: absolute;
  bottom: 8px;
  right: 2px;
  z-index: 8;
  transform: rotate(14deg);
`;

const headerRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: ${theme.colors.roseDeep};
  letter-spacing: 1.4px;
  text-transform: uppercase;
  font-weight: 800;
  padding: 0 4px;
  margin-top: 6px;
  border-bottom: 1px dashed rgba(239, 169, 196, 0.4);
  padding-bottom: 6px;
`;

const clockBodyRow = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const timeDisplayStyle = css`
  display: flex;
  align-items: baseline;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.03);
  }
`;

const digitsStyle = css`
  font-size: 60px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -2px;
  color: ${theme.colors.roseDeep};
  text-shadow: 
    0 2px 4px rgba(255, 255, 255, 0.8),
    0 4px 16px rgba(239, 169, 196, 0.45);
  font-variant-numeric: tabular-nums;
`;

const colonStyle = css`
  font-size: 50px;
  font-weight: 800;
  color: ${theme.colors.rose};
  opacity: 0.9;
  animation: pulseColon 2s infinite ease-in-out;

  @keyframes pulseColon {
    0%, 100% { opacity: 0.95; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(0.92); }
  }
`;

const secondsColStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 4px;
  gap: 3px;
`;

const secondsBadgeStyle = css`
  font-size: 14px;
  font-weight: 800;
  color: ${theme.colors.roseDeep};
  background: linear-gradient(135deg, rgba(255, 248, 241, 0.95), rgba(247, 220, 231, 0.8));
  padding: 2px 7px;
  border-radius: ${theme.radii.xs};
  border: 1px solid rgba(239, 169, 196, 0.5);
  box-shadow: inset 0 1px 1px #fff, 0 2px 6px rgba(239, 169, 196, 0.2);
  font-variant-numeric: tabular-nums;
`;

const periodBadgeStyle = css`
  font-size: 11px;
  font-weight: 900;
  color: ${theme.colors.roseMuted};
  letter-spacing: 0.8px;
`;

const confectioneryCompanion = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(253, 235, 243, 0.65) 100%);
  border-radius: ${theme.radii.md};
  border: 1px solid rgba(239, 169, 196, 0.45);
  box-shadow: 0 4px 12px rgba(239, 169, 196, 0.25);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.05) rotate(2deg);
  }
`;

const dateTagContainer = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const tapeStyle = css`
  position: absolute;
  top: -9px;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
  opacity: 0.95;
  z-index: 2;
`;

const dateTagStyle = css`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFFDF9;
  border: 1.5px dashed rgba(239, 169, 196, 0.7);
  padding: 6px 20px;
  border-radius: ${theme.radii.md};
  box-shadow: 
    0 2px 6px rgba(239, 169, 196, 0.2),
    0 8px 18px rgba(180, 80, 110, 0.1);
  transform: rotate(-0.5deg);
`;

const handwrittenDateStyle = css`
  font-family: ${theme.fonts.handwritten};
  font-size: 26px;
  color: ${theme.colors.textPrimary};
  line-height: 1;
  letter-spacing: 0.5px;
`;

export const render = ({ output }: UbersichtRenderProps) => {
  const time = parseOutputOrNow(output);

  // Determine time-of-day companion asset
  let companionAsset = ASSET_STRAWBERRY_JAM_JAR;
  let companionAlt = 'Artisanal Strawberry Jam Jar';
  if (time.rawHour >= 6 && time.rawHour < 12) {
    companionAsset = ASSET_TWIN_CHERRIES;
    companionAlt = 'Morning Fresh Twin Cherries';
  } else if (time.rawHour >= 12 && time.rawHour < 18) {
    companionAsset = ASSET_STRAWBERRY_JAM_JAR;
    companionAlt = 'Afternoon Strawberry Jam Jar';
  } else if (time.rawHour >= 18 && time.rawHour < 22) {
    companionAsset = ASSET_TEA_CUP;
    companionAlt = 'Evening Warm Tea Cup';
  } else {
    companionAsset = ASSET_CANDLE_STICK;
    companionAlt = 'Nighttime Soft Candle';
  }

  return (
    <DraggableWidget widgetId="sweet-time" className={containerStyle}>
      {/* Antique Lace Cameo Medallion (Primary Ergonomic Drag Handle) */}
      <div
        className={`${topCameoAnchor} widget-drag-handle`}
        data-drag-handle="true"
        title={getI18n().common.dragHint}
      >
        <StickerImage
          src={ASSET_LACE_CAMEO_BOW}
          size={56}
          interactive
          alt="Antique Porcelain Cameo Medallion (Drag Handle)"
        />
      </div>

      {/* Die-cut corner stickers */}
      <div className={cornerStickerLeft}>
        <StickerImage src={ASSET_TWIN_CHERRIES} size={40} interactive alt="Twin Cherries Sticker" />
      </div>

      <div className={cornerStickerRight}>
        <StickerImage
          src={ASSET_STRAWBERRY_BOW_SEAL}
          size={42}
          interactive
          alt="Strawberry Bow Seal"
        />
      </div>

      {/* Luxury Stationery Scrapbook Card */}
      <DreamCard variant="stationery" padding="20px 24px 18px 24px">
        {/* Editorial Subtitle Header */}
        <header className={headerRowStyle}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <MingCuteIcon name="sparkles-2-line" color={theme.colors.rose} size={13} />
            {getI18n().common.sweetTime}
          </span>
          <MingCuteIcon name="heart-line" color={theme.colors.roseMuted} size={13} />
        </header>

        {/* Clock Digits & Companion Confectionery */}
        <div className={clockBodyRow}>
          <time
            dateTime={`${time.year}-${time.dayNumber}T${time.hours}:${time.minutes}:${time.seconds}`}
            aria-label={`${time.hours}:${time.minutes} ${time.period}`}
            className={timeDisplayStyle}
            data-no-drag="true"
            data-interactive="true"
            onMouseDown={(e) => e.stopPropagation()}
            title="Sweet clock display"
          >
            <span className={digitsStyle}>{time.hours}</span>
            <span className={colonStyle} aria-hidden="true">
              :
            </span>
            <span className={digitsStyle}>{time.minutes}</span>

            <div className={secondsColStyle}>
              <span className={periodBadgeStyle}>{time.period}</span>
              <span className={secondsBadgeStyle}>{time.seconds}</span>
            </div>
          </time>

          {/* Time-reactive Confectionery Companion on Luxury Pedestal */}
          <div
            className={confectioneryCompanion}
            data-no-drag="true"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <StickerImage src={companionAsset} size={66} interactive glow alt={companionAlt} />
          </div>
        </div>

        {/* Handwritten Japanese tear-off date tag */}
        <div
          className={dateTagContainer}
          data-no-drag="true"
          data-selectable="true"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <TapeSticker width={95} height={15} className={tapeStyle} />
          <time dateTime={`${time.year}-${time.dayNumber}`} className={dateTagStyle}>
            <MingCuteIcon name="calendar-date-line" color={theme.colors.roseDeep} size={15} />
            <span className={handwrittenDateStyle} style={{ userSelect: 'text' }}>
              {time.dayOfWeek}, {time.monthName} {time.dayNumber}
            </span>
          </time>
        </div>
      </DreamCard>
    </DraggableWidget>
  );
};

export default render;
