const router = require("express").Router();
const { adminLogin, adminLogout, userLists, createCourse, updateCourse, deleteCourse, deleteUser, verifyEnrollment, getPendingEnrollments, getEnrollments} = require("../cotrollers/admin.controller");
const { isAdmin } = require("../middleware/auth.middleware");

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.get('/users', isAdmin, userLists);
router.post('/course',isAdmin, createCourse);
router.post('/course/update/:courseId', isAdmin, updateCourse);
router.post('/course/delete/:courseId', isAdmin, deleteCourse);
router.post('/user/delete/:userId', isAdmin, deleteUser);
router.put('/enrollments/verify/:enrollmentId', isAdmin, verifyEnrollment);
router.get('/enrollments/pending', isAdmin, getPendingEnrollments);
router.get('/enrollments', isAdmin, getEnrollments); // Get all enrollments

module.exports = router;