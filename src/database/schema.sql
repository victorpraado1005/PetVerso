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

CREATE TABLE IF NOT EXISTS consultas (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  data_consulta DATE NOT NULL,
  clinica VARCHAR NOT NULL,
  animal_id UUID,
  users_id UUID,
  FOREIGN KEY(animal_id) REFERENCES animal(id),
  FOREIGN KEY(users_id) REFERENCES users(id)
);

INSERT INTO consultas(data_consulta, clinica, animal_id, users_id)
VALUES('2022-08-08 15h', 'PetMais', 'bc808d4e-7e29-4859-8acf-9187ed13e36b', 'ab826ccc-4e8c-4c26-be88-b00290343a85');
