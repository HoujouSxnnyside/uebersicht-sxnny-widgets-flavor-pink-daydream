import { describe, expect, it } from 'bun:test';
import { formatSystemDate, getI18n, getSystemLocale, isSpanishLocale } from '../src/shared/i18n';

describe('i18n system', () => {
  it('defaults getSystemLocale safely in non-browser environment', () => {
    const locale = getSystemLocale();
    expect(typeof locale).toBe('string');
    expect(locale.length).toBeGreaterThan(0);
  });

  it('checks whether current environment is Spanish', () => {
    const isEs = isSpanishLocale();
    expect(typeof isEs).toBe('boolean');
  });

  it('provides comprehensive translations dictionary', () => {
    const dict = getI18n();
    expect(dict.common).toBeDefined();
    expect(dict.common.garden).toBeDefined();
    expect(dict.common.dragHint).toBeDefined();

    expect(dict.calendar).toBeDefined();
    expect(dict.calendar.weekdays.length).toBe(7);

    expect(dict.weather).toBeDefined();
    expect(dict.weather.conditions.sunny).toBeDefined();
    expect(dict.weather.conditions.rainy).toBeDefined();

    expect(dict.blushSystem).toBeDefined();
    expect(dict.blushSystem.cpu).toBeDefined();
    expect(dict.blushSystem.memory).toBeDefined();
    expect(dict.blushSystem.battery).toBeDefined();
  });

  it('formats dates gracefully with system preferences', () => {
    const date = new Date(2026, 9, 11); // October 11, 2026
    const formatted = formatSystemDate(date, { month: 'short' });
    expect(typeof formatted).toBe('string');
    expect(formatted.length).toBeGreaterThan(0);
  });
});
