
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
   // Signing a token with the user's ID, secret key, and expiration time of 3 days
   return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

// Function to log in a user
const loginUser = async (req, res) => {
    const {email, password} = req.body // Extracting email and password from request body

    try {
        const user = await User.login(email, password) // Attempting to log in the user

        // Creating a token for the logged-in user
        const token = createToken(user._id)

        // Sending the user's email and token in the response
        res.status(200).json({email, token})
    } catch(error) {
        // Handling any errors during login
        res.status(400).json({error: error.message})
    }
}

// Function to sign up a new user
const signupUser = async (req, res) => {
    const {email, password} = req.body // Extracting email and password from request body

    try {
        const user = await User.signup(email, password) // Attempting to sign up the user

        // Creating a token for the new user
        const token = createToken(user._id)

        // Sending the user's email and token in the response
        res.status(200).json({email, token})
    } catch(error) {
        // Handling any errors during signup
        res.status(400).json({error: error.message})
    }
}


module.exports = {signupUser, loginUser}
