-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS defenseUsers;
DROP TABLE IF EXISTS secrets;

CREATE TABLE defenseUsers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL
);

CREATE TABLE secrets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  description VARCHAR,
  createdAt INT
);

INSERT INTO secrets (title, description, createdAt) VALUES
('top top top secret', 'Portland is weird', 01012015 ),
('shhhh', 'Being a nerd is cool', null),
('secret', null, null)