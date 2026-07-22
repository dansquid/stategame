# Map Quiz

A dead-simple geography guessing game. It shows you something on a map (or a flag) and you **type the name** — no multiple-choice options to eliminate your way through, so it's real recall. Pick a game from the ☰ menu, top-left.

## Games

- **US States** — name the highlighted US state (all 50).
- **World Countries** — name the highlighted country (184 on the map).
- **England Counties** — name the highlighted ceremonial county (47).
- **Name the Flag** — a flag is shown; name the country (193).

## How to play

- Open the site — no build step, no server, works on a phone.
- Answer on the **built-in keyboard** (so the phone's own keyboard never covers the map). On a laptop you can just type.
- Correct → streak and score go up. Wrong → it shows the right answer.
- **Best streak is saved per game and per difficulty** in your browser.

## Difficulty (☰ menu)

- **Hard** *(default)* — type the answer; suggestions appear to help spelling; Enter takes the top one. The **💡 key** reveals the first letter (tap again for more).
- **Easy** — tap one of 6 options, then a **Next** button. Good for hard sets like flags.

## Zoom (map games)

- On the **World map**, each question **zooms to the highlighted country**, scaled to its size — tiny countries zoom in close, big ones barely at all. Turn this off in the ☰ menu's **Options**.
- On **all** map games you can zoom manually with the on-map **+ / −** buttons (Focus → Mid → Full). The US and England maps do not auto-zoom.
- A **locator ring** is drawn around the highlighted region whenever it's small, so tiny countries/counties/states are always easy to spot.

Common alternate names are accepted (e.g. *USA*, *UK*, *Holland*, *Burma*, *Swaziland*), and accents/apostrophes are ignored so *Cote dIvoire* works.

## Project layout

```
index.html        game engine + menu (self-contained)
data/states.js    US state shapes
data/countries.js world country shapes
data/counties.js  England ceremonial county shapes
data/flags.js     country list for the flag game
flags/<iso2>.svg  flag images
```

## Credits

- US map paths from [`react-usa-map`](https://github.com/gabidavila/react-usa-map) (derived from Wikimedia, CC BY-SA 3.0).
- World country paths from [`world-map-country-shapes`](https://github.com/sirLisko/world-map-country-shapes).
- England ceremonial county paths from [`counties-quiz`](https://github.com/hickford/counties-quiz).
- Country names from [`world_countries`](https://github.com/stefangabos/world_countries).
- Flags from [`country-flags`](https://github.com/hampusborgos/country-flags) (public domain).
