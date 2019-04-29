
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS profiles;


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
VALUES (1, https://socialnettwerk.s3.amazonaws.com/MPuNhosCMxUP2Ip0NakReq_s3rf9LOPW.ico);

INSERT INTO profiles (id_user_fk, city, age, avatar, bio)
VALUES (1, 'Bonn', 55, 1, 'bla bla');

