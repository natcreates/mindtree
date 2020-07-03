BEGIN;
CREATE TABLE IF NOT EXISTS values (
  value_id UUID NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description TEXT,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  score INTEGER NOT NULL DEFAULT 0,
  UNIQUE (name, deleted)
);

CREATE TABLE IF NOT EXISTS activities (
  activity_id UUID NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description TEXT,
  deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS weighting (
  weighting_id SERIAL PRIMARY KEY,
  activity_id UUID NOT NULL REFERENCES activities(activity_id) ON DELETE CASCADE,
  value_id UUID NOT NULL REFERENCES values(value_id) ON DELETE CASCADE,
  weight INTEGER NOT NULL DEFAULT 0,
  UNIQUE (activity_id, value_id)
);
END;
