const router = require('express').Router();
const {registerUser, loginUser,logoutUser,userProfile} = require('../cotrollers/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

router.post('/register', registerUser);
router.post('/login',loginUser);
router.post('/logout',authMiddleware,logoutUser)
router.get('/profile',authMiddleware,userProfile);

module.exports = router;