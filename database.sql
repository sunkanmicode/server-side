CREATE DATABASE fullstack;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(200) NOT NULL,
    user_email VARCHAR(200) NOT NULL,
    user_password VARCHAR(200) NOT NULL
);

INSERT INTO users(user_name, user_email, user_password)
 VALUES('sunday', 'bimbo@gmail.com','123456');