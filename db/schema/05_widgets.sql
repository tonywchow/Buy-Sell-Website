-- Drop and recreate Widgets table (Example)

-- DROP TABLE IF EXISTS widgets CASCADE;
-- CREATE TABLE widgets (
--   id SERIAL PRIMARY KEY NOT NULL,
--   user_id INTEGER REFERENCES users(id),
--   name VARCHAR(255) NOT NULL
-- );

DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  admin_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  category VARCHAR(255) NOT NULL
  title VARCHAR(255) NOT NULL
  description TEXT
  thumbnail_photo_url VARCHAR(255) NOT NULL
  cover_photo_url VARCHAR(255) NOT NULL
  price VARCHAR(255) NOT NULL
  availability BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
