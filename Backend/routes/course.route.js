const router = require("express").Router();
const { getCourses, getSingleCourses } = require("../cotrollers/course.controller");

router.get('/', getCourses);
router.get('/:courseId', getSingleCourses);

module.exports = router;