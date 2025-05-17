const {validateUserRegistration} = require('../validate/user.validate');
const router = require('express').Router();
const {registerUser, loginUser} = require('../cotrollers/user.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;