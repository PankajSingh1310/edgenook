const router = require('express').Router();
const {registerUser, loginUser, logoutUser, userProfile, requestEnrollment} = require('../cotrollers/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware,logoutUser)
router.get('/profile', authMiddleware,userProfile);
// router.post('/enroll/:courseId', authMiddleware, enrollCourse);
// router.get('/courses', authMiddleware, getEnrolledCourses);

router.post('/enrollments/request/:courseId', authMiddleware, requestEnrollment);

module.exports = router;