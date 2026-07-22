// Map Quiz leaderboard API — Cloudflare Worker + D1.
//
// Routes:
//   GET  /leaderboard?game=<id>&diff=<easy|hard>   -> top 20 [{name, streak}]
//   POST /score  {game, diff, name, streak}        -> upserts the player's best
//
// Anti-cheat: the server clamps each streak to the maximum that is actually
// possible for that game, and only ever keeps the higher of the stored/new
// value, so nonsense scores can't land. You remain the moderator — delete a
// bad row with:
//   wrangler d1 execute mapquiz --command "DELETE FROM scores WHERE name='...'"

const MAX = { states: 50, countries: 184, counties: 47, flags: 193 };
const DIFFS = ["easy", "hard"];

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...cors } });

// Keep names printable: drop control chars, collapse whitespace, cap length.
function cleanName(raw) {
  const stripped = String(raw || "").split("").filter(ch => ch.charCodeAt(0) >= 32).join("");
  const s = stripped.replace(/\s+/g, " ").trim().slice(0, 16);
  return s || "Anon";
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    const url = new URL(req.url);

    if (req.method === "GET" && url.pathname === "/leaderboard") {
      const game = url.searchParams.get("game");
      const diff = url.searchParams.get("diff");
      if (!MAX[game] || !DIFFS.includes(diff)) return json({ error: "bad params" }, 400);
      const { results } = await env.DB.prepare(
        "SELECT name, streak FROM scores WHERE game=? AND diff=? ORDER BY streak DESC, updated ASC LIMIT 20"
      ).bind(game, diff).all();
      return json(results || []);
    }

    if (req.method === "POST" && url.pathname === "/score") {
      let body;
      try { body = await req.json(); } catch { return json({ error: "bad json" }, 400); }
      const { game, diff } = body;
      if (!MAX[game] || !DIFFS.includes(diff)) return json({ error: "bad params" }, 400);
      const name = cleanName(body.name);
      const streak = Math.max(0, Math.min(parseInt(body.streak, 10) || 0, MAX[game]));
      await env.DB.prepare(
        `INSERT INTO scores (game, diff, name, streak, updated) VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(game, diff, name) DO UPDATE SET
           streak = MAX(streak, excluded.streak), updated = excluded.updated`
      ).bind(game, diff, name, streak, Date.now()).run();
      return json({ ok: true, streak });
    }

    return json({ error: "not found" }, 404);
  },
};
