import type { CSSProperties, FC, ReactNode } from 'react';
import { getI18n } from '@/shared/i18n';
import { getWidgetOffset, resetWidgetOffset, startWidgetDrag } from '@/shared/utils/draggable';

/** Props for {@link DraggableWidget}. */
export interface DraggableWidgetProps {
  /** Stable widget identifier, used as the key for the saved position. */
  widgetId: string;
  /** Card content. Elements marked as drag handles start the drag. */
  children: ReactNode;
  /** Extra class name appended to the wrapper. */
  className?: string;
  /** Inline styles merged after the generated ones. */
  style?: CSSProperties;
  /** Accessible label and tooltip. Defaults to the translated drag hint. */
  title?: string;
}

/**
 * Wraps a widget card so it can be dragged by its handle.
 *
 * The saved position is restored on render, and double-clicking a handle resets it.
 * The wrapper itself ignores pointer events so empty areas stay click-through.
 */
export const DraggableWidget: FC<DraggableWidgetProps> = ({
  widgetId,
  children,
  className = '',
  style,
  title,
}) => {
  const i18n = getI18n();
  const offset = getWidgetOffset(widgetId);
  const elementId = `widget-${widgetId}`;
  const resolvedTitle = title ?? i18n.common.dragHint;

  return (
    <section
      id={elementId}
      aria-label={resolvedTitle}
      className={`widget-draggable ${className}`.trim()}
      style={{
        transform: `translate3d(${offset.dx}px, ${offset.dy}px, 0)`,
        pointerEvents: 'none',
        ...style,
      }}
      onMouseDown={(e) => startWidgetDrag(e, widgetId, elementId)}
      onDoubleClick={(e) => {
        const target = e.target as HTMLElement | null;
        if (target?.closest("[data-drag-handle='true'], .widget-drag-handle")) {
          resetWidgetOffset(widgetId, elementId);
        }
      }}
      title={resolvedTitle}
    >
      {children}
    </section>
  );
};
