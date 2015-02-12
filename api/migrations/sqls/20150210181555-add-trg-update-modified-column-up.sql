CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_project_modtime  BEFORE UPDATE ON projects  FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_report_modtime   BEFORE UPDATE ON reports   FOR EACH ROW EXECUTE PROCEDURE update_modified_column();