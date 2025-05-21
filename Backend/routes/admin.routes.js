const router = require("express").Router();
const { adminLogin, adminLogout, userLists, createCourse, updateCourse, deleteCourse } = require("../cotrollers/admin.controller");
const { isAdmin } = require("../middleware/auth.middleware");

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.get('/users', isAdmin, userLists);
router.post('/course',isAdmin, createCourse);
router.post('/course/update/:courseId', isAdmin, updateCourse);
router.post('/course/delete/:courseId', isAdmin, deleteCourse);

module.exports = router;