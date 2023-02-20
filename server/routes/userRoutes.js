const express = require('express');
const router = express.Router();
const {
  loginUser,
  registerUser,
  verifyUser,
  resendVerificationEmail,
} = require('../controllers/userController.js');
// protect middleware is used to protect private routes
const { protect } = require('../middleware/authMiddleware.js');

// @desc    Register a new user
// @route   POST /api/user/register
// @acess   Public
router.post('/register', registerUser);

// @desc    Verify user using confirmation code from email
// @route   POST /api/user/verifyUser/:confirmationCode
// @acess   Public
router.get('/verifyUser/:confirmationCode', verifyUser);

// @desc    Login user & get token
// @route   POST /api/user/login
// @acess   Public
router.post('/login', loginUser);

// @desc    Resend verification email
// @route   POST /api/user//verify/resend
// @acess   Public
router.post('/verify/resend', resendVerificationEmail);

module.exports = router;
