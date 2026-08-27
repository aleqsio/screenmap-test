import { MethodScreen } from '@/components/method-screen';
import { methodById } from '@/data/methods';

export default function FrenchPressRoute() {
  return <MethodScreen method={methodById('french-press')!} />;
}
