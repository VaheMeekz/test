const User = require("../models").User
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (res, firstName, lastName, email, password) => {
    try {
        const oldUser = await User.findOne({where: {email: email.toLowerCase()}})
        if (oldUser) {
            return res.json({success: false, error: 'User with this email already exists'})
        }
        let encryptedPassword = await bcrypt.hash(password, 10);
        let user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword
        })
        await user.save()
        return res.json({success: true})
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const login = async (res, email, password) => {
    try {
        const user = await User.findOne({
            where: {email: email.toLowerCase()},
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {user_id: user.id, email: email.toLowerCase()},
                process.env.TOKEN_KEY
            );
            user.token = token;
            user.save();
            return res.json({
                success: true, user: {
                    id: user.id,
                    token: user.token
                }
            });
        }
        return res.json({error: ["Invalid credentials"]});
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

const logout = async (res, userId) => {
    try {
        const user = await User.findOne({where: {id: userId}})
        user.token = null
        await user.save()
        return res.json({success: true})
    } catch (e) {
        console.log("Something went wrong", e)
    }
}

module.exports = {
    register,
    login,
    logout
}