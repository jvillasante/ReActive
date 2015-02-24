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
          WHERE r.id_template = 8 AND (r.updated_at::date BETWEEN startDate AND endDate)
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
          WHERE r.id_template = 9 AND (r.updated_at::date BETWEEN startDate AND endDate)
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
          WHERE r.id_template = 10 AND (r.updated_at::date BETWEEN startDate AND endDate)
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
          WHERE r.id_template = 11 AND (r.updated_at::date BETWEEN startDate AND endDate)
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
          WHERE r.id_template = 12 AND (r.updated_at::date BETWEEN startDate AND endDate)
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
          WHERE r.id_template = 13 AND (r.updated_at::date BETWEEN startDate AND endDate)
            AND lower(v.value) <> 'n/a' AND p.name = projectName
        ) AS QUERY1
        GROUP BY theDate
    ) AS QUERY2

  ORDER BY col, theDate
$BODY$
LANGUAGE SQL;