CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'user',
  photo VARCHAR(255) NOT NULL DEFAULT 'api/public/images/no-image.png',
  emp VARCHAR(255) NOT NULL
);

CREATE INDEX users_username ON users USING hash (username);
CREATE INDEX users_email    ON users USING hash (email);
CREATE INDEX users_role     ON users USING btree (role);
CREATE INDEX users_emp      ON users USING btree (emp);
