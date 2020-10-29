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


// @desc      Update User Profile
// @router    PUT api/users/profile
// @access    Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})


// @desc      Get All Users
// @router    GET api/users
// @access    Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})


// @desc      Delete User
// @router    DELETE /api/users/:id
// @access    Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        await user.remove()
        res.json({ message: 'User Removed'})
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser }