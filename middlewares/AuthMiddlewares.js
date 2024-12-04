import  Jwt  from "jsonwebtoken";
import userModel from "../models/UserModel.js";
import captainModel from "../models/CaptainModel.js";
import BlackListTokenModel from "../models/BlackListTokenModel.js";



export const authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] 
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    const isBlackListed = await BlackListTokenModel.findOne({token})
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

export const authCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }
    const isBlackListed = await BlackListTokenModel.findOne({token})
    if(isBlackListed){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        const decoded = Jwt.verify(token,process.env.JWT_SECRET_KEY);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain

        return next()
    }
    catch(err){
        return res.json({message:err.message})
    }
}