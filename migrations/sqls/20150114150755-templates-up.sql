CREATE TABLE templates (  id INT PRIMARY KEY NOT NULL,  title VARCHAR(255) NOT NULL,  data JSONB NOT NULL,  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);