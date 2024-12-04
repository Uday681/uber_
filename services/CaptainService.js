import captainModel from '../models/CaptainModel.js';

const createCaptain = ({ fullName, email, password, vehicle }) => {
    if (!fullName || !email || !password || !vehicle) {
        res.status(401).json({ message: "All fields are required" })
    }

    const captain = captainModel.create({
        fullName,
        email,
        password,
        vehicle
    })

    return captain;
}

export {
    createCaptain
}
