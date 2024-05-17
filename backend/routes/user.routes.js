import express from 'express'
import { signIn, signUp, getProfile, logout, updateUser, deletuser, GoogleAuth } from '../controllers/user.controller.js'
import { isAutheticated } from '../middlewares/Authentication.js'

const router = express.Router()

router.post('/signup', signUp)
router.post('/signin', signIn)

router.route("/:id")
    .put(isAutheticated, updateUser)
    .delete(isAutheticated, deletuser)


router.get('/profile', isAutheticated, getProfile)
router.get('/logout', logout)



router.post('/googleAuth', GoogleAuth)

export default router