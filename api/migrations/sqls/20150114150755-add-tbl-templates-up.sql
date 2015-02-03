CREATE TABLE templates (
  id INT PRIMARY KEY NOT NULL,
  id_parent INT NOT NULL DEFAULT 0,
  is_parent BOOLEAN NOT NULL DEFAULT FALSE,
  title TEXT NOT NULL,
  data JSON NOT NULL,
  fields JSON,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
);
