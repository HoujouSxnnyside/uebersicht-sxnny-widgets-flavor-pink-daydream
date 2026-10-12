import { css } from '@emotion/css';
import { ASSET_BOW_TIE, ASSET_TWIN_CHERRIES } from '@/shared/assets/images';
import { DreamCard } from '@/shared/components/cards';
import { MingCuteIcon } from '@/shared/components/icons';
import { DraggableWidget } from '@/shared/components/layout';
import { StickerImage } from '@/shared/components/stickers';
import { getI18n } from '@/shared/i18n';
import { ensurePinkDaydreamFonts } from '@/shared/styles/global';
import { theme } from '@/shared/styles/theme';
import type { UbersichtRenderProps } from '@/shared/types/ubersicht';
import { safeParseJson } from '@/shared/utils/json';
import { GardenScene } from './components/GardenScene';

// Ensure Pink Daydream embedded fonts
ensurePinkDaydreamFonts();

/**
 * Command to execute compiled Swift Weather CLI
 */
export const command = './sxnny-pink-daydream/bin/weather-cli 2>/dev/null || ./bin/weather-cli';

/**
 * Refresh frequency: 10 minutes
 */
export const refreshFrequency = 600000;

/**
 * Desktop placement on top right corner respecting safe area
 */
export const className = `
  top: ${theme.safeArea.top};
  right: ${theme.safeArea.right};
  font-family: ${theme.fonts.rounded};
  z-index: 100;
  pointer-events: none;
`;

interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  precipitationProbability: number;
  condition: 'sunny' | 'partlyCloudy' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'night';
  conditionText: string;
  isDay: boolean;
  city: string;
}

const fallbackWeather: WeatherData = {
  temperature: 24.0,
  apparentTemperature: 23.5,
  precipitationProbability: 10,
  condition: 'sunny',
  conditionText: 'Sunny in the garden',
  isDay: true,
  city: 'Little Garden',
};

// Static styles
const containerStyle = css`
  position: relative;
  padding-top: 22px;
  padding-right: 8px;
  padding-left: 8px;
  display: inline-block;
  min-width: 250px;
  pointer-events: none;
  transition: box-shadow 0.2s ease, transform 0.1s ease-out;
`;

const bowBadgeStyle = css`
  position: absolute;
  top: 4px;
  right: 18px;
  z-index: 10;
  cursor: grab;
  pointer-events: auto;

  &:active {
    cursor: grabbing;
  }
`;

const cherryStickerStyle = css`
  position: absolute;
  bottom: 4px;
  left: 2px;
  z-index: 5;
`;

const headerRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: ${theme.colors.textMuted};
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0 4px 6px 4px;
`;

const gardenWrapperStyle = css`
  position: relative;
  background: linear-gradient(180deg, rgba(253, 241, 246, 0.6) 0%, rgba(255, 248, 241, 0.8) 100%);
  border-radius: ${theme.radii.lg};
  border: 1px solid rgba(239, 169, 196, 0.25);
  padding: 4px;
  margin-bottom: 12px;
  overflow: hidden;
`;

const dataRowStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const tempNumberStyle = css`
  font-size: 38px;
  font-weight: 900;
  line-height: 1;
  color: ${theme.colors.roseDeep};
  letter-spacing: -0.5px;
  text-shadow: 0 2px 8px rgba(239, 169, 196, 0.4);
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  font-family: inherit;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.06);
  }
`;

const tempMetaColStyle = css`
  display: flex;
  flex-direction: column;
  gap: 3px;
  align-items: flex-end;
`;

const feelsLikeBadgeStyle = css`
  font-size: 11px;
  font-weight: 700;
  color: ${theme.colors.textSecondary};
  background: rgba(247, 220, 231, 0.65);
  padding: 2px 7px;
  border-radius: ${theme.radii.xs};
  border: 1px solid rgba(255, 255, 255, 0.7);
`;

const rainBadgeStyle = css`
  font-size: 11px;
  font-weight: 700;
  color: #7B88C4;
  background: rgba(185, 166, 216, 0.25);
  padding: 2px 7px;
  border-radius: ${theme.radii.xs};
  border: 1px solid rgba(255, 255, 255, 0.7);
  display: inline-flex;
  align-items: center;
  gap: 3px;
`;

const conditionLabelStyle = css`
  font-family: ${theme.fonts.handwritten};
  font-size: 22px;
  color: ${theme.colors.textPrimary};
  text-align: center;
  line-height: 1;
  margin-top: 6px;
  padding: 6px 14px;
  background: #FFFDF9;
  border: 1.5px dashed rgba(239, 169, 196, 0.7);
  border-radius: ${theme.radii.sm};
  box-shadow: 0 2px 6px rgba(239, 169, 196, 0.15);
`;

export const render = ({ output }: UbersichtRenderProps) => {
  const data = safeParseJson<WeatherData>(output, fallbackWeather) || fallbackWeather;
  const i18n = getI18n();
  const localizedCondition = i18n.weather.conditions[data.condition] || data.conditionText;

  return (
    <DraggableWidget widgetId="weather-garden" className={containerStyle}>
      {/* Top ribbon sticker (Primary Ergonomic Drag Handle) */}
      <div
        className={`${bowBadgeStyle} widget-drag-handle`}
        data-drag-handle="true"
        title={getI18n().common.dragHint}
      >
        <StickerImage
          src={ASSET_BOW_TIE}
          size={54}
          interactive
          alt="Pink Daydream Ribbon Bow (Drag Handle)"
        />
      </div>

      {/* Ripe twin cherries corner sticker */}
      <div className={cherryStickerStyle}>
        <StickerImage
          src={ASSET_TWIN_CHERRIES}
          size={38}
          interactive
          alt="Ripe Twin Cherries Sticker"
        />
      </div>

      {/* Scrapbook stationery card */}
      <DreamCard variant="stationery" padding="20px 22px 18px 22px">
        {/* Garden header */}
        <header className={headerRowStyle}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <MingCuteIcon name="sun-line" color={theme.colors.rose} size={14} />
            {data.city}
          </span>
          <span style={{ color: theme.colors.roseMuted, fontSize: 10 }}>{i18n.common.garden}</span>
        </header>

        {/* Dynamic garden scene reflecting current weather */}
        <div className={gardenWrapperStyle}>
          <GardenScene condition={data.condition} />
        </div>

        {/* Data row: Temperature, feels-like, and rain probability */}
        <div className={dataRowStyle} data-no-drag="true" onMouseDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            id="weather-temp-number"
            className={tempNumberStyle}
            aria-label={`${Math.round(data.temperature)} degrees`}
            data-no-drag="true"
            data-interactive="true"
            title="Click to toggle Celsius / Fahrenheit"
            onClick={(e) => {
              e.stopPropagation();
              try {
                const current = localStorage.getItem('pink_daydream_weather_unit');
                const nextUnit = current === 'F' ? 'C' : 'F';
                localStorage.setItem('pink_daydream_weather_unit', nextUnit);
                const tempEl = document.getElementById('weather-temp-number');
                if (tempEl) {
                  const val =
                    nextUnit === 'F'
                      ? Math.round(data.temperature * 1.8 + 32)
                      : Math.round(data.temperature);
                  tempEl.textContent = `${val}${nextUnit === 'F' ? '°F' : '°'}`;
                }
              } catch {}
            }}
          >
            {typeof window !== 'undefined' &&
            localStorage.getItem('pink_daydream_weather_unit') === 'F'
              ? `${Math.round(data.temperature * 1.8 + 32)}°F`
              : `${Math.round(data.temperature)}°`}
          </button>

          <div className={tempMetaColStyle} data-no-drag="true">
            <div className={feelsLikeBadgeStyle}>
              {i18n.weather.feelsLike} {Math.round(data.apparentTemperature)}°
            </div>
            <div className={rainBadgeStyle}>
              <MingCuteIcon name="cloud-line" size={11} color="#7B88C4" />
              {data.precipitationProbability}% {i18n.weather.rainChance}
            </div>
          </div>
        </div>

        {/* Handwritten weather condition label */}
        <div
          className={conditionLabelStyle}
          data-no-drag="true"
          data-selectable="true"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {localizedCondition}
        </div>
      </DreamCard>
    </DraggableWidget>
  );
};

export default render;
