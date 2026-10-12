import { injectGlobal } from '@emotion/css';
import { grechenFuemenFontFace } from './fonts';

let fontsInjected = false;

/**
 * Ensures handwritten and rounded typography fonts are loaded into Übersicht WebKit view
 */
export function ensurePinkDaydreamFonts() {
  if (fontsInjected || typeof document === 'undefined') return;

  injectGlobal`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Quicksand:wght@500;600;700&display=swap');

    ${grechenFuemenFontFace}

    * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;

  fontsInjected = true;
}
