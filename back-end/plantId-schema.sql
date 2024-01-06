CREATE TABLE plants (
  id SERIAL,
  common_name TEXT NOT NULL,
  scientific_name TEXT PRIMARY KEY NOT NULL,
  image_url TEXT,
  vegetable BOOLEAN,
  edible_part TEXT,
  edible BOOLEAN,
  flower_color TEXT,
  foliage_texture TEXT,
  foliage_color TEXT,
  fruit_or_seed_color TEXT,
  fruit_or_seed_shape TEXT,
  growth_form TEXT,
  growth_habit TEXT,
  toxicity TEXT
);

CREATE TABLE lists (
  id SERIAL,
  name TEXT PRIMARY KEY NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE users (
  id SERIAL,
  username VARCHAR(25) PRIMARY KEY NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE userList (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25)
    REFERENCES users(username) ON DELETE CASCADE,
  list_name TEXT
    REFERENCES lists(name) ON DELETE CASCADE
);

CREATE TABLE listPlant (
  id SERIAL PRIMARY KEY,
  list_name TEXT
    REFERENCES lists(name) ON DELETE CASCADE,
  plant_scientific_name TEXT
    REFERENCES plants(scientific_name) ON DELETE CASCADE
);

