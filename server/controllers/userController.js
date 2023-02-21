const asyncHandler = require('express-async-handler');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
const generateToken = require('../utils/generateToken.js');
const nodemailerConfig = require('../config/nodemailerConfig');
const { default: isEmpty } = require('../validations/isEmpty.js');

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (user.status != 'Active') {
      res.status(403);
      throw new Error('Pending Account. Please Verify Your Email!');
    }

    return res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      status: user.status,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, retypePassword } = req.body;
  const token = jwt.sign({ email: email }, process.env.NODEMAILER_SECRET);
  const userExists = await User.findOne({ email });
  const errors = {};

  if (userExists) {
    errors.email = 'User with this email already exists';
  }

  // TODO:Fix validation, put it in separate file
  if (!fullname) {
    errors.fullname = 'Fullname is required';
  }
  if (!email) {
    errors.email = 'Email is required';
  }
  if (!password) {
    errors.password = 'Password is required';
  }
  if (!retypePassword) {
    errors.retypePassword = 'Retype password is required';
  }
  if (password && retypePassword) {
    if (password !== retypePassword) {
      errors.retypePassword = 'Password not the same';
    }
  }

  if (!isEmpty(errors)) {
    res.status(400);

    return res.json({ type: 'FORM_ERROR', errors: errors });
  }
  const user = await User.create({
    fullname,
    email,
    password,
    confirmationCode: token,
  });
  if (user) {
    nodemailerConfig.sendConfirmationEmail(
      user.fullname,
      user.email,
      user.confirmationCode
    );

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      status: user.status,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign(
      { email: user.email },
      process.env.NODEMAILER_SECRET
    );

    if (user.status != 'Active') {
      user.confirmationCode = token;
      await user.save();

      if (user) {
        nodemailerConfig.sendConfirmationEmail(
          user.fullname,
          user.email,
          user.confirmationCode
        );

        res.status(202);
        return res.json({
          message: 'Verification code sent successfully',
        });
      } else {
        res.status(404);
        throw new Error("User with this email doesn't exist");
      }
    } else if (userEmail.status == 'Active') {
      res.status(202);
      return res.json({
        message: 'User account is already activated',
      });
    } else {
      res.status(404);
      throw new Error("User with this email doesn't exist");
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });

  if (!user) {
    res.status(404);
    throw new Error('User Not found. Confirmation code is expired.');
  }
  if (user.status == 'Active') {
    res.status(201);
    return res.json({
      message: 'User account already activated please login to continue',
    });
  }

  user.status = 'Active';

  user.save((err) => {
    if (err) {
      res.status(500);
      throw new Error(err);
    } else {
      res.status(200);
      return res.json({
        message: 'User account successfully activated please login to continue',
      });
    }
  });
});

module.exports = {
  loginUser,
  registerUser,
  verifyUser,
  resendVerificationEmail,
};
