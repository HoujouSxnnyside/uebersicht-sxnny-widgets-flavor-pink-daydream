import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

const SRC_WIDGETS_DIR = resolve(import.meta.dir, '../src/widgets');
const DIST_DIR = resolve(import.meta.dir, '../dist');
const DIST_BIN_DIR = resolve(DIST_DIR, 'bin');
const SHELL_SCRIPTS_DIR = resolve(import.meta.dir, 'shell');
const _SWIFT_BIN_DIR = resolve(import.meta.dir, '../native/.build/release');

const isWatchMode = process.argv.includes('--watch');

interface WidgetEntry {
  name: string;
  entrypoint: string;
}

/**
 * Finds all widget entrypoints within src/widgets/
 */
async function findWidgetEntries(): Promise<WidgetEntry[]> {
  try {
    const entries = await readdir(SRC_WIDGETS_DIR, { withFileTypes: true });
    const widgets: WidgetEntry[] = [];

    for (const entry of entries) {
      const fullPath = join(SRC_WIDGETS_DIR, entry.name);

      if (entry.isDirectory()) {
        const indexTsx = join(fullPath, 'index.tsx');
        const indexJsx = join(fullPath, 'index.jsx');

        try {
          if ((await stat(indexTsx)).isFile()) {
            widgets.push({ name: entry.name, entrypoint: indexTsx });
            continue;
          }
        } catch {}

        try {
          if ((await stat(indexJsx)).isFile()) {
            widgets.push({ name: entry.name, entrypoint: indexJsx });
          }
        } catch {}
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx'))) {
        const widgetName = entry.name.replace(/\.(tsx|jsx)$/, '');
        widgets.push({ name: widgetName, entrypoint: fullPath });
      }
    }

    return widgets;
  } catch (_error) {
    return [];
  }
}

/**
 * Copies shell scripts and compiled Swift binaries to dist/bin/
 */
async function copyBinariesAndScripts() {
  await mkdir(DIST_BIN_DIR, { recursive: true });

  // 1. Copy shell scripts if present
  try {
    const shellFiles = await readdir(SHELL_SCRIPTS_DIR);
    for (const file of shellFiles) {
      if (file.endsWith('.sh')) {
        const src = join(SHELL_SCRIPTS_DIR, file);
        const dest = join(DIST_BIN_DIR, file);
        await copyFile(src, dest);
      }
    }
  } catch {}

  // 2. Copy compiled Swift release binaries
  const swiftCandidates = [
    resolve(import.meta.dir, '../native/.build/out/Products/Release'),
    resolve(import.meta.dir, '../native/.build/release'),
    resolve(import.meta.dir, '../native/.build/arm64-apple-macosx/release'),
  ];

  const copiedBinaries = new Set<string>();

  for (const candidateDir of swiftCandidates) {
    try {
      const entries = await readdir(candidateDir, { withFileTypes: true });
      for (const entry of entries) {
        if (
          entry.isFile() &&
          !entry.name.includes('.') &&
          !entry.name.endsWith('-tool') &&
          !copiedBinaries.has(entry.name)
        ) {
          const src = join(candidateDir, entry.name);
          const dest = join(DIST_BIN_DIR, entry.name);
          await copyFile(src, dest);
          // Execution permissions for Übersicht runner
          await Bun.$`chmod +x ${dest}`.quiet();
          copiedBinaries.add(entry.name);
          console.log(`  [binary] Copied: ${entry.name} -> dist/bin/${entry.name}`);
        }
      }
    } catch {}
  }
}

/**
 * Builds all widgets using Bun.build
 */
async function buildWidgets() {
  const widgets = await findWidgetEntries();

  if (widgets.length === 0) {
    console.log('[info] No widgets defined yet in src/widgets/.');
    await mkdir(DIST_DIR, { recursive: true });
    await copyBinariesAndScripts();
    return;
  }

  console.log(`[build] Compiling ${widgets.length} widget(s)...`);
  await mkdir(DIST_DIR, { recursive: true });

  for (const widget of widgets) {
    const outfilePath = join(DIST_DIR, `${widget.name}.jsx`);

    const result = await Bun.build({
      entrypoints: [widget.entrypoint],
      target: 'browser',
      format: 'esm',
      minify: false,
      define: {
        'process.env.NODE_ENV': JSON.stringify(isWatchMode ? 'development' : 'production'),
      },
    });

    if (!result.success) {
      console.error(`[error] Failed to compile widget ${widget.name}:`);
      for (const log of result.logs) console.error(log);
      continue;
    }

    // Write compiled artifact
    const outputArtifact = result.outputs[0];
    if (outputArtifact) {
      await Bun.write(outfilePath, outputArtifact);
      console.log(`  [ok] ${widget.name} -> dist/${widget.name}.jsx`);
    }
  }

  await copyBinariesAndScripts();
  await ensureWidgetSettings(widgets.map((w) => `sxnny-pink-daydream-${w.name}-jsx`));
  console.log('[build] Build complete.');
}

async function ensureWidgetSettings(widgetIds: string[]) {
  const settingsPaths = [
    resolve(homedir(), 'Library/Application Support/tracesOf.Uebersicht/WidgetSettings.json'),
    resolve(homedir(), 'Library/Application Support/Übersicht/WidgetSettings.json'),
  ];

  for (const p of settingsPaths) {
    try {
      const raw = await Bun.file(p).text();
      const json = JSON.parse(raw);
      let changed = false;

      for (const id of widgetIds) {
        if (!json[id] || json[id].hidden === true) {
          json[id] = {
            showOnAllScreens: true,
            showOnMainScreen: false,
            showOnSelectedScreens: false,
            hidden: false,
            screens: [],
          };
          changed = true;
        }
      }

      if (changed) {
        await Bun.write(p, JSON.stringify(json, null, 2));
      }
    } catch {}
  }
}

// Execution
await buildWidgets();

if (isWatchMode) {
  const { watch } = await import('node:fs');
  const srcDir = resolve(import.meta.dir, '../src');
  console.log('[watch] Watching src/ for changes in real time...');

  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  watch(srcDir, { recursive: true }, (_eventType, filename) => {
    if (
      filename &&
      (filename.endsWith('.ts') || filename.endsWith('.tsx') || filename.endsWith('.jsx'))
    ) {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        console.log(`\n[watch] File change detected: ${filename}, rebuilding...`);
        await buildWidgets();
      }, 150);
    }
  });

  // Keep process alive in watch mode
  await new Promise(() => {});
}
