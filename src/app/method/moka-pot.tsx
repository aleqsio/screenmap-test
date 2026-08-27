import { Link } from 'expo-router';

import { BrewTimerButton } from '@/components/brew-button';
import { MethodScreen } from '@/components/method-screen';
import { methodById } from '@/data/methods';

export default function MokaPotRoute() {
  const method = methodById('moka-pot')!;
  return (
    <MethodScreen
      method={method}
      timer={
        <Link href="/brew/moka-pot" asChild>
          <BrewTimerButton seconds={method.totalTime} />
        </Link>
      }
    />
  );
}
