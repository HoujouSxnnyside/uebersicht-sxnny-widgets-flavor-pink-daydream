import type { ReactNode } from 'react';

/**
 * Properties Übersicht passes to the `render` function of a widget.
 *
 * @typeParam T - The shape of `data`.
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
 * The module contract of an Übersicht widget.
 *
 * @typeParam T - The shape of the data passed to `render`.
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
