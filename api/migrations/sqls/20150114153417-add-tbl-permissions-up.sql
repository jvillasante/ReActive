CREATE TABLE permissions (
  id_user UUID NOT NULL,
  id_project UUID NOT NULL,
  id_template INT NOT NULL,
  
  PRIMARY KEY (id_user, id_project, id_template),
  FOREIGN KEY (id_user)     REFERENCES users (id)     ON DELETE SET NULL,
  FOREIGN KEY (id_project)  REFERENCES projects (id)  ON DELETE SET NULL,
  FOREIGN KEY (id_template) REFERENCES templates (id) ON DELETE SET NULL
);
