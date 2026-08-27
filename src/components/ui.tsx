/**
 * The whole design system: a paper ground, a card, a chip, a rule and three
 * text roles. Everything else composes these.
 */
import { type ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  type TextProps,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

import { Fonts, Radius, Spacing } from '@/constants/theme';
import { usePalette } from '@/hooks/use-palette';

export function Screen({
  children,
  contentStyle,
}: {
  children: ReactNode;
  contentStyle?: ViewStyle;
}) {
  const c = usePalette();
  return (
    <ScrollView
      style={{ backgroundColor: c.paper }}
      contentContainerStyle={[styles.screen, contentStyle]}
      contentInsetAdjustmentBehavior="automatic">
      <View style={styles.column}>{children}</View>
    </ScrollView>
  );
}

export function Card({ style, children, ...rest }: ViewProps) {
  const c = usePalette();
  return (
    <View
      {...rest}
      style={[styles.card, { backgroundColor: c.card, borderColor: c.line }, style]}>
      {children}
    </View>
  );
}

export function Rule({ style }: { style?: ViewStyle }) {
  const c = usePalette();
  return <View style={[styles.rule, { backgroundColor: c.line }, style]} />;
}

type TextRole = 'display' | 'title' | 'heading' | 'body' | 'label' | 'mono' | 'caption';

export function Type({
  variant = 'body',
  tone = 'ink',
  style,
  ...rest
}: TextProps & { variant?: TextRole; tone?: 'ink' | 'muted' | 'roast' }) {
  const c = usePalette();
  const color = tone === 'muted' ? c.muted : tone === 'roast' ? c.roast : c.ink;
  return <Text {...rest} style={[{ color }, roles[variant], style]} />;
}

export function Chip({ children, tone = 'chip' }: { children: ReactNode; tone?: 'chip' | 'roast' }) {
  const c = usePalette();
  const roast = tone === 'roast';
  return (
    <View style={[styles.chip, { backgroundColor: roast ? c.roastSoft : c.chip }]}>
      <Text
        style={[
          roles.label,
          { color: roast ? c.roast : c.muted, fontFamily: Fonts.mono, letterSpacing: 0 },
        ]}>
        {children}
      </Text>
    </View>
  );
}

/** Small-caps section marker, used above every block of content. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Type variant="label" tone="muted">
      {children}
    </Type>
  );
}

/** A 1–5 rating drawn as filled and empty slabs. */
export function Meter({ value, max = 5 }: { value: number; max?: number }) {
  const c = usePalette();
  return (
    <View style={styles.meter}>
      {Array.from({ length: max }, (_, i) => (
        <View
          key={i}
          style={[styles.meterBar, { backgroundColor: i < value ? c.roast : c.chip }]}
        />
      ))}
    </View>
  );
}

const roles = StyleSheet.create({
  display: { fontFamily: Fonts.serif, fontSize: 40, lineHeight: 44, fontWeight: '700' },
  title: { fontFamily: Fonts.serif, fontSize: 28, lineHeight: 33, fontWeight: '700' },
  heading: { fontFamily: Fonts.sans, fontSize: 17, lineHeight: 22, fontWeight: '600' },
  body: { fontFamily: Fonts.sans, fontSize: 15.5, lineHeight: 23 },
  label: { fontFamily: Fonts.sans, fontSize: 11.5, fontWeight: '700', letterSpacing: 0.9, textTransform: 'uppercase' },
  mono: { fontFamily: Fonts.mono, fontSize: 15, lineHeight: 21 },
  caption: { fontFamily: Fonts.sans, fontSize: 13, lineHeight: 19 },
});

const styles = StyleSheet.create({
  screen: { paddingHorizontal: Spacing.four, paddingBottom: 140, alignItems: 'center' },
  column: { width: '100%', maxWidth: 720, gap: Spacing.four },
  card: { borderRadius: Radius.md, borderWidth: StyleSheet.hairlineWidth * 2, padding: Spacing.four },
  rule: { height: StyleSheet.hairlineWidth * 2, width: '100%' },
  chip: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  meter: { flexDirection: 'row', gap: 3 },
  meterBar: { width: 14, height: 5, borderRadius: 2.5 },
});
