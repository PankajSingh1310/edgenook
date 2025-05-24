const router = require('express').Router();
const {registerUser, loginUser, logoutUser, userProfile, requestEnrollment, getEnrolledCourses} = require('../cotrollers/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware,logoutUser)
router.get('/profile', authMiddleware,userProfile);
router.post('/enrollments/request/:courseId', authMiddleware, requestEnrollment);
router.get('/courses', authMiddleware, getEnrolledCourses); // Get enrolled courses

module.exports = router;