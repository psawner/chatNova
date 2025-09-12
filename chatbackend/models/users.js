const db = require('../db')

async function createUser(name,email,age,mobile,password,avatar){
    const sql = 'INSERT INTO users (name,email,age,mobile,password,avatar) VALUES (?,?,?,?,?,?)'
    const result = await db.promise().query(sql,[name,email,age,mobile,password,avatar])
    // return { id: result.insertId, name,email,age,mobile,password};
    return result
}
async function findById(id){
    const sql = 'SELECT *FROM users WHERE id=?'
    const [result] = await db.promise().query(sql,[id])
    return result[0]
}
async function ifExist(name,email){
    const sql = 'SELECT *FROM users WHERE name=? OR email=?'
    const [result] = await db.promise().query(sql,[name,email])
    return result.length>0
}
async function identify(identifier){
    const sql = 'SELECT *FROM users WHERE name=? OR email=? LIMIT 1'
    const [result] = await db.promise().query(sql,[identifier,identifier])
    return result.length>0 ? result[0] : null;
}

module.exports = {
    createUser,
    ifExist,
    findById,
    identify
}