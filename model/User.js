const Connection = require("./Connection");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
class User{
    static id=1
    constructor(name,email,password){
        this.id=User.id++;
        this.name=name;
        this.email=email;
        this.password=password;
    }
    async save(){
        try{
            const finalPassword=await this.hashPassword(this.password)
            const [{affectedRows}]=await Connection.query('insert into users values(null,?,?,?)',[this.name,this.email,finalPassword])
            if(affectedRows>=1)
                return true
            return false
        }catch(err){
            return err
        }
        
    }
    async hashPassword(password){
        try{
            const salt =await bcrypt.genSaltSync()
            const hashPassword=bcrypt.hash(password,salt)
            return hashPassword
        }catch(err){
            console.log(err);
            return password
        }
    }
    static async login(req,res){
        try{
            const {email,password}=req.body
            const [results]=await Connection.query('select * from users where email=? ',[email])
            if(results.length==0)
                return res.status(401).json({message:"credantials missmatch"})
            const user=results[0]
            const hashPassword=user.password
            const passwordMiss=await bcrypt.compare(password,hashPassword)
            if(!passwordMiss)
                return res.status(421).json({message:"invalid credentials"})
            const userId=user.id

            const token=jwt.sign({userId},process.env.JWT_SECRET)
            res.status(200).json({message:"valid credentials",token})
        }catch(err){
            res.status(500).json({message:'inernal error server'})
        }
    }
    static async find(id){
        try{
            const [results]=await Connection.query('select * from users where id=?',[id])
            if(results.length>=1)
                return results[0]
            else{
                return false
            }
        }catch(err){
            console.log(err);
        }
    }
}
module.exports=User