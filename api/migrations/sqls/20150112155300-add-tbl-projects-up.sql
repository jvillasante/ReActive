CREATE TABLE projects (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
  id_user UUID NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  image VARCHAR(255) NOT NULL DEFAULT 'api/public/images/no-image.png',
  created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
  updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp,

  FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE SET NULL
);

