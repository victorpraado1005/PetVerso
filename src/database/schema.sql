CREATE DATABASE petverso;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	name varchar NOT NULL,
	email varchar NULL,
	phone varchar NULL,
	address varchar NULL,
	cep varchar NULL,
	city varchar NULL,
	estado varchar NULL,
	gender varchar NULL,
	date_of_birth date NULL,
	password varchar(100) NULL,
	assinante varchar(210) NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_id_key UNIQUE (id)
);

CREATE TABLE public.animal (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	name varchar NOT NULL,
	breed varchar NOT NULL,
	date_of_birth date NULL,
	gender varchar NULL,
	users_id uuid NULL,
	species text NULL,
	nickname text NULL,
	lenght_animal text NULL,
	weight_animal text NULL,
	CONSTRAINT animal_id_key UNIQUE (id),
	CONSTRAINT animal_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id)
);

CREATE TABLE public.consultas (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	data_consulta date NOT NULL,
	hora_consulta time NOT NULL,
	clinica varchar NOT NULL,
	animal_id uuid NULL,
	users_id uuid NULL,
	CONSTRAINT consultas_id_key UNIQUE (id),
	CONSTRAINT consultas_animal_id_fkey FOREIGN KEY (animal_id) REFERENCES public.animal(id),
	CONSTRAINT consultas_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id)
);

CREATE TABLE public.vaccines (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	name varchar NOT NULL,
	application_date date NOT NULL,
	next_application date NULL,
	animal_id uuid NULL,
	CONSTRAINT vaccines_id_key UNIQUE (id),
	CONSTRAINT vaccines_animal_id_fkey FOREIGN KEY (animal_id) REFERENCES public.animal(id)
);

CREATE TABLE public.medication (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	medicine_name varchar NOT NULL,
	start_date date NOT NULL,
	end_date date NULL,
	repetition varchar NULL,
	animal_id uuid NULL,
	CONSTRAINT medication_id_key UNIQUE (id),
	CONSTRAINT medication_animal_id_fkey FOREIGN KEY (animal_id) REFERENCES public.animal(id)
);

CREATE TABLE public.pedidos (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	data_pedido date NOT NULL,
	loja varchar NULL,
	valor_total varchar NULL,
	status varchar NULL,
	user_id uuid NULL,
	CONSTRAINT pedidos_id_key UNIQUE (id),
	CONSTRAINT pedidos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.banhos (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	data_banho date NOT NULL,
	hora_banho time NOT NULL,
	petshop varchar NULL,
	animal_id uuid NULL,
	users_id uuid NULL,
	CONSTRAINT banhos_id_key UNIQUE (id),
	CONSTRAINT banhos_animal_id_fkey FOREIGN KEY (animal_id) REFERENCES public.animal(id),
	CONSTRAINT banhos_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id)
);
