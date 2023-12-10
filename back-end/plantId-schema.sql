CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  common_name TEXT NOT NULL,
  scientific_name TEXT NOT NULL,
  type TEXT,
  flowers BOOLEAN,
  color TEXT,
  fruits BOOLEAN,
  edible_fruit BOOLEAN,
  fruit_color TEXT,
  leaf BOOLEAN,
  leaf_color TEXT,
  edible_leaf BOOLEAN,
  poisonous_to_humans BOOLEAN,
  poisonous_to_pets BOOLEAN,
  thorny BOOLEAN,
  description TEXT,
  default_img TEXT NOT NULL
);

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  plant_id INTEGER
    REFERENCES plants ON DELETE CASCADE
);

CREATE TABLE users (
  id SERIAL,
  username VARCHAR(25) PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  list_id INTEGER
    REFERENCES lists ON DELETE CASCADE
);

CREATE TABLE userlist (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  list_id int
    REFERENCES lists ON DELETE CASCADE
);

