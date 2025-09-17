const User = require('../Models/Users');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res, isAdmin = false) => {
  const token = signToken(user._id || 'admin'); // 'admin' id for admin token
  
  // Remove password from output if user object exists
  if (user && user.password) user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    isAdmin,
    data: {
      user: user || null
    }
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      nic: req.body.nic,
      name: req.body.name,
      gender: req.body.gender,
      district: req.body.district,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { nic, password } = req.body;

    // 1) Check if NIC and password exist
    if (!nic || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide NIC and password!'
      });
    }

    // 1a) Check if admin
    if (nic === process.env.ADMIN_NIC && password === process.env.ADMIN_PASSWORD) {
      return createSendToken({ _id: 'admin' }, 200, res, true);
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ nic }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect NIC or password'
      });
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.'
      });
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    if (decoded.id === 'admin') {
      req.user = { _id: 'admin', isAdmin: true };
      return next();
    }

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.'
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: 'Invalid token'
    });
  }
};
