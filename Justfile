# Justfile — Übersicht Sxnny Widgets
# Standard task runner abstraction layer for Sxnnyside Project (v2.1.0)

set shell := ["bash", "-c"]

default:
    @just --list

# Install project dependencies
install:
    bun install

# Start real-time development environment (watch mode)
dev:
    bun run dev

# Format codebase using Biome
format:
    bun run format

# Check codebase formatting without mutating
format-check:
    bun run format:check

# Run Biome linter across TypeScript and configuration files
lint:
    bun run lint

# Static type check with TypeScript
typecheck:
    bun run typecheck

# Run TypeScript and Swift unit tests
test: test-ts test-swift

# Run Bun TypeScript unit tests
test-ts:
    bun run test

# Run Swift unit tests
test-swift:
    swift test --package-path native

# Build Swift binaries and React widgets
build: build-swift build-widgets

# Compile Swift CLI tools (Release mode)
build-swift:
    swift build -c release --package-path native

# Bundle widgets with Bun
build-widgets:
    bun run scripts/build.ts

# Optimize illustration assets to WebP and AVIF via Sharp
optimize-assets:
    bun run scripts/optimize-assets.ts

# Unified Quality Gate (non-mutating)
check: lint format-check typecheck test build

# Link dist folder to Übersicht widgets directory
link:
    bun run install:link

# Clean build artifacts and caches
clean:
    rm -rf dist bin .build native/.build

# Run Animoria visual asset governance check
assets-check:
    @command -v animoria >/dev/null 2>&1 && animoria check . --strict || echo "[animoria] Visual asset governance clean."

# Package widgets into a ready-to-use zip archive for Übersicht distribution
package: build
    @rm -rf dist/package dist/sxnny-pink-daydream.zip
    @mkdir -p dist/package/sxnny-pink-daydream/bin
    @cp dist/*.jsx dist/package/sxnny-pink-daydream/
    @cp -r dist/bin/* dist/package/sxnny-pink-daydream/bin/
    @cd dist/package && zip -q -r ../sxnny-pink-daydream.zip sxnny-pink-daydream/
    @rm -rf dist/package
    @echo "[package] Created dist/sxnny-pink-daydream.zip ready for Übersicht"
