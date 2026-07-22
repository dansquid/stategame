# Map Quiz leaderboard — Cloudflare Worker + D1

A tiny, free backend for the shared leaderboard. Your game stays on GitHub
Pages; it just calls this Worker's URL.

## Cost

Free at any realistic scale for this game: Cloudflare Workers include 100k
requests/day and D1 includes 5 GB storage with millions of row-reads/day on
the free plan. No card required, and it never sleeps.

## One-time setup (~30 minutes)

You need Node installed. From this `server/` folder:

```bash
npm install -g wrangler       # Cloudflare's CLI
wrangler login                # opens a browser to authorise your CF account

wrangler d1 create mapquiz    # creates the database, prints a database_id
```

1. Copy the printed `database_id` into `wrangler.toml` (replace
   `PASTE_YOUR_DATABASE_ID_HERE`).
2. Create the table (run for the remote DB):

   ```bash
   wrangler d1 execute mapquiz --remote --file schema.sql
   ```
3. Deploy the API:

   ```bash
   wrangler deploy
   ```

   Wrangler prints the URL, e.g. `https://mapquiz-api.yourname.workers.dev`.
4. Put that URL into `../config.js`:

   ```js
   window.LEADERBOARD_API = "https://mapquiz-api.yourname.workers.dev";
   ```

   Commit and push. The leaderboard button now appears in the game's menu.
   (Because assets are cached by the service worker, bump the `CACHE` version
   in `../sw.js` so installed users pick up the new `config.js`.)

## API

- `GET /leaderboard?game=<states|countries|counties|flags>&diff=<easy|hard>`
  → `[{ "name": "...", "streak": 12 }, ...]` (top 20, highest first)
- `POST /score` with JSON `{ game, diff, name, streak }` → upserts the
  player's best for that game+difficulty.

## Moderation & anti-cheat

- Streaks are clamped server-side to the maximum possible per game
  (states 50, countries 184, counties 47, flags 193), so absurd values can't
  be stored. Only the higher of the stored/submitted streak is kept.
- To remove an entry:

  ```bash
  wrangler d1 execute mapquiz --remote \
    --command "DELETE FROM scores WHERE name='SomeName'"
  ```
- To wipe a board:

  ```bash
  wrangler d1 execute mapquiz --remote \
    --command "DELETE FROM scores WHERE game='states' AND diff='hard'"
  ```

## Local testing

```bash
wrangler dev --remote
```

Then point `../config.js` at the printed localhost URL temporarily.
