import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Card, Chip, Eyebrow, Rule, Screen, Type } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { GRIND_NOTES, GRIND_SCALE, METHODS } from '@/data/methods';
import { usePalette } from '@/hooks/use-palette';

export default function GrindScreen() {
  const c = usePalette();
  return (
    <>
      <Stack.Screen options={{ title: 'Grind guide' }} />
      <Screen>
        <View style={styles.masthead}>
          <Eyebrow>Particle size</Eyebrow>
          <Type variant="display">Grind</Type>
          <Type variant="body" tone="muted">
            Grind size sets how fast water can move through the bed. Everything else — dose,
            temperature, time — is a correction on top of it.
          </Type>
        </View>

        <Card style={styles.scale}>
          {GRIND_SCALE.map((g, i) => {
            const users = METHODS.filter((m) => m.grind === g);
            return (
              <View key={g}>
                {i > 0 && <Rule />}
                <View style={styles.step}>
                  <View style={styles.stepHead}>
                    <View style={styles.dots}>
                      {Array.from({ length: 5 - i }, (_, d) => (
                        <View
                          key={d}
                          style={[
                            styles.dot,
                            { backgroundColor: c.roast, width: 3 + i * 1.6, height: 3 + i * 1.6 },
                          ]}
                        />
                      ))}
                    </View>
                    <Type variant="heading" style={styles.stepName}>
                      {g}
                    </Type>
                  </View>
                  <Type variant="caption" tone="muted">
                    {GRIND_NOTES[g]}
                  </Type>
                  {users.length > 0 && (
                    <View style={styles.users}>
                      {users.map((m) => (
                        <Chip key={m.id} tone="roast">
                          {m.name}
                        </Chip>
                      ))}
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </Card>

        <View style={styles.note}>
          <Eyebrow>Rule of thumb</Eyebrow>
          <Type variant="body" tone="muted">
            Sour and thin means the water left too early — go finer. Harsh and drying means it
            stayed too long — go coarser. Change one thing at a time.
          </Type>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  masthead: { gap: Spacing.two, paddingTop: Spacing.two },
  scale: { paddingVertical: 0 },
  step: { paddingVertical: Spacing.four, gap: Spacing.two },
  stepHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 2, width: 46 },
  dot: { borderRadius: 4 },
  stepName: { textTransform: 'capitalize' },
  users: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, paddingTop: Spacing.one },
  note: { gap: Spacing.two },
});
