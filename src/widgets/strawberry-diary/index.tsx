import { css } from '@emotion/css';
import {
  ASSET_STRAWBERRY_BOW_SEAL,
  ASSET_STRAWBERRY_CRATE,
  ASSET_TWIN_CHERRIES,
} from '@/shared/assets/images';
import { DreamCard } from '@/shared/components/cards';
import { MingCuteIcon } from '@/shared/components/icons';
import { DraggableWidget } from '@/shared/components/layout';
import { StickerImage, TapeSticker } from '@/shared/components/stickers';
import { getI18n } from '@/shared/i18n';
import { ensurePinkDaydreamFonts } from '@/shared/styles/global';
import { theme } from '@/shared/styles/theme';
import type { UbersichtRenderProps } from '@/shared/types/ubersicht';

// Ensure Pink Daydream embedded fonts
ensurePinkDaydreamFonts();

/**
 * 05 — Strawberry Diary
 * Quick notes and tasks card inspired by strawberries, watermelon, and cherries.
 * Styled as stationery post-it tags.
 *
 * Reads custom notes from ~/.strawberry-diary.txt if present.
 * Supported format:
 *   [x] Completed task
 *   [ ] Pending task
 *   > Thought of the day
 *   Simple reminder
 */

export const command =
  "cat ~/.strawberry-diary.txt 2>/dev/null || cat ~/Documents/strawberry-diary.txt 2>/dev/null || echo ''";
export const refreshFrequency = 15000; // Refresh every 15s to reflect edits

export const className = `
  top: calc(${theme.safeArea.top} + 235px);
  right: ${theme.safeArea.right};
  font-family: ${theme.fonts.rounded};
  z-index: 95;
  pointer-events: none;
`;

const containerStyle = css`
  position: relative;
  display: inline-block;
  padding-top: 14px;
  pointer-events: none;
`;

const tapePlacementStyle = css`
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%) rotate(-1deg);
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
  border-bottom: 1.5px dashed rgba(239, 169, 196, 0.5);
  padding-bottom: 8px;
  margin-top: 4px;
`;

const titleGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const titleStyle = css`
  font-family: ${theme.fonts.handwritten};
  font-size: 23px;
  line-height: 1;
  color: ${theme.colors.textPrimary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const subtitleStyle = css`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${theme.colors.roseDeep};
  text-transform: uppercase;
  margin: 0;
`;

const stickersHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const taskListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const taskItemStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  background: rgba(255, 248, 241, 0.75);
  padding: 5px 8px;
  border-radius: ${theme.radii.sm};
  border: 1px solid rgba(239, 169, 196, 0.25);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(253, 241, 246, 0.95);
    border-color: rgba(239, 169, 196, 0.5);
    transform: translateX(2px);
  }
`;

const checkboxStyle = (done: boolean) => css`
  width: 15px;
  height: 15px;
  border-radius: 4px;
  border: 1.5px solid ${done ? theme.colors.roseDeep : theme.colors.roseMuted};
  background: ${done ? theme.colors.blush : '#FFFFFF'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s ease;
`;

const taskTextStyle = (done: boolean) => css`
  font-size: 12px;
  line-height: 1.35;
  color: ${done ? theme.colors.textMuted : theme.colors.textPrimary};
  text-decoration: ${done ? 'line-through' : 'none'};
  text-decoration-color: ${theme.colors.rose};
  font-weight: 500;
  margin: 0;
  flex: 1;
  user-select: text;
`;

const thoughtTagStyle = css`
  position: relative;
  background: linear-gradient(135deg, rgba(247, 220, 231, 0.55), rgba(201, 220, 192, 0.35));
  border-left: 3px solid ${theme.colors.roseDeep};
  border-radius: 0 ${theme.radii.sm} ${theme.radii.sm} 0;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(239, 169, 196, 0.25);
  }
`;

const thoughtHeaderStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${theme.colors.roseDeep};
`;

const thoughtTextStyle = css`
  font-family: ${theme.fonts.handwritten};
  font-size: 17px;
  line-height: 1.25;
  color: ${theme.colors.textPrimary};
  margin: 0;
  user-select: text;
`;

const footerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 2px;
`;

const pathHintStyle = css`
  font-size: 9px;
  color: ${theme.colors.textMuted};
  font-family: monospace;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
  user-select: text;
`;

interface ParsedDiary {
  tasks: { text: string; done: boolean }[];
  thought?: string;
  isCustomFile: boolean;
}

const STORAGE_OVERRIDE_KEY = 'pink_daydream_tasks_override';

function getTaskOverrides(): Record<string, boolean> {
  if (typeof window === 'undefined' || !window.localStorage) return {};
  try {
    const raw = localStorage.getItem(STORAGE_OVERRIDE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function parseDiaryContent(raw?: string): ParsedDiary {
  const i18n = getI18n();
  const trimmed = typeof raw === 'string' ? raw.trim() : '';
  const overrides = getTaskOverrides();

  if (!trimmed) {
    const defaultTasks = i18n.diary.defaultTasks.map((t) => ({
      text: t.text,
      done: overrides[t.text] ?? t.done,
    }));
    return {
      tasks: defaultTasks,
      thought: i18n.diary.thought,
      isCustomFile: false,
    };
  }

  const lines = trimmed
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const tasks: { text: string; done: boolean }[] = [];
  let thought: string | undefined;

  for (const line of lines) {
    if (line.startsWith('>')) {
      thought = line.slice(1).trim();
    } else if (line.startsWith('[x]') || line.startsWith('[X]')) {
      const text = line.slice(3).trim();
      tasks.push({ text, done: overrides[text] !== undefined ? overrides[text] : true });
    } else if (line.startsWith('[ ]')) {
      const text = line.slice(3).trim();
      tasks.push({ text, done: overrides[text] !== undefined ? overrides[text] : false });
    } else if (line.startsWith('- [x]') || line.startsWith('- [X]')) {
      const text = line.slice(5).trim();
      tasks.push({ text, done: overrides[text] !== undefined ? overrides[text] : true });
    } else if (line.startsWith('- [ ]')) {
      const text = line.slice(5).trim();
      tasks.push({ text, done: overrides[text] !== undefined ? overrides[text] : false });
    } else if (line.startsWith('- ')) {
      const text = line.slice(2).trim();
      tasks.push({ text, done: overrides[text] !== undefined ? overrides[text] : false });
    } else {
      tasks.push({ text: line, done: overrides[line] !== undefined ? overrides[line] : false });
    }
  }

  return {
    tasks: tasks.length > 0 ? tasks.slice(0, 5) : i18n.diary.defaultTasks,
    thought: thought || i18n.diary.thought,
    isCustomFile: true,
  };
}

const taskBtnStyle = css`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: flex-start;
  gap: 9px;
  width: 100%;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
`;

const thoughtBtnStyle = css`
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
`;

export const render = ({ output }: UbersichtRenderProps) => {
  const i18n = getI18n();
  const diary = parseDiaryContent(output);

  const handleToggleTask = (taskText: string, currentDone: boolean) => (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const overrides = getTaskOverrides();
      const nextDone = !currentDone;
      overrides[taskText] = nextDone;
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_OVERRIDE_KEY, JSON.stringify(overrides));
      }

      const liEl = (e.currentTarget as HTMLElement).closest('li');
      if (liEl) {
        const checkboxEl = liEl.querySelector<HTMLElement>("[role='checkbox']");
        const textEl = liEl.querySelector<HTMLElement>('p');
        if (checkboxEl) {
          checkboxEl.setAttribute('aria-checked', String(nextDone));
          checkboxEl.style.backgroundColor = nextDone ? theme.colors.blush : '#FFFFFF';
          checkboxEl.style.borderColor = nextDone ? theme.colors.roseDeep : theme.colors.roseMuted;
          if (nextDone) {
            checkboxEl.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.roseDeep}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
          } else {
            checkboxEl.innerHTML = '';
          }
        }
        if (textEl) {
          textEl.style.textDecoration = nextDone ? 'line-through' : 'none';
          textEl.style.color = nextDone ? theme.colors.textMuted : theme.colors.textPrimary;
        }
      }
    } catch {}
  };

  const handleCopyThought = (thoughtText: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(thoughtText).catch(() => {});
      }
      const tagEl = (e.currentTarget as HTMLElement).closest('blockquote');
      if (tagEl) {
        const headerSpan = tagEl.querySelector('div span');
        if (headerSpan) {
          const originalText = headerSpan.textContent;
          headerSpan.textContent = 'Copied to clipboard';
          setTimeout(() => {
            headerSpan.textContent = originalText;
          }, 1500);
        }
      }
    } catch {}
  };

  return (
    <DraggableWidget widgetId="strawberry-diary" className={containerStyle}>
      {/* Top washi tape sticker (Primary Ergonomic Drag Handle) */}
      <div
        className={`${tapePlacementStyle} widget-drag-handle`}
        data-drag-handle="true"
        title={i18n.common.dragHint}
      >
        <TapeSticker width={80} height={15} color="rgba(201, 220, 192, 0.9)" />
      </div>

      <DreamCard
        variant="notebook"
        padding="20px 22px 18px 22px"
        style={{ width: 295, display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {/* Header with title and stickers */}
        <header className={headerStyle}>
          <div className={titleGroupStyle}>
            <h2 className={titleStyle}>
              <StickerImage
                src={ASSET_STRAWBERRY_BOW_SEAL}
                size={32}
                interactive
                alt="Strawberry Seal"
              />
              {i18n.diary.title}
            </h2>
            <p className={subtitleStyle}>{i18n.diary.subtitle}</p>
          </div>

          <div className={stickersHeaderStyle}>
            <StickerImage src={ASSET_STRAWBERRY_CRATE} size={36} interactive alt="Berry Crate" />
            <StickerImage src={ASSET_TWIN_CHERRIES} size={32} interactive alt="Cherries" />
          </div>
        </header>

        {/* Notes and tasks list */}
        <ul
          className={taskListStyle}
          style={{ listStyle: 'none', margin: 0, padding: 0 }}
          data-no-drag="true"
        >
          {diary.tasks.map((task, idx) => (
            <li key={`task-${task.text}-${idx}`} className={taskItemStyle}>
              <button
                type="button"
                className={taskBtnStyle}
                data-no-drag="true"
                data-interactive="true"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={handleToggleTask(task.text, task.done)}
                title="Click to toggle completion"
              >
                <span
                  role="checkbox"
                  aria-checked={task.done}
                  aria-label={task.text}
                  className={checkboxStyle(task.done)}
                >
                  {task.done && (
                    <MingCuteIcon name="check-line" size={10} color={theme.colors.roseDeep} />
                  )}
                </span>
                <p className={taskTextStyle(task.done)}>{task.text}</p>
              </button>
            </li>
          ))}
        </ul>

        {/* Thought of the day */}
        {diary.thought && (
          <blockquote className={thoughtTagStyle} style={{ margin: 0 }}>
            <button
              type="button"
              className={thoughtBtnStyle}
              data-no-drag="true"
              data-interactive="true"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={handleCopyThought(diary.thought)}
              title="Click to copy quote to clipboard"
            >
              <div className={thoughtHeaderStyle}>
                <MingCuteIcon name="quill-pen-line" size={11} color={theme.colors.roseDeep} />
                <span>{i18n.diary.thoughtLabel}</span>
              </div>
              <p className={thoughtTextStyle}>"{diary.thought}"</p>
            </button>
          </blockquote>
        )}

        {/* Tag footer with notes file indicator */}
        <footer className={footerStyle}>
          <span
            className={pathHintStyle}
            data-no-drag="true"
            data-selectable="true"
            onMouseDown={(e) => e.stopPropagation()}
            title="Personal notes location: ~/.strawberry-diary.txt"
          >
            <MingCuteIcon name="bookmark-line" size={10} color={theme.colors.textMuted} />
            {diary.isCustomFile ? '~/.strawberry-diary.txt' : i18n.diary.empty}
          </span>
          <MingCuteIcon name="sparkles-2-line" size={12} color={theme.colors.roseMuted} />
        </footer>
      </DreamCard>
    </DraggableWidget>
  );
};

export default render;
