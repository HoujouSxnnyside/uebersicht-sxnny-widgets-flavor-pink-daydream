# Widgets Directory

This directory hosts personal widgets. Each widget lives in its own subdirectory or standalone file.

## Recommended Widget Structure

```text
src/widgets/
├── weather/
│   ├── index.tsx         # Entry point exporting command, refreshFrequency, className, render
│   ├── types.ts          # JSON schema interfaces for Swift/Shell CLI output
│   └── components/       # Widget-specific sub-components
└── system-stats/
    ├── index.tsx
    └── types.ts
```

## Übersicht Export Contract

```tsx
import { css } from "@emotion/css";
import type { UbersichtRenderProps } from "@/shared/types/ubersicht";
import { safeParseJson } from "@/shared/utils/json";

// 1. Command to execute (e.g. compiled Swift binary or shell script)
export const command = "./bin/system-info";

// 2. Refresh interval in milliseconds (e.g. every 2 seconds)
export const refreshFrequency = 2000;

// 3. Root desktop layout styling for macOS
export const className = css`
  top: 20px;
  right: 20px;
  user-select: none;
`;

// 4. Pure functional render entrypoint with React + Emotion
export const render = ({ output, error }: UbersichtRenderProps) => {
  if (error) return <div>Error: {String(error)}</div>;
  const data = safeParseJson(output);
  return <div>{JSON.stringify(data)}</div>;
};
```
