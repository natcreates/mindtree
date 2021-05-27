UPDATE values
SET score = score + weights_to_apply.weight
FROM (SELECT weight, value_id
      FROM  weighting WHERE activity_id = $1) AS weights_to_apply
WHERE values.value_id=weights_to_apply.value_id
RETURNING *;
