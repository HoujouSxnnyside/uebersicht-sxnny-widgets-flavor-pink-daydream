import type { MouseEvent as ReactMouseEvent } from 'react';

export interface WidgetOffset {
  dx: number;
  dy: number;
}

const STORAGE_PREFIX = 'pink_daydream_pos_';
const DRAG_THRESHOLD_PX = 4;

/**
 * Retrieves the saved widget offset from localStorage
 */
export function getWidgetOffset(widgetId: string): WidgetOffset {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { dx: 0, dy: 0 };
  }
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${widgetId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed.dx === 'number' && typeof parsed.dy === 'number') {
        return parsed;
      }
    }
  } catch {}
  return { dx: 0, dy: 0 };
}

/**
 * Persists widget offset coordinates to localStorage
 */
export function saveWidgetOffset(widgetId: string, offset: WidgetOffset): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${widgetId}`, JSON.stringify(offset));
  } catch {}
}

/**
 * Resets the widget position back to default coordinates
 */
export function resetWidgetOffset(widgetId: string, elementId?: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${widgetId}`);
    const el = elementId
      ? document.getElementById(elementId)
      : document.getElementById(`widget-card-${widgetId}`) ||
        document.getElementById(`sxnny-pink-daydream-${widgetId}-jsx`);
    if (el) {
      el.style.transform = 'translate3d(0px, 0px, 0px)';
    }
  } catch {}
}

/**
 * Initiates 60fps hardware-accelerated drag-and-drop for a widget.
 * Does NOT call preventDefault on mousedown to preserve full interactivity,
 * clicking, checkbox toggling, and text selection within child elements.
 * Only initiates dragging once mouse movement exceeds DRAG_THRESHOLD_PX.
 */
export function startWidgetDrag(
  e: ReactMouseEvent<HTMLElement>,
  widgetId: string,
  elementId?: string,
): void {
  // Only respond to primary left click
  if (e.button !== 0) return;

  const target = e.target as HTMLElement | null;

  // STRICT ERGONOMIC DRAGGING:
  // Dragging is ONLY initiated from dedicated drag handles (washi tape, cameo, ribbons)
  // marked with [data-drag-handle="true"] or .widget-drag-handle.
  // This completely eliminates accidental drag stealing and prevents blocking desktop shortcuts.
  const dragHandle = target?.closest("[data-drag-handle='true'], .widget-drag-handle");
  if (!dragHandle) {
    return;
  }

  // Do not drag if clicking on interactive controls unless it's explicitly the drag handle
  const isInteractive = target?.closest(
    "button, a, input, textarea, select, [role='checkbox'], [role='gridcell'], [data-no-drag]",
  );
  if (isInteractive && isInteractive !== dragHandle) {
    return;
  }

  // Do not drag if user currently has active text selected
  const activeSelection = typeof window !== 'undefined' ? window.getSelection() : null;
  if (activeSelection && !activeSelection.isCollapsed && activeSelection.toString().length > 0) {
    return;
  }

  const cardEl = elementId
    ? document.getElementById(elementId)
    : ((e.currentTarget as HTMLElement).closest('.widget-draggable') as HTMLElement | null) ||
      (e.currentTarget as HTMLElement);

  if (!cardEl) return;

  const currentOffset = getWidgetOffset(widgetId);
  const startMouseX = e.clientX;
  const startMouseY = e.clientY;

  let currentDx = currentOffset.dx;
  let currentDy = currentOffset.dy;
  let isDragging = false;

  let originalUserSelect = '';
  let originalCursor = '';

  const onMouseMove = (moveEvent: MouseEvent) => {
    const deltaX = moveEvent.clientX - startMouseX;
    const deltaY = moveEvent.clientY - startMouseY;
    const distance = Math.hypot(deltaX, deltaY);

    if (!isDragging) {
      if (distance < DRAG_THRESHOLD_PX) {
        return; // Retain click semantics; ignore tremor movements
      }
      isDragging = true;
      originalUserSelect = document.body.style.userSelect;
      originalCursor = document.body.style.cursor;
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
      cardEl.style.cursor = 'grabbing';
      cardEl.style.transition = 'none';
    }

    moveEvent.preventDefault();
    currentDx = currentOffset.dx + deltaX;
    currentDy = currentOffset.dy + deltaY;

    cardEl.style.transform = `translate3d(${currentDx}px, ${currentDy}px, 0px)`;
  };

  const onMouseUp = () => {
    if (isDragging) {
      document.body.style.userSelect = originalUserSelect;
      document.body.style.cursor = originalCursor;
      cardEl.style.cursor = '';
      cardEl.style.transition = '';

      saveWidgetOffset(widgetId, { dx: currentDx, dy: currentDy });
    }

    // Clean up window listeners
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('blur', onMouseUp);
  };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('blur', onMouseUp);
}
