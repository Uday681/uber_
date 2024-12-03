// import  userModel  from "../";
import UserModel from "../models/userModel.js"

// Create a new user

export const createUser = async (userData) => {
    const newUser = new UserModel(userData);
    try {
        const savedUser = await newUser.save();
        console.log(`userData : ${savedUser}`);
        return savedUser;
    } catch (error) {
        throw error;
    }
};

