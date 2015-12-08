var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// DB setup

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/piece-of-sheet')
// log all errors to console
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(require('less-middleware')( __dirname + '/public' ));

// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

////////////////////
////////////////////
////////////////////

// Load the bcrypt module
var bcrypt = require('bcrypt');
// Generate a salt
var salt = bcrypt.genSaltSync(10);

// Models
var User = require('./models/User');

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // Hash the password with the salt
    var hash = bcrypt.hashSync( password, salt);
    User.find({ username: username, password_hash: password_hash }, function (err,found_users) {
        if ( found_users != null )
            res.send({loggedIn:true, error: null});
        else 
            res.send({loggedIn:false, error: "invalid username or password"});
    });
});

app.post('/register', function( req, res ) {
    var username = req.body.username;
    var password = req.body.password;
    // Hash the password with the salt
    var hash = bcrypt.hashSync( password, salt);
    User.find({ username: username }, function (err, user) {
        if ( user == null ) {
            var newUser = new User({username: username, password_hash: hash});
            newUser.save();
            res.send({loggedIn:true, error: null})
        } else {
            res.send({loggedIn:false, error: "That username already exists!"})
        }
    })
});

// var jan = new User({username:"jan",password:"asdf"});
// jan.save();

////////////////////
////////////////////
////////////////////

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

module.exports = app;