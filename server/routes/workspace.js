const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspace.controller')
const authMiddleware = require('../middleware/authMiddleware')
const workspaceValidationSchemas = require("../validation/workspaceRouterValidation")


router.post('/', workspaceValidationSchemas.createWorkspaceValidation, authMiddleware, workspaceController.create)
router.get('/', authMiddleware, workspaceController.getAllUserWorkspaces)
router.get('/single', authMiddleware, workspaceController.getSingleUserWorkspace)
router.post('/delete', authMiddleware, workspaceController.deleteWorkspace)
router.put('/edit', workspaceValidationSchemas.editWorkspaceValidation, authMiddleware, workspaceController.editWorkspace)
module.exports = router;
