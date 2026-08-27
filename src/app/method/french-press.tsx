import { Link } from 'expo-router';

import { BrewTimerButton } from '@/components/brew-button';
import { MethodScreen } from '@/components/method-screen';
import { methodById } from '@/data/methods';

export default function FrenchPressRoute() {
  const method = methodById('french-press')!;
  return (
    <MethodScreen
      method={method}
      timer={
        <Link href="/brew/french-press" asChild>
          <BrewTimerButton seconds={method.totalTime} />
        </Link>
      }
    />
  );
}
