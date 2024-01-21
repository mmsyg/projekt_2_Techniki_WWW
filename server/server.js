require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contacts')
const userRoutes = require('./routes/user')

// Express app
const app = express();


// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// Routes
app.use('/api/contacts', contactRoutes)
app.use('/api/user', userRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    // Listening for request
app.listen(process.env.PORT, () => {
    console.log('connected to db && listening on port',process.env.PORT)
    
    })
})
.catch((error)=>{
    console.log(error)
})



process.env