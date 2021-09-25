const bcrypt = require('bcrypt');
const User = require("../models/users.model");

async function register(req, res) {
    const user = new User();
  
    // Note - Promise.all fails fast
    const [email, username] = await Promise.all([
        User.findOne({email: req.body.email}).exec(),
        User.findOne({username: req.body.username}).exec()
    ])

    if(!!email || !!username) {
        return res.status(409).json({
            email: !!email,
            username: !!username
        })
    }

    const saltRounds = Number(process.env.saltRounds);
    const passwordPlain = req.body.password;
    try {
        const passwordHashed = await bcrypt.hash(passwordPlain, saltRounds);

        user.email = req.body.email;
        user.username = req.body.username;
        user.password = passwordHashed;
        user.created = req.body.date;
        user.articles = req.body.articles || [];

        const saved = await user.save();

        const savedObj = saved.toObject();

        res.status(200).json(savedObj);
    } catch(e) {
        console.error(e);
        res.status(400);
    }
}

module.exports = register;
