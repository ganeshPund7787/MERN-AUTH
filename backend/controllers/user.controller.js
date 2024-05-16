import { User } from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.handler.js"
import jwt from "jsonwebtoken"

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const isUserExist = await User.findOne({ email })

        if (isUserExist) return next(errorHandler(400, "Email already exist"))

        const hashedPassword = bcryptjs.hashSync(password, 10)

        const newUser = new User({ username, email, password: hashedPassword })
        await newUser.save()

        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        next(error)
    }
}

export const signIn = async (req, res, next) => {

    try {
        const { email } = req.body;
        console.log();
        const validUser = await User.findOne({ email });

        if (!validUser) return next(errorHandler(400, "User is not exist"));

        const validPassword = bcryptjs.compareSync(req.body.password, validUser.password);

        if (!validPassword) return next(errorHandler(400, "Invalid pasword"));

        const { password, ...rest } = validUser._doc

        const token = jwt.sign({ _id: validUser._id }, process.env.SECREATE_KEY);



        res.status(200).cookie("cookie", token, {
            httpOnly: true,
            maxAge: 12 * 24 * 60 * 60 * 1000
        }).json(rest)
    } catch (error) {
        next(error)
    }
}
export const getProfile = (req, res) => {
    const { user } = req;

    const { password, ...rest } = user._doc;
    res.status(200).json(rest)
}

export const logout = async (req, res, next) => {
    const { cookie } = req.cookies;
    res.status(200).clearCookie("cookie").json({
        message: "user logout Succeesfuly"
    })
}

export const updateUser = async (req, res, next) => {
    if (req.params.id !== req.user.id) {
        return next(errorHandler(400, "You can update only your profile"));
    }

    try {
        if (req.body.email) {
            const isUserExist = await User.findOne({ email: req.body.email });
            if (isUserExist) return next(errorHandler(400, "email already taken"));
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        }, { new: true })

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json({
            message: "User update successfuly",
            rest
        })
    } catch (error) {
        next(error)
    }
}

export const deletuser = async (req, res, next) => {
    if (req.params.id !== req.user.id) {
        return next(errorHandler(400, "You can delete only your account"));
    }
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id)

        res.status(200).clearCookie("cookie").json({
            message: "user delete successfuly"
        })
    } catch (error) {
        next(error)
    }
}