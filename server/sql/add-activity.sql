WITH value_id AS (
 SELECT value_id FROM values
 WHERE name = $5
),
INSERT INTO activities(
 activity_id,
 description
 name,
) VALUES ($1, $2, $3);
INSERT INTO weighting(
 activity_id,
 value_id,
 weight
) VALUES ($1, value_id, $4);
