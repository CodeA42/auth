const User = require('mongoose').model('User');

async function getUserByUsername(username) {
    const user = await User.findOne({'username': username}).exec();
    return user?.toObject();
}

async function getUserById(id) {
    const user = await User.findById(id).exec();
    return user?.toObject();
  }

module.exports = {
    getUserByUsername,
    getUserById
}
