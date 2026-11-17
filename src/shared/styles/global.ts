import { injectGlobal } from '@emotion/css';
import { grechenFuemenFontFace, nunitoFontFace } from './fonts';

let fontsInjected = false;

/**
 * Injects the self-hosted fonts and base styles into the Übersicht page.
 *
 * Safe to call from every widget: the styles are injected once per page.
 */
export function ensurePinkDaydreamFonts(): void {
  if (fontsInjected || typeof document === 'undefined') return;

  injectGlobal`
    ${nunitoFontFace}

    ${grechenFuemenFontFace}

    * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;

  fontsInjected = true;
}
