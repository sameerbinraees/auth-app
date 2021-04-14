require('dotenv').config();
const passport = require('passport');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware Imports
const { verifyToken } = require('./middlewares/verifyToken');

// Router Imports
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');

const DB_URI = process.env.mongoConnectionString;
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    return console.log('MongoDb Connection successful');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB...', err);
    process.exit();
  });

require('./utils/passport')(passport);

// Initialize express app
const app = express();
app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', verifyToken, userRouter);

module.exports = app;
