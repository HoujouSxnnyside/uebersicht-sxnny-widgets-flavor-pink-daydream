import { beforeEach, describe, expect, it } from 'bun:test';
import {
  getWidgetOffset,
  resetWidgetOffset,
  saveWidgetOffset,
} from '../src/shared/utils/draggable';

describe('draggable utility', () => {
  beforeEach(() => {
    // Setup mock localStorage in test environment
    const store: Record<string, string> = {};
    const storageMock = {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (const k of Object.keys(store)) delete store[k];
      },
      key: (index: number) => Object.keys(store)[index] ?? null,
      length: Object.keys(store).length,
    };

    (globalThis as unknown as { localStorage: Storage; window: unknown }).localStorage =
      storageMock as unknown as Storage;
    (globalThis as unknown as { window: { localStorage: Storage } }).window = {
      localStorage: storageMock as unknown as Storage,
    };
  });

  it('returns zero offsets when nothing is persisted', () => {
    const offset = getWidgetOffset('test-widget');
    expect(offset).toEqual({ dx: 0, dy: 0 });
  });

  it('persists and retrieves widget offsets correctly', () => {
    saveWidgetOffset('test-widget', { dx: 140, dy: -60 });
    const offset = getWidgetOffset('test-widget');
    expect(offset).toEqual({ dx: 140, dy: -60 });
  });

  it('resets persisted widget offsets on double-click reset', () => {
    saveWidgetOffset('test-widget', { dx: 50, dy: 50 });
    resetWidgetOffset('test-widget');
    const offset = getWidgetOffset('test-widget');
    expect(offset).toEqual({ dx: 0, dy: 0 });
  });
});
