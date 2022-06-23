const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/authMiddleware')
const userValidationSchemas = require("../validation/userRouterValidation")

router.post('/register',userValidationSchemas.registerValidation,userController.register)
router.post('/login',userValidationSchemas.loginValidation,userController.login)
//
router.post('/logout',authMiddleware,userController.logout)
module.exports = router;
