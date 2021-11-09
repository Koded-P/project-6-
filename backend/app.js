//MONGODB PW: S1gvYrcup8TUxU8F
//MONGODB CONNECTION: mongodb+srv://piiquante:<password>@cluster0.5pmhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require('express');

//Connect MONGOOSE
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://piiquante:S1gvYrcup8TUxU8F@cluster0.5pmhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res) => {
    res.json({ message: 'Your request was successful'});
});

app.use('/api/auth', userRoutes);

module.exports = app;

