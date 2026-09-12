import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function RootLayout() {
  const scheme = useColorScheme();
  const dark = scheme === 'dark';
  const base = dark ? DarkTheme : DefaultTheme;
  const c = Colors[dark ? 'dark' : 'light'];

  return (
    <ThemeProvider
      value={{
        ...base,
        colors: { ...base.colors, background: c.paper, card: c.paper, text: c.ink, primary: c.roast, border: c.line },
      }}>
      {/* headerBlurEffect is iOS-only. A transparent header with nothing behind
          it — which is what Android gets — renders its title straight over the
          screen's own display title, so every pushed screen showed both at once
          ("Grind" under "Grind guide"). Android keeps an opaque header; iOS is
          unchanged. */}
      <Stack
        screenOptions={
          Platform.OS === 'ios'
            ? { headerTransparent: true, headerBlurEffect: 'regular' }
            : { headerTransparent: false, headerStyle: { backgroundColor: c.paper }, headerShadowVisible: false }
        }>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Brew' }} />
        <Stack.Screen name="method/v60" options={{ title: 'Hario V60' }} />
        <Stack.Screen name="method/aeropress" options={{ title: 'AeroPress' }} />
        <Stack.Screen name="method/french-press" options={{ title: 'French Press' }} />
        <Stack.Screen name="brew/[id]" options={{ title: 'Brew timer' }} />
        <Stack.Screen name="grind" options={{ title: 'Grind guide' }} />
        <Stack.Screen name="about" options={{ title: 'About Brew' }} />
      </Stack>
    </ThemeProvider>
  );
}
