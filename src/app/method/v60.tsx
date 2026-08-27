import { Link } from 'expo-router';

import { BrewTimerButton } from '@/components/brew-button';
import { MethodScreen } from '@/components/method-screen';
import { methodById } from '@/data/methods';

export default function V60Route() {
  const method = methodById('v60')!;
  return (
    <MethodScreen
      method={method}
      timer={
        <Link href="/brew/v60" asChild>
          <BrewTimerButton seconds={method.totalTime} />
        </Link>
      }
    />
  );
}
