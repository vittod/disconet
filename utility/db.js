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
