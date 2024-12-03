import  Jwt  from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

const userSchema = new mongoose.Schema({
    fullName :{
        firstName : {
            type : String,
            // required : true,
            minlength : [3,"First Name must be at least 3 characters long"]
        },
        lastName : {
            type : String,
            minlength : [3,"First Name must be at least 3 characters long"]
        }
    },
    email : {
        type : String,
        required : true,
        unique : [true,"Email already exists"]
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    socketId : {
        type : String
    }
})

userSchema.methods.generateAuthToken = function(){
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
    }
    const token = Jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY,{expiresIn : '24h'});
    return token;
}
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

userSchema.statics.hashPassword = async function(password){
    const hash = await bcrypt.hash(password,10);
    return hash
}


const User = mongoose.model("User", userSchema);

export default User;