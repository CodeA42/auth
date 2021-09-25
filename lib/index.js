require("dotenv").config({path: './lib/config/.env'});

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

let refreshTokens = [];

app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({accessToken, refreshToken});
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
}

app.listen(3333);