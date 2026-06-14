const jwt = require('jsonwebtoken');

const protect = (req, res , next) =>{
    const token = req.headers.authorization;

    if(!token) return res.json ({error : "No token"});

    try{
         const decode = jwt.verify(token ,process.env.JWT_SECRET);
         req.user = decode ;
         next();
         

    }catch(error){
       res.json ({ error: "Invalid token" });
        
    }
};

module.exports = protect;