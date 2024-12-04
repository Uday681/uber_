
import captainModel from "../models/CaptainModel.js"
import { validationResult } from "express-validator";
import { createCaptain }  from "../services/CaptainService.js";
import BlackListToken from "../models/BlackListTokenModel.js"

// export const registerCaptain = async (req, res, next) => {

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const isCaptainAlreadyExist = await captainModel.findOne({ email: req.body.email });
//     if (isCaptainAlreadyExist) {
//         return res.status(400).json({ message: "Captain already exist" });
//     }
//     const { fullName, email, password, vehicle } = req.body;
//     const hashPassword = await captainModel.hashPassword(password);
//     const captain = createCaptain({
//         fullName: {
//             firstName: fullName,
//             lastName: fullName,
//         },
//         email,
//         password: hashPassword,
//         vehicle: {
//             color: vehicle.color,
//             plate: vehicle.plate,
//             capacity: vehicle.capacity,
//             vehicleType: vehicle.vehicleType
//         }
//     });

//     const token = captain.generateAuthToken();

//     res.status(201).json({ captain, token });
// }
export const registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const isCaptainAlreadyExist = await captainModel.findOne({ email: req.body.email });
        if (isCaptainAlreadyExist) {
            return res.status(400).json({ message: "Captain already exist" });
        }

        const { fullName, email, password, vehicle } = req.body;
        const hashPassword = await captainModel.hashPassword(password);
        
        // Add await here
        const captain = await createCaptain({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName,
            },
            email,
            password: hashPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });

        const token = captain.generateAuthToken();
        
        res.status(201).json({ captain, token });
    } catch (error) {
        next(error);
        // or
        // res.status(500).json({ message: error.message });
    }
}
export const loginCaptain = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await captainModel.findOne({ email }).select('+password');
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
        res.cookie('token', token)
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: user
        });
    }
    catch (err) {
        res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}

export const getCaptainProfile = async (req,res,next) => {
    res.status(201).send(req.captain);
}

export const logoutCaptain = async(req,res,next) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1] 

    await BlackListToken.create({token});
    res.status(201).json({message:"Logout Successfully"})
}
