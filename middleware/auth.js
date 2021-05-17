const errorHandler = require('../controllers/errorController.js');
require("dotenv").config();
const bcrypt = require('bcrypt');
const { use } = require("../routes/userRoutes");
const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  User = mongoose.model('User');


/***************** authenticate with token *********************************/
const verifyUser = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRETE_KEY

    );
    const userData = await User.findOne({ _id: decoded.id }).populate('role', ['_id', 'role_name'])
    if (!userData) return res.status(404).send({ status: 404, message: "user not found" });
    res.local = userData.role.role_name;
    next();

  } catch {
    res.status(401).send({ status: 401, message: "Un-authenticated User" });
  }}
  
    //creating a MiddleWare to verify the phone number
    const verifyPhoneNumber = async (req, res) => {
      try {
        const phoneDetail = phone("++91 9027558701");
        console.log("+" + req);
        if (phoneDetail.length == 0) {
          //res.send("invalid phone number");
          return false;
        } else {
          console.log(phoneDetail);
          return true;
        }
      } catch {
        res.send("something went wrong!");
        return false;
      }
    };


    /************************** authenticate user ***************************/
    const authenticate = (async (req, res, next) => {
      const { email, password } = req.body;
      try {
        const user = await User.findOne({ email: email }, { createdAt: 0, updatedAt: 0 }).populate("role", { role_name: 1 });
        if (!user) return res.status(404).send({ status: 404, message: "user not found" });
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) return res.status(400).send({ status: 400, message: "incorrect password" });
        delete user._doc.password;
        res.local = user;
        next();
      } catch (error) {
        res.status(400).send(error.message);
      }
    });

    /*************** validate the user data ****************/
    const validateData = async (err, data, res, message) => {
      if (err) {
        try {
          if (err.name === "ValidationError")
            return (err = errorHandler.handleValidationError(err, res));
          if (err.code && err.code == 11000)
            return (err = errorHandler.handleDuplicateKeyError(err, res));
        } catch (err) {
          res.status(404).send({ status: 404, message: "Something went wrong" });
        }
      } else if (data.n == 0) {
        res.status(404).send({ status: 404, message: "Invalid Id or Invalid data" });
      } else {
        res.send({ status: 200, message: message ,data});
      }
    }

    module.exports = {
      verifyUser,
      verifyPhoneNumber,
      authenticate,
      validateData
    }
