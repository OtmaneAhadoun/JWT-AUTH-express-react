const jwt=require('jsonwebtoken')
const verifyJwt=async (req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1]
    if(!token){
        res.status(401).json({message:'unauthenticated'});
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decode.userId
        next()
    }catch(error){
        res.json({message:'invalid token'})
    }
}

module.exports=verifyJwt