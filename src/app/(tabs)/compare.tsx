import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, Chip, Eyebrow, Meter, Rule, Screen, Type } from '@/components/ui';
import { Radius, Spacing } from '@/constants/theme';
import { formatClock, METHODS } from '@/data/methods';
import { usePalette } from '@/hooks/use-palette';

const AXES = [
  { key: 'body', label: 'Body', note: 'How heavy the cup feels' },
  { key: 'clarity', label: 'Clarity', note: 'How separated the flavours read' },
  { key: 'effort', label: 'Effort', note: 'How much you have to pay attention' },
] as const;

export default function CompareScreen() {
  const c = usePalette();
  return (
    <Screen>
      <View style={styles.masthead}>
        <Eyebrow>Side by side</Eyebrow>
        <Type variant="display">Compare</Type>
        <Type variant="body" tone="muted">
          Same beans, very different cups. Pick by what you want out of the mug, not by what is on
          the shelf.
        </Type>
      </View>

      <Card style={styles.table}>
        {METHODS.map((m, i) => (
          <View key={m.id}>
            {i > 0 && <Rule />}
            <View style={styles.row}>
              <View style={styles.rowHead}>
                <Type variant="heading">{m.name}</Type>
                <View style={styles.chips}>
                  <Chip>{m.ratio}</Chip>
                  <Chip>{formatClock(m.totalTime)}</Chip>
                </View>
              </View>
              {AXES.map((axis) => (
                <View key={axis.key} style={styles.axis}>
                  <Type variant="caption" tone="muted" style={styles.axisLabel}>
                    {axis.label}
                  </Type>
                  <Meter value={m[axis.key]} />
                </View>
              ))}
            </View>
          </View>
        ))}
      </Card>

      <View style={styles.legend}>
        {AXES.map((axis) => (
          <View key={axis.key} style={styles.legendRow}>
            <Type variant="label">{axis.label}</Type>
            <Type variant="caption" tone="muted" style={styles.legendNote}>
              {axis.note}
            </Type>
          </View>
        ))}
      </View>

      <Link href="/grind" asChild>
        <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}>
          <View style={[styles.cta, { borderColor: c.line, backgroundColor: c.card }]}>
            <View style={styles.ctaText}>
              <Type variant="heading">Grind guide</Type>
              <Type variant="caption" tone="muted">
                What fine, medium and coarse actually mean
              </Type>
            </View>
            <Type variant="title" tone="roast" style={styles.chevron}>
              ›
            </Type>
          </View>
        </Pressable>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  masthead: { gap: Spacing.two, paddingTop: Spacing.two },
  table: { paddingVertical: 0 },
  row: { paddingVertical: Spacing.four, gap: Spacing.three },
  rowHead: { gap: Spacing.two },
  chips: { flexDirection: 'row', gap: Spacing.two },
  axis: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  axisLabel: { width: 60 },
  legend: { gap: Spacing.two },
  legendRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.two },
  legendNote: { flex: 1 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  ctaText: { flex: 1, gap: 2 },
  chevron: { fontWeight: '400' },
});
