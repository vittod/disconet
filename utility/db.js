const spicedPg = require('spiced-pg');
const hb = require('./hashPass');
const { saniStrToNum, sanitizer, checkUrl } = require('./userInputFormatter');

const dbUrl = process.env.DATABASE_URL || `postgres://${require('../.secret.json').dbAccess}@localhost:5432/socialnettwerk`;
const db = spicedPg(dbUrl)

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


exports.deleteRow = (table, column, condition) => {
    let params = [];
    let q = `DELETE FROM ${table} WHERE ${column} = ${condition};`;
    return db.query(q, params)
}
