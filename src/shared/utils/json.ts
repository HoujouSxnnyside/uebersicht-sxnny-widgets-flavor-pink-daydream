/**
 * Parses the JSON printed by a shell command or a native tool.
 *
 * @typeParam T - The expected shape of the parsed value.
 * @param output - The raw standard output, which may be missing or blank.
 * @param fallback - The value returned when `output` is empty or invalid.
 * @returns The parsed value, or `fallback` when parsing is not possible.
 */
export function safeParseJson<T>(output?: string, fallback: T | null = null): T | null {
  if (!output || typeof output !== 'string') {
    return fallback;
  }

  try {
    const trimmed = output.trim();
    if (!trimmed) return fallback;
    return JSON.parse(trimmed) as T;
  } catch (err) {
    console.error('[json] Failed to parse Übersicht JSON output:', err, output);
    return fallback;
  }
}
