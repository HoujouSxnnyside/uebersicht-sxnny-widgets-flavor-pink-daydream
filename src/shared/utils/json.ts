/**
 * Safely parses stdout string emitted by shell scripts or Swift CLI binaries.
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
