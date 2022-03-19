console.log("Hello")

const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000

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