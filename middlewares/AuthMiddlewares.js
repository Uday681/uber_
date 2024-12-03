import  Jwt  from "jsonwebtoken";
import userModel from "../models/UserModel.js";



export const authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] 
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    const isBlackListed = await userModel.findOne({token})
    if(isBlackListed){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        const decoded = Jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded._id);

        req.user = user

        return next()
    }
    catch(err){
        return res.json({message:err.message})
    }

}