const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')

//dotenv config

dotenv.config();

//mongoDB Connection
connectDB();

//rest object

const app = express()

//middlew6ares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/api/v1/test',require('./routes/testRoutes'));
app.use('/api/v1/auth',require('./routes/authRoutes'));

const PORT = process.env.PORT || 8080;

//listen method 

app.listen(PORT,()=>{
    console.log(`Node server is running in ${process.env.DEV_MODE} ModeOn port  ${process.env.PORT}`.bgBlue.white
);
});
