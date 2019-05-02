
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    first_name VARCHAR(255) not null,
    last_name VARCHAR(255) not null,
    email VARCHAR(255) not null,
    password VARCHAR(255) not null,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE images(
    id_img SERIAL PRIMARY KEY,
    id_user_fk INTEGER Not NULL,
    url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user_fk) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE profiles (
    id_prof SERIAL PRIMARY KEY,
    id_user_fk INTEGER NOT NULL UNIQUE,
    city VARCHAR(300),
    age INTEGER,
    avatar INTEGER REFERENCES images(id_img),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user_fk) REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE friends (
    id_from INTEGER REFERENCES users(id_user) ON DELETE CASCADE,
    id_to INTEGER REFERENCES users(id_user) ON DELETE CASCADE,
    status VARCHAR(10),
    PRIMARY KEY (id_from, id_to)
);

CREATE UNIQUE INDEX ifriends ON friends(GREATEST(id_from, id_to), LEAST(id_from, id_to));


-- CREATE TABLE comments (
--     id SERIAL PRIMARY key,
--     id_img_fk INTEGER NOT NULL,
--     comment VARCHAR(600),
--     username VARCHAR(150),
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (id_img_fk) REFERENCES images(id) ON DELETE CASCADE
-- );


INSERT INTO users (first_name, last_name, email, password) 
VALUES ('azerimuth', 'bandistan', 'azze@band.star', '$2a$10$fSD/BxUelaatobOAR5s6qOLHxq5RfKhl8buCd7gv83WgFceWH2zae');

INSERT INTO images (id_user_fk, url)
VALUES (1, 'https://socialnettwerk.s3.amazonaws.com/MPuNhosCMxUP2Ip0NakReq_s3rf9LOPW.ico');

INSERT INTO profiles (id_user_fk, city, age, avatar, bio)
VALUES (1, 'Bonn', 55, 1, 'bla bla');

INSERT INTO friends VALUES (1, 2, 'pending'); 

INSERT INTO friends VALUES (2, 1, 'pending'); 