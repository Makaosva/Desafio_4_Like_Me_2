-- crear database
CREATE DATABASE likeme;

-- ingresar a la database
\c likeme;

-- crear table
CREATE TABLE posts (
    id SERIAL NOT NULL PRIMARY KEY, 
    titulo VARCHAR(25) NOT NULL, 
    img VARCHAR(1000) NOT NULL, 
    descripcion VARCHAR(255) NOT NULL, 
    likes INT NULL
    );



