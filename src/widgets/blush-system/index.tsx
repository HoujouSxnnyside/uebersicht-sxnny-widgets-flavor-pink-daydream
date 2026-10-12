import { css, keyframes } from '@emotion/css';
import { ASSET_BOW_TIE, ASSET_STRAWBERRY_SHORTCAKE } from '@/shared/assets/images';
import { DreamCard } from '@/shared/components/cards';
import { MingCuteIcon } from '@/shared/components/icons';
import { DraggableWidget } from '@/shared/components/layout';
import { StickerImage } from '@/shared/components/stickers';
import { getI18n } from '@/shared/i18n';
import { ensurePinkDaydreamFonts } from '@/shared/styles/global';
import { theme } from '@/shared/styles/theme';
import type { UbersichtRenderProps } from '@/shared/types/ubersicht';

// Ensure Pink Daydream embedded fonts
ensurePinkDaydreamFonts();

/**
 * 06 — Blush System
 * macOS system monitor presented as delicate coquette jewels:
 * CPU (illuminating pearls), RAM (rose petal bar),
 * Battery (heart gem), and Storage (amethyst lilac track).
 */

export const command = './sxnny-pink-daydream/bin/system-cli 2>/dev/null || ./bin/system-cli';
export const refreshFrequency = 3000; // Refresh every 3 seconds

export const className = `
  bottom: ${theme.safeArea.bottom};
  right: ${theme.safeArea.right};
  font-family: ${theme.fonts.rounded};
  z-index: 95;
  pointer-events: none;
`;

const pulseChargeAnim = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 2px rgba(239, 169, 196, 0.4));
  }
  50% {
    transform: scale(1.12);
    filter: drop-shadow(0 0 6px rgba(216, 121, 158, 0.7));
  }
`;

const containerStyle = css`
  position: relative;
  display: inline-block;
  padding-top: 14px;
  pointer-events: none;
`;

const bowPlacementStyle = css`
  position: absolute;
  top: 4px;
  left: 20px;
  z-index: 10;
  cursor: grab;
  pointer-events: auto;

  &:active {
    cursor: grabbing;
  }
`;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(239, 169, 196, 0.35);
  padding-bottom: 8px;
  margin-top: 2px;
`;

const titleGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-left: 28px; /* Spacing clearance for corner ribbon bow */
`;

const titleStyle = css`
  font-family: ${theme.fonts.handwritten};
  font-size: 22px;
  line-height: 1;
  color: ${theme.colors.textPrimary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const subtitleStyle = css`
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: ${theme.colors.roseDeep};
  text-transform: uppercase;
  margin: 0;
`;

const metricsGridStyle = css`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const metricRowStyle = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateX(2px);
  }
`;

const metricLabelRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
`;

const metricTitleStyle = css`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  color: ${theme.colors.textPrimary};
`;

const metricValueStyle = css`
  font-size: 11px;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  font-variant-numeric: tabular-nums;
`;

/* 1. CPU: 5 Perlas de Joya */
const pearlsContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(247, 220, 231, 0.35);
  padding: 4px 8px;
  border-radius: ${theme.radii.full};
  border: 1px solid rgba(239, 169, 196, 0.3);
`;

const pearlItemStyle = (active: boolean) => css`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${
    active
      ? 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #F7DCE7 30%, #D8799E 100%)'
      : 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FFF8F1 60%, #E8D0C0 100%)'
  };
  border: 1px solid ${active ? 'rgba(216, 121, 158, 0.8)' : 'rgba(232, 208, 192, 0.6)'};
  box-shadow: ${active ? '0 2px 5px rgba(216, 121, 158, 0.45)' : 'none'};
  transition: all 0.4s ease;
`;

/* 2. Barra de Joya (Memoria & Disco) */
const jewelTrackStyle = css`
  position: relative;
  height: 9px;
  background: rgba(247, 220, 231, 0.4);
  border-radius: ${theme.radii.full};
  overflow: hidden;
  border: 1px solid rgba(239, 169, 196, 0.35);
`;

const jewelFillStyle = (percent: number, colorStart: string, colorEnd: string) => css`
  height: 100%;
  width: ${Math.min(Math.max(percent, 0), 100)}%;
  background: linear-gradient(90deg, ${colorStart}, ${colorEnd});
  border-radius: ${theme.radii.full};
  box-shadow: 0 1px 4px rgba(216, 121, 158, 0.35);
  transition: width 0.5s ease;
`;

/* 3. Batería (Corazón y Barra) */
const _batteryWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const heartGemStyle = (isCharging: boolean, level: number) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${level < 20 ? '#E26D92' : theme.colors.roseDeep};
  animation: ${isCharging ? css`${pulseChargeAnim} 1.8s ease-in-out infinite` : 'none'};
`;

interface SystemData {
  cpuPercent: number;
  memoryPercent: number;
  memoryUsedGB: number;
  memoryTotalGB: number;
  diskPercent: number;
  diskUsedGB: number;
  diskTotalGB: number;
  hasBattery: boolean;
  batteryPercent: number;
  isCharging: boolean;
  isPluggedIn: boolean;
}

const fallbackData: SystemData = {
  cpuPercent: 8,
  memoryPercent: 62,
  memoryUsedGB: 9.9,
  memoryTotalGB: 16.0,
  diskPercent: 45,
  diskUsedGB: 418.5,
  diskTotalGB: 926.0,
  hasBattery: true,
  batteryPercent: 92,
  isCharging: false,
  isPluggedIn: true,
};

function parseSystemOutput(output?: string): SystemData {
  if (!output) return fallbackData;
  try {
    const parsed = JSON.parse(output.trim());
    return {
      cpuPercent: parsed.cpuPercent ?? fallbackData.cpuPercent,
      memoryPercent: parsed.memoryPercent ?? fallbackData.memoryPercent,
      memoryUsedGB: parsed.memoryUsedGB ?? fallbackData.memoryUsedGB,
      memoryTotalGB: parsed.memoryTotalGB ?? fallbackData.memoryTotalGB,
      diskPercent: parsed.diskPercent ?? fallbackData.diskPercent,
      diskUsedGB: parsed.diskUsedGB ?? fallbackData.diskUsedGB,
      diskTotalGB: parsed.diskTotalGB ?? fallbackData.diskTotalGB,
      hasBattery: parsed.hasBattery ?? fallbackData.hasBattery,
      batteryPercent: parsed.batteryPercent ?? fallbackData.batteryPercent,
      isCharging: parsed.isCharging ?? fallbackData.isCharging,
      isPluggedIn: parsed.isPluggedIn ?? fallbackData.isPluggedIn,
    };
  } catch {
    return fallbackData;
  }
}

export const render = ({ output }: UbersichtRenderProps) => {
  const i18n = getI18n();
  const data = parseSystemOutput(output);

  // Active pearls count for CPU (1 to 5)
  const activePearls = Math.max(1, Math.min(5, Math.ceil(data.cpuPercent / 20)));

  return (
    <DraggableWidget widgetId="blush-system" className={containerStyle}>
      {/* Decorative bow sticker (Primary Ergonomic Drag Handle) */}
      <div
        className={`${bowPlacementStyle} widget-drag-handle`}
        data-drag-handle="true"
        title={i18n.common.dragHint}
      >
        <StickerImage src={ASSET_BOW_TIE} size={48} interactive alt="Ribbon Bow (Drag Handle)" />
      </div>

      <DreamCard
        variant="confectionery"
        padding="20px 22px 18px 22px"
        style={{ width: 295, display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {/* Header with jewel title */}
        <header className={headerStyle}>
          <div className={titleGroupStyle}>
            <h2 className={titleStyle}>
              <StickerImage src={ASSET_STRAWBERRY_SHORTCAKE} size={32} alt="Strawberry Shortcake" />
              {i18n.blushSystem.title}
            </h2>
            <p className={subtitleStyle}>{i18n.blushSystem.subtitle}</p>
          </div>

          <MingCuteIcon name="sparkles-line" size={16} color={theme.colors.roseDeep} />
        </header>

        {/* Metrics rendered as delicate coquette jewels */}
        <div className={metricsGridStyle} data-no-drag="true">
          {/* 1. CPU (Filling pearl beads) */}
          <div
            className={metricRowStyle}
            data-no-drag="true"
            data-interactive="true"
            onMouseDown={(e) => e.stopPropagation()}
            title="CPU load"
          >
            <div className={metricLabelRowStyle}>
              <span className={metricTitleStyle}>
                <MingCuteIcon name="chip-line" size={13} color={theme.colors.roseDeep} />
                {i18n.blushSystem.cpu}
              </span>
              <span className={metricValueStyle}>{data.cpuPercent.toFixed(1)}%</span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={Math.round(data.cpuPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={i18n.blushSystem.cpu}
              className={pearlsContainerStyle}
            >
              {[0, 1, 2, 3, 4].map((idx) => (
                <div key={idx} className={pearlItemStyle(idx < activePearls)} />
              ))}
            </div>
          </div>

          {/* 2. RAM Memory (Rose petal track) */}
          <div
            className={metricRowStyle}
            data-no-drag="true"
            data-interactive="true"
            onMouseDown={(e) => e.stopPropagation()}
            title="Memory usage"
          >
            <div className={metricLabelRowStyle}>
              <span className={metricTitleStyle}>
                <MingCuteIcon name="sparkles-2-line" size={13} color={theme.colors.roseDeep} />
                {i18n.blushSystem.memory}
              </span>
              <span className={metricValueStyle}>
                {data.memoryUsedGB.toFixed(1)} / {data.memoryTotalGB.toFixed(0)} GB
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={Math.round(data.memoryPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={i18n.blushSystem.memory}
              className={jewelTrackStyle}
            >
              <div
                className={jewelFillStyle(
                  data.memoryPercent,
                  theme.colors.blush,
                  theme.colors.roseDeep,
                )}
              />
            </div>
          </div>

          {/* 3. Battery (Color-shifting heart gem) */}
          {data.hasBattery && (
            <div
              className={metricRowStyle}
              data-no-drag="true"
              data-interactive="true"
              onMouseDown={(e) => e.stopPropagation()}
              title="Battery charge"
            >
              <div className={metricLabelRowStyle}>
                <span className={metricTitleStyle}>
                  <span className={heartGemStyle(data.isCharging, data.batteryPercent)}>
                    <MingCuteIcon
                      name={data.isCharging ? 'battery-charging-line' : 'heart-fill'}
                      size={14}
                      color={theme.colors.roseDeep}
                    />
                  </span>
                  {i18n.blushSystem.battery}
                </span>
                <span className={metricValueStyle}>
                  {data.batteryPercent}% •{' '}
                  {data.isCharging
                    ? i18n.blushSystem.charging
                    : data.isPluggedIn
                      ? i18n.blushSystem.plugged
                      : i18n.blushSystem.discharging}
                </span>
              </div>

              <div
                role="progressbar"
                aria-valuenow={data.batteryPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={i18n.blushSystem.battery}
                className={jewelTrackStyle}
              >
                <div
                  className={jewelFillStyle(
                    data.batteryPercent,
                    theme.colors.blush,
                    data.batteryPercent < 20 ? '#E26D92' : theme.colors.rose,
                  )}
                />
              </div>
            </div>
          )}

          {/* 4. Disk / Storage (Amethyst lilac track) */}
          <div
            className={metricRowStyle}
            data-no-drag="true"
            data-interactive="true"
            onMouseDown={(e) => e.stopPropagation()}
            title="Disk usage"
          >
            <div className={metricLabelRowStyle}>
              <span className={metricTitleStyle}>
                <MingCuteIcon name="drive-line" size={13} color={theme.colors.lilacDeep} />
                {i18n.blushSystem.storage}
              </span>
              <span className={metricValueStyle}>
                {data.diskUsedGB.toFixed(0)} / {data.diskTotalGB.toFixed(0)} GB
              </span>
            </div>

            <div
              role="progressbar"
              aria-valuenow={Math.round(data.diskPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={i18n.blushSystem.storage}
              className={jewelTrackStyle}
            >
              <div
                className={jewelFillStyle(
                  data.diskPercent,
                  theme.colors.blush,
                  theme.colors.lilacDeep,
                )}
              />
            </div>
          </div>
        </div>
      </DreamCard>
    </DraggableWidget>
  );
};

export default render;
