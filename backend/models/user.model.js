//Hack: Package Imports
import mongoose from "mongoose";

//Hack: mogoose schema document structure
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastlogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

//Hack: mogoose Model for document collection
export const User = mongoose.model('user', userSchema)

// with times,tamp created and updateat fields will be automatically added into the document