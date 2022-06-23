const {check} = require('express-validator');

const createWorkspaceValidation = [
    check('name', 'Firstname is required!')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Min 3')
        .isLength({max: 15})
        .withMessage('Max 15!'),
    check('domain', 'Firstname is required!')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Min 3')
        .isLength({max: 15})
        .withMessage('Max 15!'),
    check('subDomain', 'Firstname is required!')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Min 3')
        .isLength({max: 15})
        .withMessage('Max 15!')
]

editWorkspaceValidation = [
    check('userId', "Id is required!")
        .isInt()
        .withMessage('Required')
        .notEmpty(),
    check('name', 'Firstname is required!')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Min 3')
        .isLength({max: 15})
        .withMessage('Max 15!'),
    check('domain', 'Firstname is required!')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Min 3')
        .isLength({max: 15})
        .withMessage('Max 15!'),
    check('subDomain', 'Firstname is required!')
        .notEmpty()
        .isLength({min: 5})
        .withMessage('Min 3')
        .isLength({max: 15})
        .withMessage('Max 15!')
]
module.exports = {
    createWorkspaceValidation,
    editWorkspaceValidation
}

