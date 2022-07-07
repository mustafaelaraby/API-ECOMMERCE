const jwt = require('jsonwebtoken');

const verifyToken = (req , res , next) => {

    const authHeaders = req.headers.token;
    if(authHeaders){
        const token = authHeaders.split(" ")[1];
        jwt.verify(token , process.env.JWT_SEC , (err , user) => {
            if(err){res.status(403).json('Token is not valid!')}
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json('You are not authenticated!')
    }
};

const verifyAuthorization = (req , res , next) => {
    verifyToken(req , res , ()=> {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json('You are not allowed..');
        }
    })
}

const verifyAdmin = (req , res , next) => {
    verifyToken(req , res , ()=> {
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json('You are not allowed..');
        }
    })}

module.exports = {verifyToken , verifyAuthorization , verifyAdmin}