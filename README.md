# Brew

A small Expo app: a field guide to coffee brewing methods. It exists to exercise
[Screenmap](https://screenmap.dev) end to end — every screen gets mapped on an
iOS simulator in CI, and every pull request gets a comment showing what changed
on-screen.

## The app

| Route | Screen |
| --- | --- |
| `/` | Methods — the list of brewing methods |
| `/compare` | Compare — body, clarity and effort side by side |
| `/method/v60` | Hario V60 — recipe, pour schedule, tips |
| `/method/aeropress` | AeroPress |
| `/method/french-press` | French Press |
| `/method/moka-pot` | Moka Pot |
| `/brew/[id]` | Brew timer for one method |
| `/grind` | Grind guide |
| `/about` | About, presented as a modal |

Every method has its own route file under `src/app/method/` so that adding a
method shows up in the map as a new screen rather than a new value of a
parameter.

## Running it

```bash
npm install
npx expo prebuild --platform ios
npx expo run:ios
```

## Screenmap

Two workflows in `.github/workflows/`:

- `screenmap-baseline.yml` keeps the map of `main` fresh on the `screenmaps`
  branch. Run it once by hand before opening the first pull request.
- `screenmap-pr.yml` diffs a pull request against that baseline and posts the
  sticky comment.

Both need an `EXPO_TOKEN` repository secret (EAS builds the simulator dev
client) and, optionally, `ANTHROPIC_API_KEY` so the agent can explore screens
with no recorded flow. `.screenmap/config.json` holds the mechanical knobs and
`.screenmap/SKILL.md` tells the agent how this app works.
