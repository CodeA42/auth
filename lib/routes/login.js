const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../db/queries');
const Token = require('../models/tokens.model.js');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const dbUser = await getUserByUsername(username);

    // console.log(dbUser);
    if(dbUser === undefined) {
        return res.sendStatus(401); //should i send more info??
    }

    const user = {id: dbUser._id, username: dbUser.username};

    if(await bcrypt.compare(password, dbUser.password)) {
        const accessToken = generateAccessToken(user);
        try {
            const refreshToken = await generateRefreshToken(user);
            res.status(200)
            res.cookie('refreshToken', refreshToken, {domain: 'localhost:3333', path: '/refresh', httpOnly: true});
            return res.json({accessToken, user});
        } catch (e) {
            console.error(e);
            return res.sendStatus(404); //what code in case of error on server side?
        }
    }

    return res.sendStatus(403);
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { 'expiresIn': '15s'});
}


/**
 * Generates token and adds it to the database
 * TODO:
 * Abstract the database operations!!
 * Preferrable to abstract token creation as well
 */
async function generateRefreshToken(user) {
    try {
        const token = new Token();
        token.token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        const saved = await token.save();
        const savedObj = saved.toObject();
        return savedObj.token;
    } catch (e) {
        throw e;
    }
}

module.exports = login;