const router = require("express").Router();
const { adminLogin, adminLogout, userLists } = require("../cotrollers/admin.controller");
// const { isAdmin } = require("../middleware/auth.middleware");

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.get('/users', userLists)
// router.get('/users', isAdmin, userLists)
// router.post('/course', createCourse);

module.exports = router;