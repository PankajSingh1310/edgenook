const router = require("express").Router();
const { adminLogin, adminLogout, userLists, createCourse, updateCourse, deleteCourse, deleteUser, adminProfile } = require("../cotrollers/admin.controller");
const { isAdmin } = require("../middleware/auth.middleware");

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.get('/profile', isAdmin, adminProfile);
router.get('/users', isAdmin, userLists);
router.post('/course',isAdmin, createCourse);
router.put('/course/update/:courseId', isAdmin, updateCourse);
router.delete('/course/delete/:courseId', isAdmin, deleteCourse);
router.delete('/user/delete/:userId', isAdmin, deleteUser);
router.post('/course/update/:courseId', isAdmin, updateCourse);
router.post('/course/delete/:courseId', isAdmin, deleteCourse);
router.post('/user/delete/:userId', isAdmin, deleteUser);
router.put('/enrollments/verify/:enrollmentId', isAdmin, verifyEnrollment);
router.get('/enrollments/pending', isAdmin, getPendingEnrollments);
router.get('/enrollments', isAdmin, getEnrollments); // Get all enrollments

module.exports = router;