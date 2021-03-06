var $ = require("jquery");

// authentication object
var Auth = {
  	register: function(username, password, cb) {
	    // submit request to server, call the callback when complete
	    var url = "/register";
	    $.ajax({
	      url: url,
        dataType:'json',
	      type: 'POST',
	      data: {
	        username: username,
	        password: password
	      },

	      // on success, store a login token
	      success: function(res) {
          console.log('success!\n');
          console.log(res);
          if(res.loggedIn)
          {
  	        localStorage.token = res.token;
  	        localStorage.name = res.name;
          }
	        if (cb)
	          cb(res.loggedIn);
	      }.bind(this),

	      error: function(xhr, status, err) {
          console.log(res);
	        // if there is an error, remove any login token
	        delete localStorage.token;
          delete localStorafe.name;
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
		        localStorage.token = res.token;
		        localStorage.name = res.name;
		  	}
		  	if (cb)
		  		cb(res.loggedIn);
	      }.bind(this),
	      error: function(xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	//        this.onChange(false);
	        if (cb)
	          cb(false);
	      }.bind(this)
	    });
    },
  // get the token from local storage
  getToken: function() {
    return localStorage.token;
  },
  // get the name from local storage
  getName: function() {
    return localStorage.name;
  },
  // logout the user, call the callback when complete
  logout: function(cb) {
    delete localStorage.token;
    delete localStorage.name;
//    this.onChange(false);
    if (cb) cb(true);
  },
  // check if user is logged in
  loggedIn: function() {
    return !!localStorage.token;
  },
};

module.exports = Auth;
