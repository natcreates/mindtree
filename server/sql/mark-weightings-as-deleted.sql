UPDATE weighting
SET deleted = true
WHERE value_id = $1 OR activity_id = $1
