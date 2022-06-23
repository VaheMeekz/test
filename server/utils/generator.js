const Workspace = require('../models').Workspaces

const adds = ["1", "A", "2", "B", "3", "O", "q", "4", "G", "4", "5", "6", "D", "7", "v", "p", "8", "9", "10", "d", "4", "13", "11", "G", "12", "13", "T", "14", "R", "13", "Y", "15", "S", "16"];

function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const generator = async (domain) => {
    const variant = await domain + capFirst(adds[getRandomInt(0, adds.length + 1)]) + capFirst(adds[getRandomInt(0, adds.length + 1)])
    const can = await Workspace.findOne({where: {subDomain: variant}})
    if (!can) {
        return variant;
    } else {
        let newVariant = variant + capFirst(adds[getRandomInt(0, adds.length + 1)])
        return newVariant;
    }
}
module.exports = {
    generator
}
