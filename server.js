const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./utils/config.js')
const app = require('./app.js')

mongoose.connect(MONGODB_URI)
.then(()=> {
    console.log('MongoDB connected')

    //server start
    app.listen((PORT), () => {
        console.log(`Server is connected to the ${PORT}`)
    })
})

.catch((error) => {
    console.log("Error to connect MongoDB")
})