import { Link } from 'expo-router';

import { BrewTimerButton } from '@/components/brew-button';
import { MethodScreen } from '@/components/method-screen';
import { methodById } from '@/data/methods';

export default function AeropressRoute() {
  const method = methodById('aeropress')!;
  return (
    <MethodScreen
      method={method}
      timer={
        <Link href="/brew/aeropress" asChild>
          <BrewTimerButton seconds={method.totalTime} />
        </Link>
      }
    />
  );
}
