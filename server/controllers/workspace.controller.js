const workspaceService = require('../services/workspace.service')

const create = async (req, res) => {
    try {
        const {name, domain, subDomain} = req.body
        const userId = req.user.user_id
        workspaceService.create(res, userId, name, domain, subDomain)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const deleteWorkspace = async (req, res) => {
    try {
        const {id} = req.body
        const userId = req.user.user_id
        workspaceService.deleteWorkspace(res, userId, id)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const editWorkspace = async (req, res) => {
    try {
        const {id, name, domain, subDomain} = req.body
        const userId = req.user.user_id
        workspaceService.editWorkspace(res, userId, id, name, domain, subDomain)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}


const getAllUserWorkspaces = async (req, res) => {
    try {
        const userId = req.user.user_id
        const offset = Number.parseInt(req.query.offset) || 0;
        const limit = Number.parseInt(req.query.limit) || 3;
        workspaceService.getUserWorkspaces(res, userId, offset, limit)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const getSingleUserWorkspace = async (req, res) => {
    try {
        const userId = req.user.user_id
        const {id} = req.query
        workspaceService.getSingleWorkspace(res, id, userId)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}


module.exports = {
    create,
    deleteWorkspace,
    getAllUserWorkspaces,
    getSingleUserWorkspace,
    editWorkspace
}