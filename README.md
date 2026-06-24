# Number Merge

A mobile-first number-block merge shooter built with React, TypeScript, Vite, and CSS. It uses a DOM-based 5×8 board, has no backend, and stores progress locally in the browser.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with:

```bash
npm run build
```

## Controls

- Tap a lane to shoot.
- Drag the current block left or right and release to shoot.
- Desktop: use the left/right arrows and Space or Enter. Press `P` to pause.
- Hammer removes one block, Swap rerolls the shooter, and Undo restores the previous shot.

Progress saved in `localStorage` includes the best score, highest unlocked block, gems, level, tutorial completion, and booster counts.

The Profile tab provides a separate persistent player profile with a validated username, searchable country/flag selection, and twelve built-in SVG game avatars. Profile changes do not reset game progress.

## Game rules

Blocks enter from the bottom and stack downward from the top. Matching blocks merge, then matching orthogonal neighbors trigger chain merges. Each new merged value is added to the score. A full target lane ends the run.
