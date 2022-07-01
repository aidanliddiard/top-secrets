const { Router } = require('express');
const { getSecrets } = require('../models/Secret');

module.exports = Router().get('/', async (req, res) => {
  const secrets = await getSecrets();
  res.json(secrets);
});
