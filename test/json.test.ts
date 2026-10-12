import { describe, expect, it } from 'bun:test';
import { safeParseJson } from '../src/shared/utils/json';

describe('safeParseJson', () => {
  it('parses valid JSON string into typed object', () => {
    const raw = JSON.stringify({ temperature: 21.5, city: 'Tokyo' });
    const fallback = { temperature: 0, city: 'Default' };
    const parsed = safeParseJson(raw, fallback);

    expect(parsed).toEqual({ temperature: 21.5, city: 'Tokyo' });
  });

  it('returns fallback value when input is invalid JSON', () => {
    const fallback = { status: 'offline' };
    const parsed = safeParseJson('not-a-valid-json', fallback);

    expect(parsed).toEqual(fallback);
  });

  it('returns fallback value when input is undefined or empty string', () => {
    const fallback = { count: 10 };
    expect(safeParseJson(undefined, fallback)).toEqual(fallback);
    expect(safeParseJson('', fallback)).toEqual(fallback);
    expect(safeParseJson('   ', fallback)).toEqual(fallback);
  });
});
