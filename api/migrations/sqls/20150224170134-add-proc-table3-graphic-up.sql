CREATE OR REPLACE FUNCTION getTable3Graphic(startDate TIMESTAMP, endDate TIMESTAMP, projectName TEXT)
RETURNS TABLE(col text, theDate date, percent numeric)
AS
$BODY$
  SELECT 'Checklist Señalética' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
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
          WHERE v.item IN (1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49)
            AND r.id_template = 8 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Checklist Seguridad y Protección' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
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
          WHERE v.item IN (1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39)
            AND r.id_template = 9 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Checklist Vías de Acceso' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
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
          WHERE v.item IN (1,3,5,7,9,11,13,15,17,19,21)
            AND r.id_template = 10 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Checklist Logística' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
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
          WHERE v.item IN (1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57)
            AND r.id_template = 11 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Checklist Tierra, Escombros y Basura' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
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
          WHERE v.item IN (1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37)
            AND r.id_template = 12 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  UNION ALL

  SELECT 'Sello Manquehue' AS col, theDate, ROUND((100.0 * yes_count) / total_count, 2) AS percent
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
          WHERE v.item IN (1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99)
            AND r.id_template = 13 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  ORDER BY col, theDate
$BODY$
LANGUAGE SQL;