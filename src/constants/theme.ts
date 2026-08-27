/**
 * Brew's palette: roasted-paper light, dark-roast dark. Two accents only —
 * `roast` for anything actionable, `line` for structure.
 */
import { Platform } from 'react-native';

export type Palette = {
  paper: string;
  card: string;
  ink: string;
  muted: string;
  roast: string;
  roastSoft: string;
  line: string;
  chip: string;
};

export const Colors: { light: Palette; dark: Palette } = {
  light: {
    paper: '#FAF5EE',
    card: '#FFFFFF',
    ink: '#2B1D14',
    muted: '#8B7462',
    roast: '#B04A22',
    roastSoft: '#F6E7DD',
    line: '#E7DACB',
    chip: '#F3EBE0',
  },
  dark: {
    paper: '#15100D',
    card: '#1F1814',
    ink: '#F4EADE',
    muted: '#A38D79',
    roast: '#E9834F',
    roastSoft: '#372018',
    line: '#312722',
    chip: '#2A211C',
  },
};

export const Fonts = Platform.select({
  ios: { sans: 'system-ui', serif: 'ui-serif', mono: 'ui-monospace' },
  default: { sans: 'normal', serif: 'serif', mono: 'monospace' },
})!;

export const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 24,
  six: 32,
  seven: 48,
} as const;

export const Radius = { sm: 8, md: 14, lg: 20 } as const;
export const MaxContentWidth = 720;
