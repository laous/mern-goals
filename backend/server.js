console.log("Hello")

const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
// for accessing environement varibales
const dotenv = require('dotenv').config()

// port number
const port = process.env.PORT || 5000

// coloring the console's output
const colors = require('colors')

// get db connection 
const connectDB = require('./config/db')
connectDB()

//start app
const app = express()
app.listen(
    port , 
    () => console.log("Server started on " + port )
)

// middlewares
/* default middlewares for parsing body */
app.use(express.json())
app.use(express.urlencoded({extended:false}))
/* custom error handler */
app.use(errorHandler)

// routes
app.use('/api/goals' ,require('./routes/goalRoutes'))
app.use('/api/users' ,require('./routes/userRoutes'))