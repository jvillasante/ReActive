CREATE OR REPLACE FUNCTION getTable1(startDate TIMESTAMP, endDate TIMESTAMP, projectName TEXT)
RETURNS SETOF NUMERIC AS
$BODY$
  SELECT ROUND((100.0 * yes_count) / total_count) AS percent
  FROM (
    SELECT
      sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
      sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
      sum(1) AS total_count
      FROM (
        SELECT v.item AS item, v.value AS value
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE v.item IN (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24)
        AND (r.id_template = 2 OR r.id_template = 14) AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND lower(v.value) <> 'n/a' AND p.name = projectName
      ) AS QUERY1
  ) AS QUERY2

  UNION ALL

  SELECT ROUND((100.0 * yes_count) / total_count) AS percent
  FROM (
    SELECT
      sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
      sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
      sum(1) AS total_count
      FROM (
        SELECT v.item AS item, v.value AS value
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE v.item IN (25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66)
        AND (r.id_template = 2 OR r.id_template = 14) AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND lower(v.value) <> 'n/a' AND p.name = projectName
      ) AS QUERY1
  ) AS QUERY2

  UNION ALL

  SELECT ROUND((100.0 * yes_count) / total_count) AS percent
  FROM (
    SELECT
      sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
      sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
      sum(1) AS total_count
      FROM (
        SELECT v.item AS item, v.value AS value
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE v.item IN (67,68,69,70,71,72,73,74,75,76,77,78)
        AND (r.id_template = 2 OR r.id_template = 14) AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND lower(v.value) <> 'n/a' AND p.name = projectName
      ) AS QUERY1
  ) AS QUERY2

  UNION ALL

  SELECT ROUND((100.0 * yes_count) / total_count) AS percent
  FROM (
    SELECT
      sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
      sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
      sum(1) AS total_count
      FROM (
        SELECT v.item AS item, v.value AS value
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE v.item IN (79,80,81,82,83,84,85,86,87)
        AND (r.id_template = 2 OR r.id_template = 14) AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND lower(v.value) <> 'n/a' AND p.name = projectName
      ) AS QUERY1
  ) AS QUERY2

  UNION ALL

  SELECT ROUND((100.0 * yes_count) / total_count) AS percent
  FROM (
    SELECT
      sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
      sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
      sum(1) AS total_count
      FROM (
        SELECT v.item AS item, v.value AS value
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE v.item IN (88,89,90,91,92,93)
        AND (r.id_template = 2 OR r.id_template = 14) AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND lower(v.value) <> 'n/a' AND p.name = projectName
      ) AS QUERY1
  ) AS QUERY2
$BODY$
LANGUAGE SQL;