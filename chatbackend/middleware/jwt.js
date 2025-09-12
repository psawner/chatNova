const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_KEY


const jwtAuthMiddleware = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'unauthorized'});
    }

    try{
        const decoded = jwt.verify(token,jwt_key);
        req.user = decoded;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error: 'invalid token'});
    }
}

module.exports = jwtAuthMiddleware;