var express = require('express');
var router = express.Router();

// Routes are relative - comes from app.use('/login')
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    res.send("Username:" + username + ". Password: " + password);
});

module.exports = router;