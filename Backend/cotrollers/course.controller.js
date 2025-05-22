const courseModel = require('../models/course.model');

module.exports.getCourses = async (req, res) => {
    try {
        const courses = await courseModel.find();
        if (!courses) {
            return res.status(404).json({
                message: "No courses found"
            })
        }
        res.status(200).json({
            message: "Courses fetched successfully",
            courses
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}


module.exports.getSingleCourses = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }
        res.status(200).json({
            message: "Course fetched successfully",
            course
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
