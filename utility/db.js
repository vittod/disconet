const spicedPg = require('spiced-pg');
const hb = require('./hashPass');
const { saniStrToNum, sanitizer, checkUrl } = require('./userInputFormatter');

const dbUrl = process.env.DATABASE_URL || `postgres://${require('../.secrets.json').dbAccess}@localhost:5432/socialnettwerk`;
const db = spicedPg(dbUrl)

///////////////////////////////////////////// USER AND LOGIN
////////////////////////////////////////////////////////////

exports.getUserById = (userId) => {
    let q, params;
    q = 'SELECT * FROM users WHERE id_user = $1';
    params = [userId];
    return db.query(q, params)
}

exports.getUserByEmail = (email) => {
    let q = 'SELECT * FROM users WHERE email = $1';
    let params = [email];
    return db.query(q, params)
}

exports.postUser = (nameFirst, nameLast, email, rawPass) => {
    return hb.hashPass(rawPass)
        .then(hash => {
            console.log(hash);
            let q = `   INSERT INTO users (first_name, last_name, email, password)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id_user`;
            let params = [sanitizer(nameFirst), sanitizer(nameLast), email, hash];
            return db.query(q, params)
        })
        .catch(err => err)
}

exports.checkUser = (rawPass, hash) => {
    return hb.checkPass(rawPass, hash)
}

/////////////////////////////////////////// HANDLE IMG STUFF
////////////////////////////////////////////////////////////

exports.getImgByUserAll = (id) => {
    q = `SELECT * FROM images WHERE id_user_fk = $1`;
    params = [id];
    return db.query(q, params)
}

exports.getAvatar = (id) => {
    let q = `
        SELECT images.id_user_fk, profiles.id_user_fk, avatar, url 
        FROM profiles 
        LEFT JOIN images 
        ON profiles.avatar = images.id_img
        WHERE profiles.id_user_fk = $1;
    `;
    params = [id];
    return db.query(q, params)
}

exports.setAvatar = (userId, imgId) => {
    let q = `
        INSERT INTO profiles (id_user_fk, avatar) 
        VALUES ($1, $2)
        ON CONFLICT (id_user_fk)
        DO UPDATE SET avatar = $2;
    `;
    let params = [userId, imgId]
    return db.query(q, params)
}

exports.postNewImg = (url, userId) => {
    let params = [url, userId];
    let q = `
        INSERT INTO images (url, id_user_fk)
        VALUES ($1, $2) RETURNING id_img;`;
    return db.query(q, params)
}

//////////////////////////////////////////// PROFILE QUERIES
////////////////////////////////////////////////////////////

exports.getProfileById = (id) => {
    let q = `
        SELECT id_prof, id_user, city, age, avatar, bio, first_name AS first, last_name AS last, email
        FROM profiles                                                                                                                                                                                                             
        RIGHT JOIN users                                                                                                                                                                                                           
        ON id_user = id_user_fk 
        WHERE id_user = $1;
    `;
    params = [id];
    return db.query(q, params)
}

exports.getOtherProfile = (id) => {
    let q = `
        SELECT  id_user, city, age, bio, first_name AS first, last_name AS last, url
        FROM users
        LEFT JOIN profiles 
        ON id_user = profiles.id_user_fk
        LEFT JOIN images
        ON avatar = images.id_img
        WHERE id_user = $1;
    `;
    params = [id];
    return db.query(q, params)
}

exports.setProfile = (userId, bio, age, city) => {
    let q = `
        INSERT INTO profiles (id_user_fk, bio, age, city) 
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id_user_fk)
        DO UPDATE SET bio = $2, age = $3, city = $4;
    `;
    let params = [userId, bio, age, city]
    return db.query(q, params)
}

//////////////////////////////////////////////////// FRIENDS
////////////////////////////////////////////////////////////

exports.getAllFriends = (id, status) => {
    let q = `
        SELECT id_to, id_from, status, id_user, first_name, last_name, url
        FROM friends
        LEFT JOIN users 
        ON (id_user = id_to OR id_user = id_from) AND NOT id_user = $1
        LEFT JOIN profiles
        ON profiles.id_user_fk = id_user
        LEFT JOIN images
        ON avatar = id_img
        WHERE (id_from = $1 OR id_to = $1)
        AND status = $2;
    `;
    params = [id, status];
    return db.query(q, params)
}


exports.getFriendship = (idFrom, idTo) => {
    let q = `
        SELECT *
        FROM friends
        WHERE (id_from = $1 AND id_to = $2)
        OR (id_to = $1 AND id_from = $2);
    `;
    params = [idFrom, idTo];
    return db.query(q, params)
}

exports.makeFriendReq = (idFrom, idTo) => {
    let q = `
        INSERT INTO friends (id_from, id_to, status)
        VALUES ($1, $2, 'pending');
    `;
    params = [idFrom, idTo];
    return db.query(q, params)
}

exports.answerFriendReq = (idFrom, idTo) => {
    let q = `
        UPDATE friends 
        SET status = 'friends'
        WHERE (id_from = $1 AND id_to = $2)
        OR (id_to = $1 AND id_from = $2);
    `;
    params = [idFrom, idTo];
    return db.query(q, params)
}

exports.cancelFriendship = (idFrom, idTo) => {
    let q = `
        DELETE FROM friends 
        WHERE (id_from = 1 AND id_to = 2)
        OR (id_to = 1 AND id_from = 2);
    `;
    let params = [idFrom, idTo];
    return db.query(q, params)
}

//////////////////////////////////////////// GENERAL QUERIES
////////////////////////////////////////////////////////////

exports.getByColumn = (table, col, val) => {
    let q = `SELECT * FROM ${table} WHERE ${col} = $1;`;
    params = [val];
    return db.query(q, params)
}

exports.deleteRow = (table, column, condition) => {
    let params = [];
    let q = `DELETE FROM ${table} WHERE ${column} = ${condition};`;
    return db.query(q, params)
}
