import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Card, Eyebrow, Rule, Screen, Type } from '@/components/ui';
import { Spacing } from '@/constants/theme';

const KIT = [
  ['Scale', 'To 0.1g. Guessing the dose is guessing the coffee.'],
  ['Kettle', 'Gooseneck if you pour by hand. Otherwise anything that boils.'],
  ['Grinder', 'The one thing worth spending on. Burrs, not blades.'],
];

export default function KitScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Kit' }} />
      <Screen>
        <View style={styles.masthead}>
          <Eyebrow>What you need</Eyebrow>
          <Type variant="display">Kit</Type>
        </View>
        <Card style={styles.list}>
          {KIT.map(([name, note], i) => (
            <View key={name}>
              {i > 0 && <Rule />}
              <View style={styles.row}>
                <Type variant="heading">{name}</Type>
                <Type variant="caption" tone="muted">{note}</Type>
              </View>
            </View>
          ))}
        </Card>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  masthead: { gap: Spacing.two, paddingTop: Spacing.two },
  list: { paddingVertical: 0 },
  row: { paddingVertical: Spacing.four, gap: Spacing.two },
});
