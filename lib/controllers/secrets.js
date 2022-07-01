const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { getSecrets, addSecret } = require('../models/Secret');

module.exports = Router()
  .get('/', async (req, res) => {
    const secrets = await getSecrets();
    res.json(secrets);
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newSecret = await addSecret(req.body);
      res.json(newSecret);
    } catch (e) {
      next(e);
    }
  });
