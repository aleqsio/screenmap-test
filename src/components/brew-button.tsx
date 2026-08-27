import { Pressable, type PressableProps, StyleSheet } from 'react-native';

import { Type } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { formatClock } from '@/data/methods';
import { usePalette } from '@/hooks/use-palette';

/** The "start the brew timer" call to action. Presentational: the method route wraps it in its own `<Link>`. */
export function BrewTimerButton({ seconds, ...rest }: PressableProps & { seconds: number }) {
  const c = usePalette();
  return (
    <Pressable {...rest} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
      <Type
        variant="heading"
        style={[styles.cta, { backgroundColor: c.roast, color: '#FFF8F1' }]}>
        Start the brew timer
      </Type>
      <Type variant="mono" style={styles.time} tone="muted">
        {formatClock(seconds)}
      </Type>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cta: {
    textAlign: 'center',
    paddingVertical: Spacing.four,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  time: { textAlign: 'center', fontSize: 13, paddingTop: Spacing.two },
});
