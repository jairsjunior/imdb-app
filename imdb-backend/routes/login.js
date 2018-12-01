const express = require('express');
const router = express.Router();
const login = require('../modules/login');


// router.options('/login', function (req, res) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.end();
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('');
});

router.post('/', function(req, res, next) {
    login.tryLogin(req, res, next);
});

router.post('/logout', function(req, res, next){
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;