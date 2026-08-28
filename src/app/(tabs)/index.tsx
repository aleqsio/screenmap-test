import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { MethodCard } from '@/components/method-card';
import { Eyebrow, Screen, Type } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { METHODS, methodById } from '@/data/methods';
import { usePalette } from '@/hooks/use-palette';

export default function MethodsScreen() {
  const c = usePalette();
  return (
    <Screen>
      <View style={styles.masthead}>
        <Eyebrow>A field guide · baseline</Eyebrow>
        <Type variant="display">Brew</Type>
        <Type variant="body" tone="muted">
          {METHODS.length} ways to get hot water through coffee, with the numbers that matter and
          the timings that go with them.
        </Type>
      </View>

      <View style={styles.list}>
        <Link href="/method/v60" asChild>
          <MethodCard method={methodById('v60')!} />
        </Link>
        <Link href="/method/aeropress" asChild>
          <MethodCard method={methodById('aeropress')!} />
        </Link>
        <Link href="/method/french-press" asChild>
          <MethodCard method={methodById('french-press')!} />
        </Link>
      </View>

      <Link href="/about" asChild>
        <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
          <View style={[styles.footer, { borderTopColor: c.line }]}>
            <Type variant="caption" tone="muted">
              About this guide
            </Type>
            <Type variant="caption" tone="roast">
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
  list: { gap: Spacing.three, paddingTop: Spacing.two },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.four,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    marginTop: Spacing.two,
  },
});
