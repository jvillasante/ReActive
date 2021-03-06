CREATE TABLE reports (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  id_user UUID NOT NULL,
  id_project UUID NOT NULL,
  id_template INT NOT NULL,
  title TEXT NOT NULL,
  sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp, 
  
  FOREIGN KEY (id_user)     REFERENCES users (id)     ON DELETE SET NULL,
  FOREIGN KEY (id_project)  REFERENCES projects (id)  ON DELETE SET NULL,
  FOREIGN KEY (id_template) REFERENCES templates (id) ON DELETE SET NULL
);
