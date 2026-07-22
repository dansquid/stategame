-- One row per (game, difficulty, name): keeps that player's best streak.
CREATE TABLE IF NOT EXISTS scores (
  game    TEXT    NOT NULL,
  diff    TEXT    NOT NULL,
  name    TEXT    NOT NULL,
  streak  INTEGER NOT NULL,
  updated INTEGER NOT NULL,
  PRIMARY KEY (game, diff, name)
);

-- Fast "top streaks for this game+difficulty" lookups.
CREATE INDEX IF NOT EXISTS board ON scores (game, diff, streak DESC);
