require("dotenv").config({path: './lib/config/.env'});

const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

let refreshTokens = [];



function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
}

app.listen(3333);