import { mkdir, rm, symlink, unlink } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

const UBERSICHT_WIDGETS_DIR = resolve(homedir(), 'Library/Application Support/Übersicht/widgets');
const SUITE_LINK = resolve(UBERSICHT_WIDGETS_DIR, 'sxnny-pink-daydream');
const LEGACY_LINK = resolve(UBERSICHT_WIDGETS_DIR, 'my-widgets');
const DIST_DIR = resolve(import.meta.dir, '../dist');

const WIDGET_FILES = [
  'sweet-time.jsx',
  'weather-garden.jsx',
  'little-calendar.jsx',
  'teddy-corner.jsx',
  'strawberry-diary.jsx',
  'blush-system.jsx',
];

async function safeSymlink(target: string, destination: string, type: 'file' | 'dir' = 'file') {
  try {
    await rm(destination, { recursive: true, force: true });
  } catch {}

  try {
    await symlink(target, destination, type);
    console.log(`[link] Registered: ${destination} -> ${target}`);
  } catch (err) {
    console.error(`[error] Could not link ${destination}:`, err);
  }
}

async function link() {
  try {
    await mkdir(UBERSICHT_WIDGETS_DIR, { recursive: true });
    await mkdir(DIST_DIR, { recursive: true });

    // 1. Link primary sxnny-pink-daydream suite directory
    await safeSymlink(DIST_DIR, SUITE_LINK, 'dir');

    // 2. Clean up legacy my-widgets symlink if it still exists
    try {
      await unlink(LEGACY_LINK);
      console.log(`[link] Cleaned legacy symlink: ${LEGACY_LINK}`);
    } catch {}

    // 2. Remove any duplicate loose symlinks in root widgets dir to prevent Browserify collisions
    for (const file of WIDGET_FILES) {
      const destLink = join(UBERSICHT_WIDGETS_DIR, file);
      try {
        await unlink(destLink);
        console.log(`[link] Cleaned duplicate root link: ${destLink}`);
      } catch {}
    }

    // 3. Trigger live refresh in running Übersicht instance
    try {
      await Bun.$`osascript -e 'tell application id "tracesOf.Uebersicht" to refresh'`.quiet();
      console.log('[info] Notified Übersicht to refresh active desktop widgets');
    } catch {}

    console.log('[info] All 6 Pink Daydream widgets linked to Übersicht successfully.');
  } catch (error) {
    console.error('[error] Failed to link widgets:', error);
  }
}

await link();
