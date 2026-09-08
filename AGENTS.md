# AGENTS.md

2D puzzle-platformer built with Phaser 4 + Vite 8 (per `ESCARABOX - GDD.docx`). Plain JavaScript, ES modules.

## Commands
- `npm run dev` — Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- There are no test, lint, or typecheck scripts — don't invent them.

## Structure
- `index.html` is the single entry page (title ESCARABOX); it loads `/src/main.js` as an ES module. `<div id="app">` is the Phaser container.
- `src/main.js` bootstraps the game: `new Phaser.Game(config)` at 640x960 portrait, `Scale.FIT + CENTER_BOTH`, and registers the scene list.
- `src/game/scenes/` holds one file per Phaser scene; each scene `extends Phaser.Scene` and imports `Phaser` itself. Only `MenuScene.js` exists so far (title + centered "JUGAR" button with hover/press feedback; `onPlay()` is a placeholder).
- `vite.config.js` splits `phaser` into its own chunk via a `manualChunks` **function** (Rolldown/Vite 8 rejects the object form).
- Runtime assets live in `public/` (e.g. `/favicon.svg`). The game currently uses colors/Graphics only — no image assets.

## Game design (per GDD)
- 1 life; push boxes onto buttons to unlock a door; hazards: spikes and lasers; death → GameOver ("retry level" / "main menu"); 3 levels → Victory.
- Rooms are taller than wide (portrait).
- Controls: arrow keys move, SPACE jumps.
- Implemented so far: `Menu` scene only. Levels, `GameOver`, `Victory` are not built yet.

## Notes
- Folder is `TP-Agentes` but `package.json` `name` is still `my-vite-app`.
- Repo is git-initialized (single "Initial commit" from GitHub scaffold); dist/ is gitignored.