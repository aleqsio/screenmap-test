import { MethodScreen } from '@/components/method-screen';
import { methodById } from '@/data/methods';

export default function AeropressRoute() {
  return <MethodScreen method={methodById('aeropress')!} />;
}
