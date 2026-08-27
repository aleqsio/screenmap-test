import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, Chip, Type } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { formatClock, type Method } from '@/data/methods';
import { usePalette } from '@/hooks/use-palette';

/** One row on the Methods list. The whole card is the link target. */
export function MethodCard({ method }: { method: Method }) {
  const c = usePalette();
  return (
    <Link href={method.href} asChild>
      <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.72 : 1 })}>
        <Card style={styles.card}>
          <View style={styles.headline}>
            <View style={styles.headlineText}>
              <Type variant="title">{method.name}</Type>
              <Type variant="caption" tone="muted">
                {method.tagline}
              </Type>
            </View>
            <Type variant="title" tone="roast" style={styles.chevron}>
              ›
            </Type>
          </View>
          <View style={[styles.stats, { borderTopColor: c.line }]}>
            <Chip>{method.ratio}</Chip>
            <Chip>{formatClock(method.totalTime)}</Chip>
            <Chip>{method.grind}</Chip>
          </View>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { gap: Spacing.three },
  headline: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  headlineText: { flex: 1, gap: 2 },
  chevron: { fontWeight: '400' },
  stats: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
  },
});
