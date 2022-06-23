const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router().post('/', async (req, res, next) => {
  console.log('req.body', req.body);
  try {
    const user = await UserService.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
