const { check } = require('express-validator');

const registerValidation = [
    check('firstName', 'Firstname is required!')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('Min 3')
        .isLength({ max: 15 })
        .withMessage('Max 15!'),
    check('lastName', 'Lastname is required!')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('Min 3')
        .isLength({ max: 20 })
        .withMessage('Max 20!'),
    check('password', 'Password should have atleast 6 characters!')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Min 6')
        .isLength({ max: 15 })
        .withMessage('Max 15'),
    check('email', 'Email is required!')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('Min 6')
        .isLength({ max: 25 })
        .withMessage('Max 25')
        .isEmail()
        .normalizeEmail()
]

const loginValidation = [
    check('email', 'Email is required!')
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage('Min 6')
        .isLength({ max: 25 })
        .withMessage('Max 25')
        .isEmail()
        .normalizeEmail(),
    check('password', 'Password should have atleast 6 characters!')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Min 6')
        .isLength({ max: 15 })
        .withMessage('Max 15')
]

module.exports = {
    registerValidation,
    loginValidation
}