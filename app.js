const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRoutes');
const documentRouter = require('./routes/documentRoutes');

//create an express app
const app = express();

//middlewate to parse the body of incoming request as JSON 
app.use(express.json());


//cors
app.use(cors());

//middleware to parse cookies
app.use(cookieParser());

//Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/documents', documentRouter)

module.exports= app;
