const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../db/queries');
const Token = require('../models/tokens.model.js');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const dbUser = await getUserByUsername(username);

    if(dbUser === undefined) {
        return res.sendStatus(401); //shoudl i send more info??
    }

    const user = {id: dbUser._id, username: dbUser.username};

    if(await bcrypt.compare(password, dbUser.password)) {
        const accessToken = generateAccessToken(user);
        const token = new Token();
        try {
            token.token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            const saved = await token.save();
            const savedObj = saved.toObject();
            return res.status(200).json({accessToken, refreshToken: savedObj.token, userId: user.id});
        } catch (e) {
            console.error(e);
            return res.sendStatus(404); //what code in case of error on server side?
        }
    }

    return res.sendStatus(403);
    
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
}

function passwordValid(password,) {
    
}

module.exports = login;