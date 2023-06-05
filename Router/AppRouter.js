const Router=require('express').Router()
const verifyJwt = require('../middleware/VerifyJwtToken');
const User=require('../model/User')
Router.post("/add/user",async(req,res)=>{
    const { name, email, password } = req.body;
    const user = new User(name, email, password);
    const done=await user.save()
    if(done)
        res.json({message:"all good"})
    else
        res.json({message:"all fields are mandatory"})
})
Router.post('/login/user',async(req,res)=>{
    await User.login(req,res)
})
Router.get('/user',verifyJwt,async (req,res)=>{
    const {userId}=req
    try{
       const user= await User.find(userId)
       if(user){
           return res.json({message:'all good',user})
       }
       return res.json({message:'no one with this creadentials'})
    }catch(err){
        console.log(err);
    }
})

module.exports=Router


