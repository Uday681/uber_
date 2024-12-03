import express from "express";
import pkg from "express-validator";
import {registerUser} from "../controllers/userController.js";
const { body, validationResult, withMessage } = pkg;  

const  router = express.Router();

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('min 5 char')   
],registerUser)

export default router;