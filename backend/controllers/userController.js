import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// @desc      Auth User & get Token
// @router    POST /api/users/login
// @access    Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if( user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid User or Password')
    }
})


// @desc      Register a New User
// @router    POST /api/users
// @access    Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existUser = await User.findOne({ email })

    if(existUser) {
        res.status(400)
        throw new Error('User Already Exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


// @desc      Get User Profile
// @router    GET api/users/profile
// @access    Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})


export { authUser, getUserProfile, registerUser }