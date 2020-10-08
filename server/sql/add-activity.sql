INSERT INTO activities (
 activity_id,
 name,
 description
) VALUES ($1, $2, $3)
ON CONFLICT (activity_id) DO UPDATE SET name = $2, description = $3;
