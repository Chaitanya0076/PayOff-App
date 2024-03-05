const env = require('dotenv')
env.config()
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({msg:"Invalid token or the token doesnot start with Bearer "});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.secret);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({msg:"Invalid token"})
        }
    } catch (err) {
        return res.status(403).json({msg:"Invalid token"});
    }
};

module.exports = {
    authMiddleware
}