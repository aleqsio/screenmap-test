import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Card, Chip, Eyebrow, Rule, Screen, Type } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { usePalette } from '@/hooks/use-palette';

/* Temperature bands, coolest first. The chips name the methods that sit in
   each band, which is the same shape the grind guide used. */
const BANDS = [
  {
    range: '80–88°C',
    name: 'cool',
    note: 'Light roasts stay sweet instead of turning sharp. Slower to extract, so give it time.',
    methods: ['AeroPress'],
  },
  {
    range: '90–94°C',
    name: 'standard',
    note: 'Where most recipes land. Hot enough to pull sugars, not so hot it strips the cup.',
    methods: ['V60', 'French press'],
  },
  {
    range: '95–100°C',
    name: 'hot',
    note: 'Dark roasts and stale beans need the extra energy. Anything fresh will taste harsh.',
    methods: [],
  },
];

const MINERALS = [
  ['Calcium + magnesium', 'Carry flavour. Too little and the cup reads flat and watery.'],
  ['Bicarbonate', 'Buffers acidity. Too much and everything tastes dull and chalky.'],
  ['Chlorine', 'Ruins a cup on its own. Filter it out before anything else.'],
];

export default function WaterScreen() {
  const c = usePalette();
  return (
    <>
      <Stack.Screen options={{ title: 'Water' }} />
      <Screen>
        <View style={styles.masthead}>
          <Eyebrow>98% of the cup</Eyebrow>
          <Type variant="display">Water</Type>
          <Type variant="body" tone="muted">
            Coffee is almost entirely water, so the water decides how much of the bean you ever
            taste. Temperature sets the pace, minerals decide what comes through.
          </Type>
        </View>

        <Card style={styles.bands}>
          {BANDS.map((band, i) => (
            <View key={band.range}>
              {i > 0 && <Rule />}
              <View style={styles.band}>
                <View style={styles.bandHead}>
                  <View
                    style={[styles.gauge, { borderColor: c.line }]}
                  >
                    <View
                      style={[
                        styles.gaugeFill,
                        { backgroundColor: c.roast, height: `${34 + i * 33}%` },
                      ]}
                    />
                  </View>
                  <View style={styles.bandTitle}>
                    <Type variant="heading">{band.range}</Type>
                    <Type variant="label" tone="muted">
                      {band.name}
                    </Type>
                  </View>
                </View>
                <Type variant="caption" tone="muted">
                  {band.note}
                </Type>
                {band.methods.length > 0 && (
                  <View style={styles.methods}>
                    {band.methods.map((m) => (
                      <Chip key={m} tone="roast">
                        {m}
                      </Chip>
                    ))}
                  </View>
                )}
              </View>
            </View>
          ))}
        </Card>

        <View style={styles.note}>
          <Eyebrow>What is in it</Eyebrow>
          {MINERALS.map(([label, text]) => (
            <View key={label} style={styles.mineral}>
              <Type variant="label">{label}</Type>
              <Type variant="caption" tone="muted">
                {text}
              </Type>
            </View>
          ))}
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  masthead: { gap: Spacing.two, paddingTop: Spacing.two },
  bands: { paddingVertical: 0 },
  band: { paddingVertical: Spacing.four, gap: Spacing.two },
  bandHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  gauge: {
    width: 14,
    height: 34,
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  gaugeFill: { width: '100%' },
  bandTitle: { gap: 2 },
  methods: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, paddingTop: Spacing.one },
  note: { gap: Spacing.three },
  mineral: { gap: 2 },
});
