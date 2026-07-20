# Name the State

A dead-simple US geography game. It highlights one state on the map; you **type its name** and press Enter. Autocomplete only helps with spelling — you still have to recall the name yourself, so there's no multiple-choice list to eliminate your way through. The goal: eventually know the name and location of all 50 states.

## Play

Open `index.html` in any browser — no build step, no server. It's one self-contained file. Works great on a phone.

To play from a URL, drop it on any static host (e.g. GitHub Pages: enable Pages on this branch and visit the published link).

## How it works

- One highlighted state per round, drawn from a shuffled bag so all 50 come up before any repeats.
- Type the state name; suggestions appear as you type. Enter accepts the top suggestion.
- Correct → streak and score go up, state flashes green. Wrong → it shows the right answer and resets your streak.
- Best streak is saved in your browser (`localStorage`).

## Credits

US map SVG paths are from the [`react-usa-map`](https://github.com/gabidavila/react-usa-map) project, whose map derives from Wikimedia and is licensed **CC BY-SA 3.0**.
