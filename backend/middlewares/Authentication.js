import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.handler.js";
import jwt from "jsonwebtoken"

export const isAutheticated = async (req, res, next) => {
    try {
        const { cookie } = req.cookies;

        if (!cookie) return next(errorHandler(400, "You should login first"));

        jwt.verify(cookie, process.env.SECREATE_KEY, async (err, user) => {
            if (err) return next(errorHandler(401, "Token is not valid"))
            req.user = await User.findById(user._id)
            next()
        });
    } catch (error) {
        next(error)
    }
}