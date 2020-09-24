const userService = require('./user.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    const user = await userService.getById(req.params.id)
    res.send(user)
}
  
async function getUsers(req, res) {
    const users = await userService.query(req.query)
    logger.debug(users);
    res.send(users)
}

async function addUser(req, res) {
    const user = req.body;
    const addedUser = await userService.add(user);
    res.send(addedUser);
}

async function deleteUser(req, res) {
    await userService.remove(req.params.id)
    res.end()
}

async function deleteUsers(req, res) {
    await userService.removeAll()
    res.end()
}

async function updateUser(req, res) {
    const user = req.body;
    const updatedUser = await userService.update(user)
    res.send(updatedUser)
}

module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    addUser,
    deleteUsers
}