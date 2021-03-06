CREATE TABLE fields (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  id_report UUID NOT NULL,
  
  FOREIGN KEY (id_report) REFERENCES reports (id) 
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
