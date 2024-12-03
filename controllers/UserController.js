import { validationResult } from "express-validator";
import { createUser } from "../services/UserService.js";
import userModel from "../models/UserModel.js";
import BlackListToken from "../models/BlackListTokenModel.js";

const registerUser = async (req, res ,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body)
        const { fullName , email, password } = req.body;
        const hashPassword = await userModel.hashPassword(password);
        console.log(`fullName : ${fullName.firstName}`)
        const user = await createUser({
            fullName:{
                firstName  : fullName.firstName,
                lastName  : fullName.lastName,
            },
            email,
            password : hashPassword
        });

        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(501).json({
            success: false,
            message : err.message,
        })
        next(error);
    }
}

const login = async (req,res,next) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Email or Password',
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        const token = user.generateAuthToken();
        res.cookie('token',token) 
        //,{
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 1000 * 60 * 60 * 24

        // })
        
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
                // Add other non-sensitive fields you want to return
            }
        });
    }
    catch(err){
        res.status(501).json({
            success: false,
            message : err.message,
        })
    }
}

const getUserProfile = async (req,res,next) => {
    res.status(201).send(req.user);
}

const logoutUser = async(req,res,next) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1] 

    await BlackListToken.create({token});
    res.status(201).json({message:"Logout Successfully"})
}

export  { registerUser , login , getUserProfile , logoutUser};


