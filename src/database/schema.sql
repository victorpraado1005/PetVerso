CREATE DATABASE petverso;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS animal (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  breed VARCHAR NOT NULL,
  date_of_birth DATE,
  gender VARCHAR
);

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  address VARCHAR,
  cep VARCHAR,
  city VARCHAR,
  estado VARCHAR,
  gender VARCHAR,
  date_of_birth DATE,
  animal_id UUID,
  FOREIGN KEY(animal_id) REFERENCES animal(id)
);
