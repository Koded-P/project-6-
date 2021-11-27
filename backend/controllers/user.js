const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => {
              return res.status(201).json({
                message: 'User added successfully!'
              });
            }
           ).catch(
              (error) => {
                return res.status(400).json({
                error: error
              });
            }
          );
        }
    );
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (!user) {
        return res.status(401).json({
          message: 'not authorised!!'
        });
      }
      bcrypt.compare(req.body.password, user.password).then(
        (valid) => {
          if (!valid) {
            return res.status(400).json({
              error: new Error('Incorrect password!')
            });
          }
          const token = jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' });
          return res.status(200).json({
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          return res.status(500).json({
            error: error
          });
        }
      );
    }
  );
}