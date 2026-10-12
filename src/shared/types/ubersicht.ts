import type { ReactNode } from 'react';

/**
 * Standard properties passed by Übersicht to the `render` function
 */
export interface UbersichtRenderProps<T = unknown> {
  /** Output from `command` execution (stdout plain text or serialized JSON) */
  output?: string;
  /** Parsed payload when using a JSON deserializer */
  data?: T;
  /** Error instance or string if command execution failed */
  error?: Error | string;
}

/**
 * Übersicht Widget Definition Contract
 */
export interface UbersichtWidgetDefinition<T = unknown> {
  /** Shell command or binary path executed periodically */
  command?: string | (() => Promise<string>);
  /** Refresh frequency in milliseconds, or false for static widgets */
  refreshFrequency?: number | false;
  /** Root desktop layout styling applied to the widget */
  className?: string;
  /** Functional render component returning JSX */
  render: (props: UbersichtRenderProps<T>) => ReactNode;
}
