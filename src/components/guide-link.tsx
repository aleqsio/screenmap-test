import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Type } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { usePalette } from '@/hooks/use-palette';

/* The link lives here rather than in the route, which is the ordinary way to
   write a list item and the case the map parser has to follow. */
export function GuideLink() {
  const c = usePalette();
  return (
    <Link href="/grind" asChild>
      <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}>
        <View style={[styles.cta, { borderColor: c.line, backgroundColor: c.card }]}>
          <View style={styles.text}>
            <Type variant="heading">Grind guide</Type>
            <Type variant="caption" tone="muted">What fine, medium and coarse actually mean</Type>
          </View>
          <Type variant="title" tone="roast">›</Type>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderRadius: 10, padding: Spacing.four, gap: Spacing.three,
  },
  text: { gap: 2, flex: 1 },
});
