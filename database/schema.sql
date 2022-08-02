CREATE DATABASE petverso;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS contacts (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  phone VARCHAR,
  address VARCHAR,
  cep VARCHAR,
  city VARCHAR,
  estado VARCHAR,
  gender VARCHAR,
  date_of_birth DATE
);
