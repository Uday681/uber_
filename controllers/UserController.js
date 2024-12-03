

import { validationResult } from "express-validator";
import { createUser } from "../services/UserService.js";
import userModel from "../models/userModel.js";
// import userModel from "../models/userModel.js"; // Ensure the correct file name and extension
// const registerUser = async (req, res ,next) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         // console.log(req.body)
//         const {firstName , lastName , email , password} = req.body;
//         // const hashPassword = userModel.hashPassword(password)

//         const user = await createUser({
//             fullName: { // Added fullName object
//                 firstName,
//                 lastName
//             },
//             email,
//             password //:  hashPassword
//         })
//         console.log(user)
//         const token = user.generateAuthToken()
//         res.status(201).json({ user, token });
//     } catch (error) {
//         console.error("Registration error:", error);
//         next(error);
//     }
// }

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
        // console.log(user); // Fixed typo from 'conosle' to 'console'

        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        console.error("Registration error:", error);
        next(error);
    }
}

export  { registerUser };


