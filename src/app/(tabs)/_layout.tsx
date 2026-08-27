import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function TabsLayout() {
  const scheme = useColorScheme();
  const c = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs backgroundColor={c.paper} labelStyle={{ selected: { color: c.roast } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Methods</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'cup.and.saucer', selected: 'cup.and.saucer.fill' }} />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="compare">
        <NativeTabs.Trigger.Label>Compare</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
