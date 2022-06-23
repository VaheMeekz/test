const Workspace = require('../models').Workspaces
const generator = require("../utils/generator").generator

const create = async (res, userId, name, domain, subDomain) => {
    try {
        const have = await Workspace.findOne({where: {subDomain}})
        if (have) {
            let first = await generator(domain)
            let second = await generator(domain)
            return res.json({
                variant:true,
                variants: [first, second]
            })
        }
        const newWorkspace = await Workspace.create({
            userId, name, domain, subDomain
        })
        return res.json({
            variant:false,
            newWorkspace
        })
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const deleteWorkspace = async (res, creatorId, id) => {
    try {
        await Workspace.destroy({
            where: {
                id, userId: creatorId
            }
        })
        return res.json({success: true})
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const editWorkspace = async (res, userId, id, name, domain, subDomain) => {
    try {
        const workspace = await Workspace.findOne({where: {id}})
        if (!workspace || workspace.userId != userId) {
            return res.json({error: "Error"})
        }
        const have = await Workspace.findOne({where: {subDomain}})
        if (have) {
            let first = await generator(domain)
            let second = await generator(domain)
            return res.json({
                variant:true,
                variants: [first, second]
            })
        }else {
            workspace.name = name
            workspace.domain = domain
            workspace.subDomain = subDomain
            await workspace.save()
            return res.json(workspace)
        }
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const getUserWorkspaces = async (res, id, offset, limit) => {
    try {

        const userPaginateWorkspaces = await Workspace.findAll({
            where: {userId: id}, offset: offset * limit, limit,
        })
        const all = await Workspace.findAll()
        return res.json({workspaces: userPaginateWorkspaces, count: all.length})
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const getSingleWorkspace = async (res, id, userId) => {
    try {
        const workspace = await Workspace.findOne({where: {id}})
        if (workspace.userId !== userId) {
            return res.json({message: "Fail"})
        }
        return res.json(workspace)
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const edit = async (req) => {
    try {

    } catch (e) {
        console.log("Something went wrong", e)
    }
}

module.exports = {
    create, deleteWorkspace, getUserWorkspaces, getSingleWorkspace, editWorkspace
}