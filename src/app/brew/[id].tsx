import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Card, Eyebrow, Rule, Screen, Type } from '@/components/ui';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { formatClock, methodById, METHODS } from '@/data/methods';
import { usePalette } from '@/hooks/use-palette';

/** Which step is live at `t` seconds — the last one whose `at` has passed. */
function activeStep(steps: { at: number }[], t: number) {
  let i = 0;
  for (let s = 0; s < steps.length; s++) if (t >= steps[s].at) i = s;
  return i;
}

export default function BrewTimerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const method = methodById(id ?? '') ?? METHODS[0];
  const c = usePalette();

  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const remaining = Math.max(method.totalTime - elapsed, 0);
  const current = activeStep(method.steps, elapsed);
  const progress = Math.min(elapsed / method.totalTime, 1);

  return (
    <>
      <Stack.Screen options={{ title: 'Brew timer' }} />
      <Screen>
        <View style={styles.masthead}>
          <Eyebrow>{method.name} · {method.ratio}</Eyebrow>
          <Type variant="display" style={styles.clock}>
            {formatClock(remaining)}
          </Type>
          <Type variant="caption" tone="muted">
            {elapsed === 0
              ? `${method.dose} of coffee, ${method.water}.`
              : `Elapsed ${formatClock(elapsed)} of ${formatClock(method.totalTime)}.`}
          </Type>
        </View>

        <View style={[styles.track, { backgroundColor: c.chip }]}>
          <View
            style={[styles.fill, { backgroundColor: c.roast, width: `${progress * 100}%` }]}
          />
        </View>

        <View style={styles.controls}>
          <Pressable
            onPress={() => setRunning((r) => !r)}
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: c.roast, opacity: pressed ? 0.85 : 1 },
            ]}>
            <Type variant="heading" style={styles.buttonLabel}>
              {running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}
            </Type>
          </Pressable>
          <Pressable
            onPress={() => {
              setRunning(false);
              setElapsed(0);
            }}
            style={({ pressed }) => [
              styles.button,
              styles.buttonQuiet,
              { borderColor: c.line, opacity: pressed ? 0.7 : 1 },
            ]}>
            <Type variant="heading" tone="muted">
              Reset
            </Type>
          </Pressable>
        </View>

        <Card style={styles.schedule}>
          {method.steps.map((step, i) => {
            const done = elapsed > 0 && i < current;
            const live = elapsed > 0 && i === current;
            return (
              <View key={step.label}>
                {i > 0 && <Rule />}
                <View style={[styles.scheduleRow, live && { backgroundColor: c.roastSoft }]}>
                  <Type variant="mono" tone={live ? 'roast' : 'muted'} style={styles.at}>
                    {formatClock(step.at)}
                  </Type>
                  <View style={styles.scheduleBody}>
                    <Type variant="heading" tone={done ? 'muted' : 'ink'}>
                      {step.label}
                    </Type>
                    <Type variant="caption" tone="muted">
                      {step.detail}
                    </Type>
                  </View>
                </View>
              </View>
            );
          })}
        </Card>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  masthead: { gap: Spacing.two, paddingTop: Spacing.two, alignItems: 'center' },
  clock: { fontFamily: Fonts.mono, fontSize: 60, lineHeight: 66, fontWeight: '300' },
  track: { height: 6, borderRadius: 3, overflow: 'hidden' },
  fill: { height: 6, borderRadius: 3 },
  controls: { flexDirection: 'row', gap: Spacing.three },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.four,
    borderRadius: Radius.md,
  },
  buttonQuiet: { borderWidth: StyleSheet.hairlineWidth * 2 },
  buttonLabel: { color: '#FFF8F1' },
  schedule: { paddingVertical: 0, paddingHorizontal: 0, overflow: 'hidden' },
  scheduleRow: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.four,
  },
  at: { width: 46, paddingTop: 2 },
  scheduleBody: { flex: 1, gap: 2 },
});
