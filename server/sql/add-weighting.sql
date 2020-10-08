INSERT INTO weighting (
 activity_id,
 value_id,
 weight
) VALUES ($1, $2, $3)
ON CONFLICT (activity_id, value_id) DO UPDATE SET weight = $3;
