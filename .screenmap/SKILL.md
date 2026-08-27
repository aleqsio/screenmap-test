---
name: screenmap-project
description: Project-specific guidance for the screenmap agent when it explores screens of this app in CI.
---

# How to explore Brew

A small offline guide to coffee brewing methods. No auth, no network, no
destructive actions anywhere — every screen is safe to open and every control is
safe to tap.

## Route map in one line

Two tabs (Methods, Compare). Methods links to one screen per brewing method;
each method screen links to its brew timer. Compare links to the grind guide.
The Methods tab has an "About this guide" row that opens a modal.

## Real params

- `/brew/:id` → the id is a method id: `v60`, `aeropress`, `french-press` or `moka-pot`.
  Use `v60`. Anything else falls back to the first method rather than erroring.

## Screens worth extra states

- `/brew/v60` starts paused at the full time. Tapping **Start** switches the
  headline to a running clock and highlights the live step — a good state
  variant. **Reset** puts it back.
- `/about` opens with modal presentation from the Methods tab.

## Timing

- Everything is local and instant; the default transition wait is plenty. The
  only thing that moves on its own is the brew timer, one tick per second.

## Notes vocabulary

- Say what a user would see ("the Compare table gained a Moka Pot row"), not how
  the code changed.
