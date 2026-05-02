const express = require('express')
const {register, login, getMe, logout} = require('../controller/authController');
const { isAuthenticated } = require('../middleware/auth');

const authRouter = express.Router()

//public Routes
authRouter.post('/register', register);
authRouter.post('/login', login);

//protected Routes
authRouter.get('/getMe',isAuthenticated, getMe)
authRouter.post('/logout', isAuthenticated,logout)

module.exports = authRouter

