CREATE TABLE values (
  id_field UUID NOT NULL,
  item INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  value TEXT,
  
  PRIMARY KEY (id_field, item),
  FOREIGN KEY (id_field) REFERENCES fields (id) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
