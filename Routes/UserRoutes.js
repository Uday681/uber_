import express from "express";
import pkg from "express-validator";
import {getUserProfile, login, logoutUser, registerUser} from "../controllers/userController.js";
import { authUser } from "../middlewares/AuthMiddlewares.js";

const { body, validationResult, withMessage } = pkg;  

const  router = express.Router();

router.post('/register',[
    body('fullName.firstName').isLength({min:3}).withMessage('first name must be at least 3 char'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 6 char')   
],registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('min 5 char')  
],login)

router.get("/profile", authUser, getUserProfile);

router.get("/logout", authUser, logoutUser)

export default router;