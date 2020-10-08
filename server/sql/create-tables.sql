BEGIN;

--DROP TABLE weighting;
--DROP TABLE activities;
--DROP TABLE values;

CREATE TABLE IF NOT EXISTS values (
  value_id UUID NOT NULL UNIQUE PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE,
  description TEXT DEFAULT '',
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  score INTEGER NOT NULL DEFAULT 0,
  UNIQUE (name, deleted)
);

CREATE TABLE IF NOT EXISTS activities (
  activity_id UUID NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  description TEXT DEFAULT '',
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (activity_id)
);

CREATE TABLE IF NOT EXISTS weighting (
  weighting_id SERIAL NOT NULL UNIQUE,
  activity_id UUID NOT NULL REFERENCES activities(activity_id) ON DELETE CASCADE,
  value_id UUID NOT NULL REFERENCES values(value_id) ON DELETE CASCADE,
  weight INTEGER NOT NULL DEFAULT 0,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (activity_id,value_id)
);
END;
