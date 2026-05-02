const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');

const authController = {
    register: async(req,res) => {
        try {
            //get details from the req body
            const {name,email,password} = req.body;

            //check if user is exists already
            const existingUser = await User.findOne({email});

            if(existingUser) {
                return res.status(400).json({message: 'User is Already Exists'})
            }

            //encrypt the password
            const hashedPassword = await bcrypt.hash(password, 10)

            //create a new user
            const newUser = new User ({name, email, password : hashedPassword});

            //save user to the database
            await newUser.save()

            res.status(201).json({message: 'User Registered Successfully'})
        } catch (error) {
            res.status(500).json({message:'Error registering user', error: error.message})
        }
    },
    login: async(req,res) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if(!user) {
                res.status(400).json({message: "User Doesn't Exists"})
            }
             //compare password
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                res.status(400).json({message: 'Invalid Credentials'})
            }
            //generate token
            const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '1d'})

            //set a token as a cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: NODE_ENV === "production" ? 'none' : 'lax',
                maxAge: 24 * 60 * 60 * 1000  //24hours
            })

            res.status(201).json({message: 'Login Successfully', user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }});
        } catch (error) {
             res.status(500).json({message:'Error Login user', error: error.message})
        }
    },
    getMe: async(req,res) => {
        try {
            const userId = req.userId

            //find the userID
            const user = await User.findById(userId).select('-password')

            //if the user does not exists, return an error
            if(!user) {
                return res.staus(404).json({message: "User Not Found"})
            }

            //return the user Details
            res.status(200).json({user})
        } catch (error) {
            res.status(500).json({message:'Error Fetching User Details', error: error.message})
        }
    },
    logout: async(req,res) => {
        try {
            res.clearCookie('token', {
                secure: NODE_ENV === 'production',
                sameSite: NODE_ENV === 'production' ? 'none' : 'lax'
            })

            return res.status(200).json({message: 'Logout Successfully'})
        } catch (error) {
            res.status(500).json({message: 'Error Logging Out',error:error.message})
        }
    }
}

module.exports = authController