import express from "express"
import  { authCaptain  } from "../middlewares/AuthMiddlewares.js";
import { registerCaptain ,loginCaptain ,getCaptainProfile ,logoutCaptain} from "../controllers/CaptainController.js";
import pkg from "express-validator";

const { body, validationResult, withMessage } = pkg;  
const router = express.Router()

router.post('/register',[
    body('fullName.firstName').isLength({min:3}).withMessage('first name must be at least 3 char'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 6 char'),
    body('vehicle.color').isLength({min:2}).withMessage('color must be at least 3 char'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 char'),
    body('vehicle.capacity').isLength({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['motorcycle','car','auto']).withMessage('vehicleType must be in this list')
],registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 5 }).withMessage('min 5 char')
],loginCaptain)

router.get("/profile", authCaptain , getCaptainProfile);

router.get("/logout", authCaptain, logoutCaptain)

export default router;