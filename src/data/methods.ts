/**
 * Every brewing method the app knows about. One entry per method screen under
 * `src/app/method/`; the `id` is the route segment and the deep-link path.
 */

export type Grind = 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse';

export type BrewStep = {
  /** Seconds from the start of the brew that this step begins. */
  at: number;
  label: string;
  detail: string;
};

export type Method = {
  id: string;
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
];

export function methodById(id: string): Method | undefined {
  return METHODS.find((m) => m.id === id);
}

export function formatClock(seconds: number): string {
  const m = Math.floor(Math.abs(seconds) / 60);
  const s = Math.abs(seconds) % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
