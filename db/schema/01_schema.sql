DROP TABLE IF EXISTS favourites CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL,
  availability BOOLEAN NOT NULL DEFAULT TRUE,
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  category VARCHAR(255) NOT NULL
);

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
