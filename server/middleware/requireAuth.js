const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// Middleware function to require authentication for a route
const requireAuth = async (req, res, next) => {
    // Extracting the authorization header from the request
    const {authorization} = req.headers

    // Checking if the authorization header is present
    if(!authorization) {
        // If the authorization token is missing, return a 401 Unauthorized response
        return res.status(401).json({error: 'authorization token is required'})
    }

    //Extracting the token from the authorization header
    const token = authorization.split(' ')[1]

    try {
        //Verifying the token using the secret key
        const {_id} = jwt.verify(token, process.env.SECRET)
        // Finding the user associated with the token and selecting only the _id field
        req.user = await User.findOne({_id}).select('_id')
        // If token is valid and user is found, proceed to the next middleware or route handler
        next()
    } catch (error) {
        //If there's an error in token verification, log the error and return a 401 Unauthorized response
        console.log(error)
        res.status(401).json({error: 'request is not authorized'})
    }
}
module.exports = requireAuth
