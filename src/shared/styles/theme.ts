/**
 * Visual identity and palette: Pink Daydream
 * Dreamcore, coquette and pastel scrapbook theme for Übersicht
 */
export const theme = {
  colors: {
    // Primary palette
    blush: '#F7DCE7',
    rose: '#EFA9C4',
    cream: '#FFF8F1',
    sage: '#C9DCC0',
    lilac: '#B9A6D8',

    // Variants and accents
    roseDeep: '#D8799E',
    roseMuted: '#E4B1C5',
    creamDark: '#F5EADF',
    creamPaper: '#FFFAF5',
    blushSoft: '#FDF1F6',
    sageDeep: '#9CB891',
    lilacDeep: '#9A84BF',

    // Low-contrast legible text
    textPrimary: '#5C414D', // Vintage plum-brown, no harsh black
    textSecondary: '#8E6D7B',
    textMuted: '#B899A7',
    textAccent: '#D8799E',
    textSage: '#687D60',

    // Surfaces and translucency
    glassBackground: 'rgba(247, 220, 231, 0.45)',
    glassBackgroundHover: 'rgba(247, 220, 231, 0.65)',
    creamGlass: 'rgba(255, 248, 241, 0.85)',
    glassBorder: 'rgba(255, 255, 255, 0.55)',
    borderSoft: 'rgba(239, 169, 196, 0.30)',
  },

  fonts: {
    // Rounded typography for data and metrics
    rounded:
      '"Nunito", "Quicksand", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    // Handwritten font for notes, dates and custom accents
    handwritten: '"Grechen Fuemen", cursive',
    // System font
    system: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
  },

  // Soft diffused pink shadows
  shadows: {
    soft: '0 6px 18px rgba(239, 169, 196, 0.25)',
    card: '0 10px 28px -4px rgba(239, 169, 196, 0.35), 0 4px 12px rgba(247, 220, 231, 0.4)',
    floating: '0 16px 36px -6px rgba(216, 121, 158, 0.30), 0 6px 16px rgba(247, 220, 231, 0.5)',
    sticker: '0 4px 10px rgba(185, 166, 216, 0.30)',
    innerGaze: 'inset 0 1px 2px rgba(255, 255, 255, 0.8)',
  },

  radii: {
    xs: '6px',
    sm: '10px',
    md: '16px',
    lg: '22px',
    xl: '28px',
    full: '9999px',
  },

  // Margins and safe-area calibrated for macOS (Top Menu Bar and Bottom Dock)
  safeArea: {
    menuBarHeight: '36px',
    dockHeight: '90px',
    // Top offset to clear the menu bar and notch
    top: '60px',
    left: '32px',
    right: '32px',
    // Bottom offset to clear the macOS Dock
    bottom: '115px',
  },

  blur: {
    subtle: 'blur(8px) saturate(140%)',
    standard: 'blur(16px) saturate(160%)',
    heavy: 'blur(24px) saturate(180%)',
  },
} as const;

export type Theme = typeof theme;
