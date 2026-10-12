# CLAUDE.md — Sxnny Pink Daydream

This document serves as the primary technical specification for AI agents and developers working on **Sxnny Pink Daydream**.

## 1. Product Overview
- **Name:** Sxnny Pink Daydream
- **Aesthetic:** Pink Daydream (Japanese craft stationery, coquette scrapbooking, soft rose palette, and textured paper cards).
- **Target Platform:** macOS 14.0+ (Sonoma, Sequoia) running [Übersicht](https://tracesof.net/uebersicht/).
- **Maintainer:** HoujouSxnnyside
- **License:** SPUL (Sxnnyside Personal Use License)

## 2. Architecture & Languages
- **Frontend:** React 18, Emotion (`@emotion/css`), TypeScript, bundled with Bun into standalone `dist/*.jsx` widgets.
  - *Constraint:* Übersicht widgets use pure functional render functions (`render: ({ output, error }) => ReactNode`). Do NOT call React hooks (`useState`, `useEffect`) at root widget level.
- **Backend / System Probes:** Swift 6 (`native/Package.swift`), producing static command-line binaries in `dist/bin/`:
  - `weather-cli`: Asynchronous Open-Meteo REST client with IP fallback.
  - `calendar-cli`: EventKit calendar probe for current monthly events.
  - `system-cli`: Mach host statistics (CPU), VM statistics (RAM), filesystem (disk), and IOKit (battery).
- **Task Runner:** `Justfile` provides the unified task runner abstraction.

## 3. Standard Commands
```bash
just install     # Install dependencies via Bun
just dev         # Watch mode with live rebuild of widgets
just build       # Build Swift release CLI tools and Bun widgets
just test        # Run Bun unit tests and Swift unit tests
just typecheck   # Typecheck with TypeScript
just lint        # Check code style with Biome
just format      # Format source code with Biome
just check        # Unified Quality Gate (lint, typecheck, test, build)
just link         # Link dist/ to Übersicht widgets folder
just package      # Package distribution zip (sxnny-pink-daydream.zip) for release
just assets-check # Animoria visual asset governance audit
just clean        # Remove build caches and artifacts
```

## 4. Engineering & Aesthetic Rules
- **No Raw Emojis:** MingCute icons (`@iconify-json/mingcute` / `MingCuteIcon`) and SVG stickers (`src/shared/components/stickers/`) must be used for all visual symbols. Strings in code and logs must not contain raw emojis.
- **English Everywhere:** 100% of documentation, comments, log messages, and error messages must be written in English.
- **Safe Area Margins:** Widgets must respect macOS menu bar (`safeArea.top`) and Dock (`safeArea.bottom`).
- **Drag & Drop:** Every widget must wrap its card inside `<DraggableWidget id="...">` for persistent desktop placement.

## 5. Where Things Go

| Path | Purpose |
|---|---|
| `src/widgets/<name>/` | Individual widget entry points and pure render components |
| `src/shared/components/` | Reusable stationery stickers and cards |
| `src/shared/styles/` | Design system tokens, pastel palette, and safe areas |
| `src/shared/utils/` | Hardware-accelerated drag coordinate engine and JSON helpers |
| `src/shared/assets/images/` | Optimized WebP/AVIF stationery asset textures |
| `native/Sources/Core/` | NativeBridgeCore Swift models and JSON serialization |
| `native/Sources/CLI/` | Native Swift CLI probe executables (weather, calendar, system) |
| `scripts/` | Build watcher, asset optimizer, and CI git hook scripts |
| `test/` | Automated unit tests for TypeScript utilities |
| `dist/` | Compiled JavaScript widgets and release CLI binaries |
