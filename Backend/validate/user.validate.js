const { validationResult, body} = require('express-validator');

const validateUserRegistration = (req, res, next) => {
    return [
        body('fullname.firstname')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('fullname.lastname')
        .isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
        body('email')
        .isEmail().withMessage('Email is not valid')
        .isLength({ min: 5 }).withMessage('Email must be at least 5 characters long'),
        body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('address')
        .isLength({ min: 10, max: 100 }).withMessage('Address must be between 10 and 100 characters long'),
        body('college')
        .isLength({ min: 3 }).withMessage('College name must be at least 3 characters long'),
        body('city')
        .isLength({ min: 3 }).withMessage('City name must be at least 3 characters long'),
        body('state')
        .isLength({ min: 3 }).withMessage('State name must be at least 3 characters long'),
        body('pincode')
        .isLength({ min: 6, max: 6 }).withMessage('Pincode must be exactly 6 characters long')
        .isNumeric().withMessage('Pincode must be a number'),
        body('phone')
        .isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 characters long')
        .isNumeric().withMessage('Phone number must be a number'),
        (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
        }
    ];
}

module.exports = {
    validateUserRegistration
}