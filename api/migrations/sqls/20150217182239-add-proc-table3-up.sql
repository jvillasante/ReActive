CREATE OR REPLACE FUNCTION getTable3(startDate TIMESTAMP, endDate TIMESTAMP, projectName TEXT)
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
        AND r.id_template = 8 AND (r.created_at BETWEEN startDate AND endDate)
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
        AND r.id_template = 9 AND (r.created_at BETWEEN startDate AND endDate)
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
        AND r.id_template = 10 AND (r.created_at BETWEEN startDate AND endDate)
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
        AND r.id_template = 11 AND (r.created_at BETWEEN startDate AND endDate)
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
        AND r.id_template = 12 AND (r.created_at BETWEEN startDate AND endDate)
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
        AND r.id_template = 13 AND (r.created_at BETWEEN startDate AND endDate)
          AND lower(v.value) <> 'n/a' AND p.name = projectName
      ) AS QUERY1
  ) AS QUERY2
$BODY$
LANGUAGE SQL;