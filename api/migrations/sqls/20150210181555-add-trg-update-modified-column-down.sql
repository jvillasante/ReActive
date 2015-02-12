DROP TRIGGER IF EXISTS update_project_modtime  ON projects;
DROP TRIGGER IF EXISTS update_report_modtime   ON reports;
DROP FUNCTION IF EXISTS update_modified_column();