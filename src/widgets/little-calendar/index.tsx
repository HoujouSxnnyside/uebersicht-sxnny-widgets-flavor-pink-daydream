import { css } from '@emotion/css';
import { ASSET_BUNNY_BERRY_BOW, ASSET_STRAWBERRY_CUPCAKE } from '@/shared/assets/images';
import { DreamCard } from '@/shared/components/cards';
import { MingCuteIcon } from '@/shared/components/icons';
import { DraggableWidget } from '@/shared/components/layout';
import { StickerImage, TapeSticker } from '@/shared/components/stickers';
import { formatSystemDate, getI18n } from '@/shared/i18n';
import { ensurePinkDaydreamFonts } from '@/shared/styles/global';
import { theme } from '@/shared/styles/theme';
import type { UbersichtRenderProps } from '@/shared/types/ubersicht';
import { safeParseJson } from '@/shared/utils/json';

// Ensure Pink Daydream fonts
ensurePinkDaydreamFonts();

/**
 * Command to execute compiled Swift EventKit CLI
 */
export const command = './sxnny-pink-daydream/bin/calendar-cli 2>/dev/null || ./bin/calendar-cli';

/**
 * Refresh frequency: 1 minute
 */
export const refreshFrequency = 60000;

/**
 * Desktop placement on left column below Sweet Time
 */
export const className = `
  top: calc(${theme.safeArea.top} + 215px);
  left: ${theme.safeArea.left};
  font-family: ${theme.fonts.rounded};
  z-index: 100;
  pointer-events: none;
`;

interface CalendarEventItem {
  id: string;
  day: Int32Array | number;
  title: string;
  isAllDay: boolean;
  colorHex?: string;
}

interface CalendarData {
  year: number;
  month: number;
  monthName: string;
  today: number;
  daysInMonth: number;
  firstWeekday: number; // 0 = Sunday, 1 = Monday, etc.
  events: CalendarEventItem[];
}

const fallbackCalendar: CalendarData = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  monthName: new Date().toLocaleDateString('en-US', { month: 'long' }),
  today: new Date().getDate(),
  daysInMonth: 31,
  firstWeekday: 4,
  events: [],
};

const _WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Static styles
const containerStyle = css`
  position: relative;
  padding-top: 18px;
  padding-left: 8px;
  padding-right: 8px;
  display: inline-block;
  min-width: 260px;
  pointer-events: none;
  transition: box-shadow 0.2s ease, transform 0.1s ease-out;
`;

const tapeTopStyle = css`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%) rotate(0.8deg);
  z-index: 10;
  opacity: 0.95;
  cursor: grab;
  pointer-events: auto;

  &:active {
    cursor: grabbing;
  }
`;

const flowerCornerStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  transform: rotate(-10deg);
`;

const pearlTopRight = css`
  position: absolute;
  top: 18px;
  right: 6px;
  z-index: 6;
`;

const headerStyle = css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 6px;
  margin-bottom: 12px;
  padding: 0 4px;
`;

const monthTitleStyle = css`
  font-family: ${theme.fonts.handwritten};
  font-size: 32px;
  color: ${theme.colors.roseDeep};
  line-height: 1;
  letter-spacing: 0.5px;
`;

const yearBadgeStyle = css`
  font-size: 11px;
  font-weight: 800;
  color: ${theme.colors.textSecondary};
  background: ${theme.colors.blush};
  padding: 2px 7px;
  border-radius: ${theme.radii.xs};
  letter-spacing: 0.5px;
`;

const weekdaysGridStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  text-align: center;
  font-size: 11px;
  font-weight: 800;
  color: ${theme.colors.textMuted};
  margin-bottom: 6px;
`;

const daysGridStyle = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 3px;
  text-align: center;
`;

const dayCellStyle = css`
  position: relative;
  height: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.textPrimary};
  border-radius: ${theme.radii.sm};
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  font-family: inherit;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(247, 220, 231, 0.45);
    transform: scale(1.12);
  }
`;

const emptyCellStyle = css`
  height: 28px;
`;

// Today highlight surrounded by a coquette heart
const todayHeartWrapper = css`
  position: relative;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF8F1;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(216, 121, 158, 0.4);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    filter: drop-shadow(0 2px 5px rgba(239, 169, 196, 0.5));
  }

  span {
    position: relative;
    z-index: 2;
  }
`;

const eventMarkerStyle = css`
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${theme.colors.rose};
`;

const notesBoxStyle = css`
  margin-top: 12px;
  padding: 8px 12px;
  background: #FFFDF9;
  border: 1.5px dashed rgba(239, 169, 196, 0.65);
  border-radius: ${theme.radii.sm};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: ${theme.colors.textSecondary};
  box-shadow: 0 2px 6px rgba(239, 169, 196, 0.12);
`;

export const render = ({ output }: UbersichtRenderProps) => {
  const data = safeParseJson<CalendarData>(output, fallbackCalendar) || fallbackCalendar;

  const totalCells = data.firstWeekday + data.daysInMonth;
  const daysArray = Array.from({ length: totalCells }, (_, i) => {
    if (i < data.firstWeekday) return null;
    return i - data.firstWeekday + 1;
  });

  // Map events by day
  const eventDaysSet = new Set((data.events || []).map((e) => Number(e.day)));

  const i18n = getI18n();
  // Localized month name according to macOS system preferences (e.g., "October")
  const localizedMonthName = formatSystemDate(new Date(data.year, data.month - 1, 1), {
    month: 'long',
  });
  // Capitalize first letter of month
  const capitalizedMonth = localizedMonthName.charAt(0).toUpperCase() + localizedMonthName.slice(1);

  return (
    <DraggableWidget widgetId="little-calendar" className={containerStyle}>
      {/* Top washi tape sticker (Primary Ergonomic Drag Handle) */}
      <div
        className={`${tapeTopStyle} widget-drag-handle`}
        data-drag-handle="true"
        title={getI18n().common.dragHint}
      >
        <TapeSticker width={95} height={16} />
      </div>

      {/* Sweet Bunny mascot corner sticker */}
      <div className={flowerCornerStyle}>
        <StickerImage src={ASSET_BUNNY_BERRY_BOW} size={48} interactive alt="Bunny Mascot" />
      </div>

      <div className={pearlTopRight}>
        <StickerImage
          src={ASSET_STRAWBERRY_CUPCAKE}
          size={42}
          interactive
          alt="Strawberry Cupcake"
        />
      </div>

      {/* Calendar stationery card */}
      <DreamCard variant="stationery" padding="20px 22px 18px 22px">
        {/* Header: Handwritten Month + Year */}
        <header className={headerStyle}>
          <h2 className={monthTitleStyle}>{capitalizedMonth}</h2>
          <time dateTime={`${data.year}`} className={yearBadgeStyle}>
            {data.year}
          </time>
        </header>

        {/* Localized weekdays header */}
        <div role="row" aria-label="Weekdays" className={weekdaysGridStyle}>
          {i18n.calendar.weekdays.map((w, idx) => (
            <div
              key={idx}
              role="columnheader"
              style={{ color: idx === 0 || idx === 6 ? theme.colors.rose : undefined }}
            >
              {w}
            </div>
          ))}
        </div>

        {/* Monthly grid */}
        <div role="grid" aria-label={`${capitalizedMonth} ${data.year}`} className={daysGridStyle}>
          {daysArray.map((dayNum, idx) => {
            if (dayNum === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  role="gridcell"
                  aria-hidden="true"
                  className={emptyCellStyle}
                />
              );
            }

            const isToday = dayNum === data.today;
            const hasEvent = eventDaysSet.has(dayNum);

            const handleSelectDay = (day: number) => (e: React.MouseEvent) => {
              e.stopPropagation();
              try {
                const notesSpan = document.getElementById('calendar-notes-text');
                if (notesSpan) {
                  const dayEvents = data.events.filter((ev) => ev.day === day);
                  if (dayEvents.length > 0) {
                    notesSpan.textContent = `${capitalizedMonth} ${day}: ${dayEvents.map((ev) => ev.title).join(', ')}`;
                  } else {
                    notesSpan.textContent = `${capitalizedMonth} ${day} — A lovely day to bloom`;
                  }
                }
              } catch {}
            };

            return (
              <button
                type="button"
                key={`day-${dayNum}`}
                role="gridcell"
                aria-current={isToday ? 'date' : undefined}
                className={dayCellStyle}
                data-no-drag="true"
                data-interactive="true"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={handleSelectDay(dayNum)}
                title={`${capitalizedMonth} ${dayNum}`}
              >
                {isToday ? (
                  <div className={todayHeartWrapper}>
                    {/* Filled pastel rose heart */}
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill={theme.colors.rose}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>{dayNum}</span>
                  </div>
                ) : (
                  <span>{dayNum}</span>
                )}

                {/* Event indicator marker */}
                {hasEvent && !isToday && <div className={eventMarkerStyle} />}
              </button>
            );
          })}
        </div>

        {/* Localized event notes footer */}
        <div className={notesBoxStyle} data-no-drag="true" onMouseDown={(e) => e.stopPropagation()}>
          <MingCuteIcon name="heart-line" size={13} color={theme.colors.rose} />
          <span id="calendar-notes-text">
            {data.events.length > 0
              ? i18n.calendar.eventCount(data.events.length)
              : i18n.calendar.lovelyDay}
          </span>
        </div>
      </DreamCard>
    </DraggableWidget>
  );
};

export default render;
