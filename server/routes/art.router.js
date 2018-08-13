const express = require('express');
const router = express.Router();
const getArt = require('../modules/connectArt');

router.get('/', (req, res) => {
  const art = getArt();
  res.send(art);
});

module.exports = router;