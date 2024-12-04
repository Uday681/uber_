import mongoose from 'mongoose';
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const captionSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            // required : true,
            minlength: [3, "First Name must be at least 3 characters long"]
        },
        lastName: {
            type: String,
            minlength: [3, "First Name must be at least 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, 'Color must be aleast 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, 'Model must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['motorcycle', 'car', 'auto'],
            default: "motorcycle",
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
});

captionSchema.methods.generateAuthToken = function () {
    const token = Jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
    return token;
}

captionSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

captionSchema.statics.hashPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    return hash
}


const Caption = mongoose.model('Caption', captionSchema);

export default Caption;
