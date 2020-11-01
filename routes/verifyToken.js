const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("authorization");
    if(token){
    jwt.verify(token, process.env.TOKEN_SECRET,(err,decoded)=>{
      if(err){
        res.json({
          success:false,
          message:"Failed to authenticate"
        })
      }else {
        req.decoded = decoded;
        next()
      }
    })
  } else{
    res.json({
      success:false,
      message:"No token provided"
    })
  }
};
 