const bcrypt = require('bcrypt');

async function login(req, res) {
    const username = req.body.username;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.status(200).json({accessToken, refreshToken});
}

module.exports = login;