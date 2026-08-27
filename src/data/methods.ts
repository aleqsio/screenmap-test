/**
 * Every brewing method the app knows about. One entry per method screen under
 * `src/app/method/`; the `id` is the route segment and the deep-link path.
 */

import type { Href } from 'expo-router';

export type Grind = 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse';

export type BrewStep = {
  /** Seconds from the start of the brew that this step begins. */
  at: number;
  label: string;
  detail: string;
};

export type Method = {
  id: string;
  /** Typed route of this method's own screen under `src/app/method/`. */
  href: Href;
  name: string;
  tagline: string;
  /** Grams of water per gram of coffee, written the way recipes are. */
  ratio: string;
  dose: string;
  grind: Grind;
  water: string;
  /** Total brew time in seconds. */
  totalTime: number;
  /** 1–5, for the comparison bars. */
  body: number;
  clarity: number;
  effort: number;
  blurb: string;
  steps: BrewStep[];
  tips: string[];
};

export const GRIND_SCALE: Grind[] = ['fine', 'medium-fine', 'medium', 'medium-coarse', 'coarse'];

export const GRIND_NOTES: Record<Grind, string> = {
  fine: 'Caster sugar. Packs tight, resists water, extracts fast.',
  'medium-fine': 'Table salt. The workhorse for cone drippers.',
  medium: 'Coarse sand. Forgiving — start here when you are guessing.',
  'medium-coarse': 'Raw sugar. Slows the flow without going muddy.',
  coarse: 'Sea salt flakes. Built for long steeps and metal filters.',
};

export const METHODS: Method[] = [
  {
    id: 'v60',
    href: '/method/v60',
    name: 'Hario V60',
    tagline: 'Pour-over, cone filter',
    ratio: '1:16',
    dose: '22 g',
    grind: 'medium-fine',
    water: '350 g at 94 °C',
    totalTime: 180,
    body: 2,
    clarity: 5,
    effort: 4,
    blurb:
      'A paper cone with one big hole and a spiral rib. Nothing holds the water back, so the pour is the recipe — go slow and you get a long, sweet extraction, go fast and you get tea.',
    steps: [
      { at: 0, label: 'Bloom', detail: 'Pour 50 g in circles. Swirl the bed flat and wait.' },
      { at: 45, label: 'First pour', detail: 'Up to 200 g, spiralling out from the centre.' },
      { at: 85, label: 'Second pour', detail: 'Up to 350 g. Keep the bed level, avoid the walls.' },
      { at: 130, label: 'Drawdown', detail: 'Let it run dry. The bed should be flat, not craterous.' },
    ],
    tips: [
      'Rinse the paper with boiling water or you will taste it.',
      'If it drains under 2:30, grind finer. Over 3:30, coarser.',
      'A flat bed at the end means an even extraction.',
    ],
  },
  {
    id: 'aeropress',
    href: '/method/aeropress',
    name: 'AeroPress',
    tagline: 'Immersion, pressed through paper',
    ratio: '1:14',
    dose: '18 g',
    grind: 'medium',
    water: '250 g at 88 °C',
    totalTime: 135,
    body: 3,
    clarity: 4,
    effort: 2,
    blurb:
      'A syringe with a paper filter. It steeps like a French press and filters like a pour-over, and it is almost impossible to ruin — which is why it lives in every travel bag.',
    steps: [
      { at: 0, label: 'Fill', detail: 'All 250 g at once. Stir twice, cap it.' },
      { at: 20, label: 'Steep', detail: 'Leave it alone. No stirring, no swirling.' },
      { at: 100, label: 'Press', detail: 'Thirty seconds of steady weight. Stop at the hiss.' },
    ],
    tips: [
      'Cooler water than you think — 88 °C keeps the bitterness out.',
      'Inverted brewing buys you a longer steep, at the cost of a scarier flip.',
      'One paper filter is plenty; two just slows the press.',
    ],
  },
  {
    id: 'french-press',
    href: '/method/french-press',
    name: 'French Press',
    tagline: 'Full immersion, metal mesh',
    ratio: '1:15',
    dose: '30 g',
    grind: 'coarse',
    water: '450 g at 96 °C',
    totalTime: 480,
    body: 5,
    clarity: 2,
    effort: 1,
    blurb:
      'Grounds sit in water for four minutes and a metal screen holds most of them back. The oils come through, so the cup is heavy and round — and there is always a little silt at the bottom.',
    steps: [
      { at: 0, label: 'Pour', detail: 'All the water in one go. Do not stir yet.' },
      { at: 240, label: 'Break the crust', detail: 'Stir the raft once, skim the foam off the top.' },
      { at: 300, label: 'Settle', detail: 'Wait. The fines are sinking; let them.' },
      { at: 420, label: 'Plunge and pour', detail: 'Press slowly, decant everything immediately.' },
    ],
    tips: [
      'Never leave the coffee sitting on the grounds — decant the whole pot.',
      'Skimming after the stir removes most of the silt.',
      'Coarse means coarse. Fines are what make it muddy.',
    ],
  },
];

export function methodById(id: string): Method | undefined {
  return METHODS.find((m) => m.id === id);
}

export function formatClock(seconds: number): string {
  const m = Math.floor(Math.abs(seconds) / 60);
  const s = Math.abs(seconds) % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
