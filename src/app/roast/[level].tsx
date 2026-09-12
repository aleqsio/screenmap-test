import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Eyebrow, Screen, Type } from '@/components/ui';
import { Spacing } from '@/constants/theme';

const NOTES: Record<string, string> = {
  light: 'Floral and acidic. The bean still tastes of where it grew.',
  medium: 'Balanced. Caramel sweetness with the origin still readable.',
  dark: 'Roast forward. Bitter chocolate, and the origin mostly gone.',
};

export default function RoastScreen() {
  const { level } = useLocalSearchParams<{ level: string }>();
  const note = NOTES[String(level)] ?? 'No such roast level.';
  return (
    <>
      <Stack.Screen options={{ title: 'Roast' }} />
      <Screen>
        <View style={styles.masthead}>
          <Eyebrow>Roast level</Eyebrow>
          <Type variant="display">{String(level)}</Type>
          <Type variant="body" tone="muted">{note}</Type>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({ masthead: { gap: Spacing.two, paddingTop: Spacing.two } });
