const router = require("express").Router();
const { adminLogin, adminLogout, userLists, createCourse } = require("../cotrollers/admin.controller");
const { isAdmin } = require("../middleware/auth.middleware");
const { getCourses } = require("../cotrollers/course.controller");

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.get('/users', isAdmin, userLists);
router.post('/course',isAdmin, createCourse);
router.get('/courses', getCourses);

module.exports = router;