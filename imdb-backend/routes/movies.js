const express = require('express');
const router = express.Router();
const login = require('../modules/login');

/* GET movies listing. */
router.get('/', login.verifyJWT , function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
