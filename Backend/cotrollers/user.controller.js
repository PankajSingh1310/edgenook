const adminModel = require('../models/admin.model');
const blacklistTokenModel = require('../models/blacklistToken.model');
const userModel = require('../models/user.model');
const courseModel = require('../models/course.model');

module.exports.registerUser = async (req, res) => {

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
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;

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

    const admin = await adminModel.findOne({ adminEmail });
    if(!admin) {
      return res.status(404).json({ message: 'unknown error' });
    }

    admin.users.push(newUser._id);
    await admin.save();
    

    console.log('User registered successfully:', newUser);

    const token = newUser.generateAuthToken();
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

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = await user.generateAuthToken();

    if (!token) {
      return res.status(500).json({ message: 'Error generating token' });
    }
    console.log('token:', token);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    // Remove password before sending user
    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.__v;

res.status(200).json({
  message: 'User logged in successfully',
  token,
  user: safeUser
});
  }
  catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    // console.error('Error logging out user:', error);
    res.status(500).json({ message: 'Internal server error' }); 
    
  }
}

module.exports.userProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select('-password -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports.enrollCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await courseModel.findById(courseId);
    const user = await userModel.findById(req.user._id);

    // res.status(200).json({ course, user });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (course.users.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    if (user.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.courses.push(courseId);
    await user.save();
    
    course.users.push(user._id);
    await course.save();

    res.status(200).json({ message: 'Enrolled in course successfully' });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.getEnrolledCourses = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate('courses');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ courses: user.courses });
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}