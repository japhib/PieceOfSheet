var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var fs = require('fs');
var auth = require('./public/js/Auth.js');

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb'}));
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
var SheetMusic = require('./models/SheetMusic');

var login_cookie_name = 'loginId';

app.get('/isLoggedIn', function(req, res) {
    res.send(req.cookies);
});

app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // Hash the password with the salt
    var hash = bcrypt.hashSync( password, salt);
    User.findOne({ username: username, password_hash: hash }, function (err,found_user) {
        console.log('\n')
        console.log(found_user)
        console.log('\n')
        if ( !!found_user ) {
            console.log("\nfound user in login...\n")
            res.send({loggedIn:true, error: null, token: hash, name: username});
        } else {
          console.log("\nuser does not exist...\n")
            res.send({loggedIn:false, error: "invalid username or password"});
        }
    });
});

app.post('/register', function( req, res ) {
    var username = req.body.username;
    var password = req.body.password;
    // Hash the password with the salt
    var hash = bcrypt.hashSync( password, salt);
    User.findOne({ username: username }, function (err, user) {
        console.log('\n')
        console.log(user)
        console.log('\n')
        if ( !user ) {
            console.log('\ninserting new user....\n');
            var newUser = new User({username: username, password_hash: hash});
            newUser.save();
            res.send({loggedIn:true, error: null, token: hash, name: username});
        } else {
          console.log('\nusername already exists\n');
            res.send({loggedIn:false, error: "That username already exists!"})
        }
    })
});

app.get('/upload', function( req, res ) {
    res.send("You can only post to this page!");
});

app.post('/upload', function( req, res ) {
    // read the post data into variables
    var filename = req.body.filename_end;
    var title = req.body.title;
    var composer = req.body.composer;
    var description = req.body.description;
    var token = req.body.token;
    var username = req.body.uploader;
    // Make an entry for it in our DB
    // First find which user it is that is uploading this
    User.find({password_hash: token}, function(err, user) {

        var sm = new SheetMusic({
            title: title,
            composer: composer,
            filename: filename,
            thumbnail_file: filename + '_p0001.jpeg',
            description: description,
            comments: [],
            uploader: username
        });
        sm.save(function(err) {
            if (err)
                console.log(err);
        });

        // Convert the file because it has been written to base 64.
        var data_url = req.body.file;
        var matches = data_url.match(/^data:.+\/(.+);base64,(.*)$/);
        var ext = matches[1];
        var base64_data = matches[2];
        var buffer = new Buffer(base64_data, 'base64');
        fs.writeFile(__dirname + '/public/media/' + filename, buffer, function (err) {
            if ( err )
                res.send(err)
            else {
                // file successfully uploaded!
                res.send('success');

                // Create a thumbnail of it
                var command = './pdfThumbnail.sh ./public/media/' + filename;
                console.log( command );
                exec(command,
                    function (error, stdout, stderr) {
                        console.log('stdout: ' + stdout);
                        console.log('stderr: ' + stderr);
                        if (error !== null) {
                          console.log('exec error: ' + error);
                    }
                });
            }
        });
    });
});

app.post('/view', function(req, res) {
  var filename = req.body.filename;
  var title = req.body.title;

  SheetMusic.findOne({title: title, filename: filename}, function(err, sheet) {

    console.log('found file...')
    console.log(sheet)
    res.send(sheet);
  });
})

app.post('/addfav', function(req, res) {
  var sheet = req.body.sheet;
  var username = req.body.username;

  console.log('sheet')
  console.log(sheet)
  console.log('user')
  console.log(username)


  User.findOneAndUpdate({ username : username }, { $addToSet : { "favorites" : sheet}}, function(req, res)
  {

  });
})

app.post('/favorites', function(req, res) {
  User.find({username: req.body.username}, function(err, userFavs) {

    console.log('response');
    console.log(userFavs[0].get("favorites"));
    if(!!userFavs)
    {
      console.log('sending favs')
      res.send(userFavs[0].get("favorites"));
    }
    else
    {
      res.send(null);
    }
  });
})

app.post('/my-uploads', function(req, res) {
  SheetMusic.find({uploader: req.body.username}, function (err, userUploads) {
    res.send(userUploads);
  })
})

app.post('/all-uploads', function( req, res ) {
    SheetMusic.find({}, function (err, music) {
      console.log('response');
      console.log(music);
        res.send(music);
    });
})

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
