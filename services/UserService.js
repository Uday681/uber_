// import  userModel  from "../";
import userModel from "../models/UserModel.js"

// Create a new user

export const createUser = async (userData) => {
    const newUser = new userModel(userData);
    try {
        const savedUser = await newUser.save();
        console.log(`userData : ${savedUser}`);
        return savedUser;
    } catch (error) {
        throw error;
    }
};

