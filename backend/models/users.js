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

//chat_messages
async function createMessage(user_id,session_id, role,message){
    const sql = 'INSERT INTO chat_messages (user_id, session_id, role, message) VALUES (?,?,?,?)'
    const [result] = await db.promise().query(sql,[user_id,session_id,role,message])
    return result;
}

//getting messages from a user
async function getMessage(user_id,session_id){
    const sql = 'SELECT id,user_id,session_id,role,message,created_at FROM chat_messages WHERE user_id=? AND session_id=? ORDER BY created_at ASC'
    const [result] = await db.promise().query(sql,[user_id,session_id])
    return result;
}

async function getAllSession(user_id){
    const sql = `SELECT cm.session_id,
    MIN(cm.created_at) AS started_at,
    SUBSTRING_INDEX(
        GROUP_CONCAT(CASE WHEN cm.role = 'user' THEN cm.message END 
                         ORDER BY cm.created_at ASC SEPARATOR '||'),
        '||', 1
    ) AS first_message
    FROM chat_messages cm
    WHERE cm.user_id = ?
    GROUP BY cm.session_id
    ORDER BY started_at DESC`

    const [result] = await db.promise().query(sql,[user_id])
    return result;
}

module.exports = {
    createUser,
    ifExist,
    findById,
    identify,
    createMessage,
    getMessage,
    getAllSession
}