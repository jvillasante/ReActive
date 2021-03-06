CREATE OR REPLACE FUNCTION getBenchmarkTableGraphic(startDate TIMESTAMP, endDate TIMESTAMP, projectName TEXT)
RETURNS TABLE(col text, theDate date, percent numeric)
AS
$BODY$
  SELECT 'Desviación de Costo' AS col, theDate, ROUND(((val1 - val2) / val2::float)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=1 THEN val ELSE 0 END) AS val1,
      SUM(CASE WHEN item=2 THEN val ELSE 0 END) AS val2
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (1,2)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Desviación de Plazo de Construcción' AS col, theDate, ROUND(((val3 - val4) / val4::float)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=3 THEN val ELSE 0 END) AS val3,
      SUM(CASE WHEN item=4 THEN val ELSE 0 END) AS val4
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (3, 4)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Indice de Frecuencia' AS col, theDate, ROUND((val5::float / total_count)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=5 THEN val ELSE 0 END) AS val5,
      sum(1) AS total_count
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (5)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Indice de Gravedad' AS col, theDate, ROUND((val6::float / total_count)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=6 THEN val ELSE 0 END) AS val6,
      sum(1) AS total_count
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (6)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Efectividad de Planificación' AS col, theDate, ROUND((val7::float / val8)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=7 THEN val ELSE 0 END) AS val7,
      SUM(CASE WHEN item=8 THEN val ELSE 0 END) AS val8
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (7, 8)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Liberación de Restricciones' AS col, theDate, ROUND((val9::float / val10)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=9 THEN val ELSE 0 END) AS val9,
      SUM(CASE WHEN item=10 THEN val ELSE 0 END) AS val10
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (9, 10)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Calidad' AS col, theDate, ROUND((val11::float / val12 * 1000000)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=11 THEN val ELSE 0 END) AS val11,
      SUM(CASE WHEN item=12 THEN val ELSE 0 END) AS val12
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (11, 12)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Productividad FP' AS col, theDate, ROUND((val12::float / val13)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=12 THEN val ELSE 0 END) AS val12,
      SUM(CASE WHEN item=13 THEN val ELSE 0 END) AS val13
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (12, 13)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Productividad FC' AS col, theDate, ROUND((val14::float / val15)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=14 THEN val ELSE 0 END) AS val14,
      SUM(CASE WHEN item=15 THEN val ELSE 0 END) AS val15
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (14, 15)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

  UNION ALL

    SELECT 'Productividad FF' AS col, theDate,
      ROUND(((val12::float / val13) * (val14::float / val15))::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=12 THEN val ELSE 0 END) AS val12,
      SUM(CASE WHEN item=13 THEN val ELSE 0 END) AS val13,
      SUM(CASE WHEN item=14 THEN val ELSE 0 END) AS val14,
      SUM(CASE WHEN item=15 THEN val ELSE 0 END) AS val15
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (12, 13, 14, 15)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

  UNION ALL

    SELECT 'Cambio en Monto Contratado' AS col, theDate, ROUND((val18::float / val16)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=18 THEN val ELSE 0 END) AS val18,
      SUM(CASE WHEN item=16 THEN val ELSE 0 END) AS val16
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (18, 16)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

    UNION ALL

    SELECT 'Desempeño Subcontrato' AS col, theDate, ROUND((val21::float / val22)::numeric, 2) AS percent
    FROM (
      SELECT
      updated_at::date AS theDate,
      SUM(CASE WHEN item=21 THEN val ELSE 0 END) AS val21,
      SUM(CASE WHEN item=22 THEN val ELSE 0 END) AS val22
      FROM(
        SELECT v.item AS item, CAST(coalesce(v.value, '0') AS NUMERIC) AS val, r.updated_at AS updated_at
        FROM values v
        INNER JOIN fields f ON f.id = v.id_field
        INNER JOIN reports r ON r.id = f.id_report
        INNER JOIN projects p ON p.id = r.id_project
        WHERE item IN (21, 22)
          AND r.id_template = 1 AND (r.updated_at::date BETWEEN startDate AND endDate)
          AND CAST(coalesce(v.value, '0') AS NUMERIC) > 0 AND p.name = projectName
      ) AS QUERY1
      GROUP BY theDate
    ) AS QUERY2

  ORDER BY col, theDate
$BODY$
LANGUAGE SQL;