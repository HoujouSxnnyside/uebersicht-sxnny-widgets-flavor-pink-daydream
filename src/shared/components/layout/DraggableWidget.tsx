import type { CSSProperties, FC, ReactNode } from 'react';
import { getI18n } from '@/shared/i18n';
import { getWidgetOffset, resetWidgetOffset, startWidgetDrag } from '@/shared/utils/draggable';

export interface DraggableWidgetProps {
  widgetId: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

/**
 * Reusable DraggableWidget wrapper adhering to DRY and Single Responsibility.
 * Encapsulates coordinate retrieval, mouse event listeners, double-click reset,
 * and 60fps hardware-accelerated translate3d transforms.
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
