CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    Name VARCHAR(50),
    NID VARCHAR (20),
    Subject VARCHAR(20);
    Description VARCHAR(255)
);