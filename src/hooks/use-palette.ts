import { useColorScheme } from 'react-native';

import { Colors, type Palette } from '@/constants/theme';

/** The active palette. `useColorScheme` can return null before the OS answers. */
export function usePalette(): Palette {
  const scheme = useColorScheme();
  return Colors[scheme === 'dark' ? 'dark' : 'light'];
}
