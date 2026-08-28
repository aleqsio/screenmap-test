import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Eyebrow, Rule, Screen, Type } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { METHODS } from '@/data/methods';

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'About Brew' }} />
      <Screen contentStyle={styles.content}>
        <View style={styles.masthead}>
          <Eyebrow>Colophon · pushed</Eyebrow>
          <Type variant="title">About Brew</Type>
        </View>

        <Type variant="body" tone="muted">
          A small field guide to {METHODS.length} ways of making coffee. Every recipe here is a
          starting point — weigh things, taste, then change one variable.
        </Type>

        <Rule />

        <View style={styles.block}>
          <Eyebrow>Why this app exists</Eyebrow>
          <Type variant="body" tone="muted">
            It is the demo app for Screenmap, a GitHub Action that maps every screen of an Expo app
            on an iOS simulator and shows reviewers what a pull request changed on-screen.
          </Type>
        </View>

        <View style={styles.block}>
          <Eyebrow>Numbers</Eyebrow>
          <Type variant="mono" tone="muted">
            Weights in grams. Temperatures in Celsius. Times as m:ss from first contact with water.
          </Type>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: Spacing.five },
  masthead: { gap: Spacing.two },
  block: { gap: Spacing.two },
});
