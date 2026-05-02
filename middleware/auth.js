const User = require("../models/userModel");
const { JWT_SECRET } = require("../utils/config");
const jwt = require('jsonwebtoken')

const isAuthenticated = async (req,res,next) => {
    //check if the token is present in the cookie
    const token  = req.cookies && req.cookies.token;

    //if there no token, return an unauthorised error
    if(!token) {
        return res.status(401).json({message: 'Unauthorised'})
    }

    try {
        //if token is present verify it
        const decoded = await jwt.verify(token, JWT_SECRET)

        //if the token is valid, attach the user ID to the req Object
        req.userId = decoded.userId;

        //call the next middleware or routehandler
        next();

    } catch (error) {
        //if the token is invalid, return an unauthorised error
        res.status(401).json({message: 'Unauthorised', error: error.message})
    }
}

const allowRoles = (roles) => {
    return async(req,res,next) => {
        //get the userId from the request object
        const userId = req.userId ;

        //get the user's role from the database
        const user = await User.findById(userId).select('-password');

        //check if the user is exists
        if(!user) {
            return res.status(404).json({message: 'USer Not Found'})
        }

        //check if the user's role is in the allowed roles
        if(!roles.includes(user.role)) {
            return res.status(403).json({message: 'Forbidden'})
        }

        //add the user object to the request object
        req.user = user;

        //call the next middleware or route handler
        next();
    }
}

module.exports = {
    isAuthenticated,
    allowRoles
}