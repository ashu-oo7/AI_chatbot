import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader){
        return res.status(401).json({ error: "Authorization header is missing" });
    }    

    const token = authHeader.split(" ")[1];

    jwt.verify(token,process.env.ACCESS_SECRET,(err,user)=>{
        if(err){
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
    })
}

export default verifyToken;