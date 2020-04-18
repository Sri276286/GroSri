// const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = require('../mocks/users.json');

module.exports = {
  login,
  getAll,
  getById
};

async function login({ username, password }) {
  console.log('username ', username);
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, 'some secret string');
    console.log('token ', token);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token
    };
  }
}

async function getAll() {
  return users.map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
}

async function getById(id) {
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
