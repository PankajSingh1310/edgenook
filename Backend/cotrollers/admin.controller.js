const adminModel = require('../models/admin.model');
const courseModel = require('../models/course.model');
const mongoose = require('mongoose');

module.exports.adminLogin = async (req,res) => {
    try {
        const {adminEmail , password} = req.body;

        if(!adminEmail || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const admin = await adminModel.findOne({adminEmail}).select('+password');
        if(!admin) {
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const isMatch = await admin.comparePassword(password);
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
      const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
  
      const admin = await adminModel
        .findOne({ adminEmail })
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
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;

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


module.exports.updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { avatar, title, description, modules, duration, studentsGet } = req.body;

  try {
    // Check if course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update course details
    course.avatar = avatar || course.avatar;
    course.title = title || course.title;
    course.description = description || course.description;
    course.modules = modules || course.modules;
    course.duration = duration || course.duration;
    course.studentsGet = studentsGet || course.studentsGet;

    await course.save();

    console.log('Course updated successfully:', course);
    res.status(200).json({ message: 'Course updated successfully', course });

  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {

    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID' });
    }

    // Check if course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete course
    await course.deleteOne();

    // Remove course reference from admin
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const admin = await adminModel.findOne({ adminEmail });
    if (admin) {
      admin.courses = admin.courses.filter(course => course.toString() !== courseId);
      await admin.save();
    }

    console.log('Course deleted successfully:', course);
    res.status(200).json({ message: 'Course deleted successfully' });

  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  