const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../db/queries');
const Token = require('../models/tokens.model.js');
const jwt = require('jsonwebtoken');

async function refresh(req, res) {
    
}

module.exports = refresh;