import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, Eyebrow, Rule, Screen, Type } from '@/components/ui';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { formatClock, type Method } from '@/data/methods';
import { usePalette } from '@/hooks/use-palette';

/**
 * The body of every `src/app/method/<id>.tsx` screen. Each method gets its own
 * route file so the route map lists them by name instead of one `[id]` node.
 */
export function MethodScreen({ method }: { method: Method }) {
  const c = usePalette();
  return (
    <>
      <Stack.Screen options={{ title: method.name }} />
      <Screen>
        <View style={styles.hero}>
          <Eyebrow>{method.tagline}</Eyebrow>
          <Type variant="display">{method.name}</Type>
          <Type variant="body" tone="muted">
            {method.blurb}
          </Type>
        </View>

        <Card style={styles.specs}>
          {[
            ['Ratio', method.ratio],
            ['Coffee', method.dose],
            ['Water', method.water],
            ['Grind', method.grind],
            ['Time', formatClock(method.totalTime)],
          ].map(([label, value], i) => (
            <View key={label}>
              {i > 0 && <Rule style={styles.specRule} />}
              <View style={styles.specRow}>
                <Type variant="caption" tone="muted">
                  {label}
                </Type>
                <Type variant="mono">{value}</Type>
              </View>
            </View>
          ))}
        </Card>

        <Link href={`/brew/${method.id}`} asChild>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
            <View style={[styles.cta, { backgroundColor: c.roast }]}>
              <Type variant="heading" style={styles.ctaLabel}>
                Start the brew timer
              </Type>
              <Type variant="mono" style={styles.ctaTime}>
                {formatClock(method.totalTime)}
              </Type>
            </View>
          </Pressable>
        </Link>

        <View style={styles.block}>
          <Eyebrow>The pour</Eyebrow>
          {method.steps.map((step, i) => (
            <View key={step.label} style={styles.step}>
              <View style={[styles.stepMark, { borderColor: c.line }]}>
                <Type variant="mono" tone="roast" style={styles.stepIndex}>
                  {i + 1}
                </Type>
              </View>
              <View style={styles.stepBody}>
                <View style={styles.stepHead}>
                  <Type variant="heading">{step.label}</Type>
                  <Type variant="mono" tone="muted" style={styles.stepAt}>
                    {formatClock(step.at)}
                  </Type>
                </View>
                <Type variant="caption" tone="muted">
                  {step.detail}
                </Type>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.block}>
          <Eyebrow>Dial it in</Eyebrow>
          {method.tips.map((tip) => (
            <View key={tip} style={styles.tip}>
              <Type variant="body" tone="roast">
                —
              </Type>
              <Type variant="body" tone="muted" style={styles.tipText}>
                {tip}
              </Type>
            </View>
          ))}
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  hero: { gap: Spacing.two, paddingTop: Spacing.two },
  specs: { paddingVertical: Spacing.two },
  specRule: { marginVertical: 0 },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  cta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    borderRadius: Radius.md,
  },
  ctaLabel: { color: '#FFF8F1' },
  ctaTime: { color: '#FFD9C4' },
  block: { gap: Spacing.three, paddingTop: Spacing.two },
  step: { flexDirection: 'row', gap: Spacing.three },
  stepMark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndex: { fontFamily: Fonts.mono, fontSize: 13 },
  stepBody: { flex: 1, gap: 2, paddingTop: 2 },
  stepHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  stepAt: { fontSize: 13 },
  tip: { flexDirection: 'row', gap: Spacing.two },
  tipText: { flex: 1 },
});
