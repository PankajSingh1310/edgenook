const router = require("express").Router();
const { adminLogin, adminLogout, userLists } = require("../cotrollers/admin.controller");

router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.get('/users',userLists)

module.exports = router;