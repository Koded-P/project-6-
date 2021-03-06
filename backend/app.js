//MONGODB PW: S1gvYrcup8TUxU8F
//MONGODB CONNECTION: mongodb+srv://piiquante:<password>@cluster0.5pmhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require('express');

//Connect MONGOOSE
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const sauceCtrl = require('./routes/sauce');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://piiquante:S1gvYrcup8TUxU8F@cluster0.5pmhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

//Cross-Origin Resource Sharing (Handling CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceCtrl);

module.exports = app;

