
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    first_name VARCHAR(255) not null,
    last_name VARCHAR(255) not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (first_name, last_name, email, password) VALUES
    ('azerimuth', 'bandistan', 'azze@band.star', 'xxxxxx');

