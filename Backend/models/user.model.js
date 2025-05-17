const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'First name must be at least 3 characters long'],
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'First name must be at least 3 characters long'],
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [5, 'Email must be at least 5 characters long'],
    match: [/\S+@\S+\.\S+/, 'Email is not valid']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  address: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, 'Address must be at least 10 characters long'],
    maxlength: [100, 'Address must be at most 100 characters long']
  },
  college: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'College name must be at least 3 characters long'],
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'City name must be at least 3 characters long'],
  },
  state: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'State name must be at least 3 characters long'],
  },
  pincode: {
    type: String,
    required: true,
    match: /^[0-9]{6}$/ // Assuming Indian pincode
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/ // Assuming Indian phone number format
  }
}, { timestamps: true });

userSchema.statics.comparePassword = async function (candidatePassword, hashedPassword) {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing password');
  }
};

userSchema.statics.generateAuthToken = function (userId) {
  try {
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error('Error generating token');
  }
};

userSchema.statics.hashPassword = async function (plainPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await userSchema.statics.hashPassword(this.password);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
