
DROP TABLE IF EXISTS stories;
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


CREATE TABLE stories (
    id_story SERIAL PRIMARY key,
    id_user_fk INTEGER NOT NULL,
    from_fk INTEGER NOT NULL REFERENCES users(id_user),
    story TEXT,
    story_pic_fk INTEGER REFERENCES images(id_img),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user_fk) REFERENCES users(id_user) ON DELETE CASCADE
);


INSERT INTO users (first_name, last_name, email, password) 
VALUES ('azerimuth', 'bandistan', 'azze@band.star', '$2a$10$fSD/BxUelaatobOAR5s6qOLHxq5RfKhl8buCd7gv83WgFceWH2zae');

INSERT INTO users (first_name, last_name, email, password) 
VALUES ('Koljah', 'Stottmeister', 'a@a', '$2a$10$dc49pxZQ2SRM3BCSRDY3Zejjf7fJxRrrG3itPmGYJikzJKnY56FXC');

INSERT INTO users (first_name, last_name, email, password) 
VALUES ('claudia', 'marquardt', 'b@b', '$2a$10$otkaKnmudAsiIySG6qmip.lqLiSrN2.8rdQFD4sTIRPklEPhoKKKK');

INSERT INTO users (first_name, last_name, email, password) 
VALUES ('disco', 'duck', 'c@c', '$2a$10$sZqyqnyy5aooJ5VvMPAoveIxEqh7eskIihkalWmE4aEvzLvtprliS');

INSERT INTO users (first_name, last_name, email, password) 
VALUES ('Disco', 'Tiger', 'd@d', '$2a$10$sZqyqnyy5aooJ5VvMPAoveIxEqh7eskIihkalWmE4aEvzLvtprliS');

INSERT INTO users (first_name, last_name, email, password) 
VALUES ('John', 'Travolta', 'e@e', '$2a$10$sZqyqnyy5aooJ5VvMPAoveIxEqh7eskIihkalWmE4aEvzLvtprliS');

INSERT INTO images (id_user_fk, url)
VALUES (1, 'https://socialnettwerk.s3.amazonaws.com/MPuNhosCMxUP2Ip0NakReq_s3rf9LOPW.ico');

INSERT INTO profiles (id_user_fk, city, age, avatar, bio)
VALUES (1, 'Bonn', 55, 1, 'bla bla');

INSERT INTO friends VALUES (1, 2, 'pending'); 

INSERT INTO friends VALUES (2, 1, 'pending'); 