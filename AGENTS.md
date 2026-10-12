# AGENTS.md — Agent Guidelines

For repository architecture, stack commands, and conventions, refer to [CLAUDE.md](CLAUDE.md).

## Critical Guidelines for Autonomous Agents:
1. Always run `just check` before concluding a task.
2. Maintain strict zero-warning policy on Swift (`swift build`) and TypeScript (`tsc --noEmit`).
3. Never use raw emojis in strings, console logs, or tests.
4. Keep all comments, commits, and documentation in English.
5. Preserve Übersicht compatibility: widgets must be functional pure components without React hooks at root level.
