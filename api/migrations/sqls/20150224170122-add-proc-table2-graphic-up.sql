CREATE OR REPLACE FUNCTION getTable2Graphic(startDate TIMESTAMP, endDate TIMESTAMP, projectName TEXT)
RETURNS TABLE(col text, theDate date, percent numeric)
AS
$BODY$
  SELECT 'Separar lo Innecesario' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
    FROM (
      SELECT
        updated_at::date AS theDate,
        sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
        sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
        sum(1) AS total_count
        FROM (
          SELECT v.item AS item, v.value AS value, r.updated_at AS updated_at
          FROM values v
          INNER JOIN fields f ON f.id = v.id_field
          INNER JOIN reports r ON r.id = f.id_report
          INNER JOIN projects p ON p.id = r.id_project
          WHERE v.item IN (1,3,5,7,9,11,13)
          AND r.id_template = 3 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Situar lo Necesario' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
    FROM (
      SELECT
        updated_at::date AS theDate,
        sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
        sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
        sum(1) AS total_count
        FROM (
          SELECT v.item AS item, v.value AS value, r.updated_at AS updated_at
          FROM values v
          INNER JOIN fields f ON f.id = v.id_field
          INNER JOIN reports r ON r.id = f.id_report
          INNER JOIN projects p ON p.id = r.id_project
          WHERE v.item IN (15,17,19,21,23,25,27,29,31,33,35,37,39,41,43)
          AND r.id_template = 3 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Suprimir Suciedad' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
    FROM (
      SELECT
        updated_at::date AS theDate,
        sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
        sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
        sum(1) AS total_count
        FROM (
          SELECT v.item AS item, v.value AS value, r.updated_at AS updated_at
          FROM values v
          INNER JOIN fields f ON f.id = v.id_field
          INNER JOIN reports r ON r.id = f.id_report
          INNER JOIN projects p ON p.id = r.id_project
          WHERE v.item IN (45,47,49,51,53,55,57,59)
          AND r.id_template = 3 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Señalizar Anomalías' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
    FROM (
      SELECT
        updated_at::date AS theDate,
        sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
        sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
        sum(1) AS total_count
        FROM (
          SELECT v.item AS item, v.value AS value, r.updated_at AS updated_at
          FROM values v
          INNER JOIN fields f ON f.id = v.id_field
          INNER JOIN reports r ON r.id = f.id_report
          INNER JOIN projects p ON p.id = r.id_project
          WHERE v.item IN (61,63,65,67,69,71,73,75,77)
          AND r.id_template = 3 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Seguir Mejorando' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
    FROM (
      SELECT
        updated_at::date AS theDate,
        sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
        sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
        sum(1) AS total_count
        FROM (
          SELECT v.item AS item, v.value AS value, r.updated_at AS updated_at
          FROM values v
          INNER JOIN fields f ON f.id = v.id_field
          INNER JOIN reports r ON r.id = f.id_report
          INNER JOIN projects p ON p.id = r.id_project
          WHERE v.item IN (79,81,83,85,87,89)
          AND r.id_template = 3 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Seguridad' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
    FROM (
      SELECT
        updated_at::date AS theDate,
        sum(CASE WHEN lower(value)='si' THEN 1 ELSE 0 END) AS yes_count,
        sum(CASE WHEN lower(value)='no' THEN 1 ELSE 0 END) AS no_count,
        sum(1) AS total_count
        FROM (
          SELECT v.item AS item, v.value AS value, r.updated_at AS updated_at
          FROM values v
          INNER JOIN fields f ON f.id = v.id_field
          INNER JOIN reports r ON r.id = f.id_report
          INNER JOIN projects p ON p.id = r.id_project
          WHERE v.item IN (91,93,95,97)
          AND r.id_template = 3 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  ORDER BY col, theDate
$BODY$
LANGUAGE SQL;