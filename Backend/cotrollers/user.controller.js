const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {

  const { fullname, email, password, address, college, city, state, pincode, phone } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await userModel.hashPassword(password);
    if (!hashedPassword) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    const newUser = new userModel({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname
      },
      email,
      password: hashedPassword,
      address,
      college,
      city,
      state,
      phone,
      pincode
    });

    await newUser.save();

    console.log('User registered successfully:', newUser);

    const token = userModel.generateAuthToken(newUser._id);
    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await userModel.comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = userModel.generateAuthToken(user._id);

    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    
    res.status(200).json({ message: 'User logged in successfully' });
  }
  catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser
}