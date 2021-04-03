CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE ongotasks;

CREATE TABLE users(
  app_user_id uuid DEFAULT uuid_generate_v1 () PRIMARY KEY,
  super_user BOOLEAN
);

CREATE TABLE tasks(
  task_id SERIAL PRIMARY KEY,
  task_description VARCHAR(255) NOT NULL,
  complete BOOLEAN NOT NULL
);

CREATE TABLE tasklist(
  tasklist_id SERIAL PRIMARY KEY,
  task_id INT NOT NULL REFERENCES tasks(task_id),
  app_user_id uuid NOT NULL REFERENCES users(app_user_id)
);

