const jwt = require('jsonwebtoken');

const authorization = (req,res,next)=>{
    try{
        const cookie = req.cookies.token;
        
        if(!cookie){
            return res.status(401).json({message:"Unauthorized"});
        }

        const data = jwt.verify(cookie,process.env.JWT_SECRET);

        req.user = {id:data.id};

        next();
    }
    catch(err){
        if(err.name==="JsonWebTokenError" || err.name ==="TokenExpiredError"){
            return res.status(401).json({message:"Invalid or Expired token"});
        }
        else{
            return res.status(500).json({message:"Internal server error"});
        }
    }
}

module.exports = {authorization};