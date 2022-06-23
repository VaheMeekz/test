const {validationResult} = require('express-validator');
const userService = require('../services/user.service')


const register = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                success: false,
                errors: errors.array()
            });
        } else {
            userService.register(res, firstName, lastName, email, password)
        }
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({
                success: false,
                errors: errors.array()
            });
        } else {
            userService.login(res, email, password)
        }
    } catch (e) {
        console.log("something went wrong", e)
    }
}

const logout = async (req, res) => {
    try {
        const userId = req.user.user_id
        userService.logout(res, userId)
    } catch (e) {
        console.log("something went wrong", e)
    }
}

module.exports = {
    register,
    login,
    logout
}