var $ = require("jquery");

// authentication object
var Auth = {
  	register: function(username, password, cb) {
	    // submit request to server, call the callback when complete
	    var url = "/register";
	    $.ajax({
	      url: url,
	      type: 'POST',
	      data: {
	        username: username,
	        password: password
	      },
	      // on success, store a login token
	      success: function(res) {
	        sessionStorage.token = res.token;
	        sessionStorage.name = res.name;
	        this.onChange(true);
	        if (cb)
	          cb(true);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        // if there is an error, remove any login token
	        delete sessionStorage.token;
	        this.onChange(false);
	        if (cb)
	          cb(false);
	      }.bind(this)
	    });
  	},
  	isLoggedIn: function( username, password ) {
  		var ret = $.get('/isLoggedIn');
  		return ret;
  	},
    // login the user
    login: function(username, password, cb) {
	    // submit request to server
	    var url = "/login";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'POST',
	      data: {
	        username: username,
	        password: password
	      },
	      success: function(res) {
	      	console.log(res);
	      	if ( res.loggedIn ) {
		        // on success, store a login token
		        sessionStorage.token = res.token;
		        sessionStorage.name = res.name;
		  	}
		  	if (cb)
		  		cb(res.loggedIn);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        // if there is an error, remove any login token
	        delete sessionStorage.token;
	        this.onChange(false);
	        if (cb)
	          cb(false);
	      }.bind(this)
	    });
    },
  // get the token from local storage
  getToken: function() {
    return sessionStorage.token;
  },
  // get the name from local storage
  getName: function() {
    return sessionStorage.name;
  },
  // logout the user, call the callback when complete
  logout: function(cb) {
    delete sessionStorage.token;
    this.onChange(false);
    if (cb) cb(true);
  },
  // check if user is logged in
  loggedIn: function() {
    return !!sessionStorage.token;
  },
};

module.exports = Auth;
