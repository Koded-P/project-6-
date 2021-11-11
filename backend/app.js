//MONGODB PW: S1gvYrcup8TUxU8F
//MONGODB CONNECTION: mongodb+srv://piiquante:<password>@cluster0.5pmhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require('express');

//Connect MONGOOSE
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://piiquante:S1gvYrcup8TUxU8F@cluster0.5pmhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas! hurray');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use((req, res, next) => {
    res.json({ message: 'Your request was successful'});
    next();
});

app.use('/api/auth', userRoutes);

module.exports = app;

