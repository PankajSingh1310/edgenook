const adminModel = require('../models/admin.model');
const courseModel = require('../models/course.model');

module.exports.adminLogin = async (req,res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const admin = await adminModel.findOne({email}).select('+password');
        if(!admin) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const isMatch = await admin.comparePassword(password);
        console.log(isMatch);
        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const token = admin.generateAuthToken();
        if(!token) {
            return res.status(500).json({
                message: "Error generating token"
            })
        }
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })
        req.admin = admin;
        res.status(200).json({
            message: "Login successful",
            token
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports.adminLogout = async (req,res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({
            message: "Logout successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports.userLists = async (req, res) => {
    try {
      const email = process.env.DEFAULT_ADMIN_EMAIL;
  
      const admin = await adminModel
        .findOne({ email })
        .populate('users'); 
      if (!admin || !admin.users || admin.users.length === 0) {
        return res.status(404).json({
          message: "No users found"
        });
      }
  
      res.status(200).json({
        message: "Users fetched successfully",
        users: admin.users
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  };


module.exports.createCourse = async (req, res) => {
  const { avatar, title, description, modules, duration, studentsGet } = req.body;

  try {
    // Check if course with same title already exists
    const existingCourse = await courseModel.findOne({ title });
    if (existingCourse) {
      return res.status(400).json({ message: 'Course already exists' });
    }

    // Create new course
    const newCourse = new courseModel({
      avatar,
      title,
      description,
      modules,
      duration,
      studentsGet
    });

    await newCourse.save();

    // Link course to admin
    const adminEmail = process.env.ADMIN_EMAIL;

    const admin = await adminModel.findOne({ adminEmail });
    if(!admin) {
        return res.status(404).json({ message: 'unknown error' });
    }

    admin.courses.push(newCourse._id);
    await admin.save();

    console.log('Course created successfully:', newCourse);
    res.status(201).json({ message: 'Course created successfully', course: newCourse });

  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  