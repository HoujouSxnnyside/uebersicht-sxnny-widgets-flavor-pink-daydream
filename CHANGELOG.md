# Changelog

All notable changes to **Übersicht Sxnny Widgets** are documented here.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.2.0] — 2026-11-17

### Changed

- License changed from SPUL to PolyForm Noncommercial 1.0.0.
- Community files, issue and PR templates, Dependabot configuration and badges updated.
- CI and release workflows pin Bun to `1.4.4` (matches `packageManager`) instead of `latest`.
- Files follow each language's style guide: `PascalCase.tsx` for React components, `kebab-case.ts` for TypeScript, `PascalCase.swift` for Swift. Tests moved to `tests/`, mirroring `src/`. Biome enforces the TypeScript rules.
- Fonts are self-hosted: Nunito is bundled (SIL OFL 1.1) and the Google Fonts import and Quicksand fallback are removed.
- TSDoc and Swift documentation comments added to the public API; Open-Meteo fields use `CodingKeys` with lowerCamelCase properties.
- The release archive includes `LICENSE` and the font licenses under `licenses/`.
- Bun `>= 1.4.0` is now declared in `engines` and the README (it was documented as `>= 1.1.0`).
- Dependencies updated: `@biomejs/biome` 2.6.8, `@iconify-json/mingcute` 1.2.10, `@types/bun` 1.4.4.

### Added

- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, pull request and feature request templates, `FUNDING.yml`.
- Interactive drag-and-drop support with local storage persistence across all widgets.
- Double-click to reset widget position.
- Real-time build watcher with file system debouncing in `scripts/build.ts`.

---

## [0.1.0] — 2026-10-11

### Added

- Initial release of **Übersicht Sxnny Widgets (Pink Daydream)**.
- `01 — Sweet Time`: Large digital clock with handwritten date card, bow and flowers.
- `02 — Little Weather Garden`: Dynamic illustrated scrapbook garden powered by Open-Meteo via Swift CLI (`weather-cli`).
- `03 — My Little Calendar`: Monthly grid with heart day marker and EventKit integration via Swift CLI (`calendar-cli`).
- `04 — Teddy Corner`: Decorative floating teddy bear with encouraging quotes card.
- `05 — Strawberry Diary`: Stationery note card for tasks and thoughts from `~/.strawberry-diary.txt`.
- `06 — Blush System`: System monitor presenting CPU pearls, RAM petal bar, battery heart gem, and disk track via Swift CLI (`system-cli`).
- Native macOS Swift CLI suite (`native/Sources/CLI/*`).
- Shared scrapbook design system with custom stickers, typography, and safe area tokens.

---

[Unreleased]: https://github.com/HoujouSxnnyside/uebersicht-sxnny-widgets-flavor-pink-daydream/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/HoujouSxnnyside/uebersicht-sxnny-widgets-flavor-pink-daydream/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/HoujouSxnnyside/uebersicht-sxnny-widgets-flavor-pink-daydream/releases/tag/v0.1.0
