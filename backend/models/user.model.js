import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String,
        default: "https://cdn.vectorstock.com/i/500p/21/23/avatar-photo-default-user-icon-person-image-vector-47852123.jpg"
    },

}, { timestamps: true })


export const User = mongoose.model("User", userSchema)