// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User info, with items owned by that user
var userSchema = new Schema({
  	username: {type: String, index: true, unique: true},
  	password_hash: String,
	favorites: [],
});

var User = mongoose.model('users', userSchema);

module.exports = User;
