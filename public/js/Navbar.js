'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Auth = require('./Auth');

var LoginPanel = React.createClass({
	// initial state
	getInitialState: function() {
		return {
			// there was an error on logging in
			error: false
		};

	},
	login: function( event ) {
		// prevent default browser submit
		event.preventDefault();
		// get data from form
		var username = this.refs.username.value;
		var password = this.refs.password.value;
		if (!username || !password) {
			this.setState({
				error: true
			});
			return;
		}
		// login via API
		Auth.login(username, password, function(loggedIn) {
			// login callback
			if (!loggedIn) {
				this.setState({
					loggedIn: false,
					error: true
				});
				return;
			} else {
				this.setState({
					loggedIn: true,
					error: false
				});
			}
		}.bind(this));
	},
	register: function( event ) {
		// prevent default browser submit
		event.preventDefault();
		// get data from form
		var username = this.refs.username.value;
		var password = this.refs.password.value;
		if (!username || !password) {
			this.setState({
				error: true
			});
			return;
		}
		Auth.register(username, password, function(loggedIn) {
			// login callback
			if (!loggedIn) {
				this.setState({
					loggedIn: false,
					error: true
				});
				return;
			} else {
				this.setState({
					loggedIn: true,
					error: false
				});
			}
		}.bind(this));
	},
	render: function() {
		if ( this.state.loggedIn ) {
			return ( <div>Logout</div> );
		} else {
			return (
				<form className='navbar-form navbar-right LoginPanel' method='POST' action='login'>
					<div className='form-group'>
						<input type='text' name='username' className='form-control input-md' placeholder='Username'></input>
						<input type='password' name='password' className='form-control input-md' placeholder='Password'></input>
					</div>
					<button type='submit' className='btn btn-default'>Login</button>
				</form>
				);
		}
	}
});

var Navbar = React.createClass({
  render: function() {
    return (
			<nav className='navbar navbar-inverse navbar-fixed-top'>
				<div className='container-fluid'>
					<div className='navbar-header'>
						<button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
							<span className='sr-only'>Toggle navigation</span>
							<span className='icon-bar'></span>
							<span className='icon-bar'></span>
							<span className='icon-bar'></span>
						</button>
						<a className='navbar-brand' href='#'>Piece of Sheet</a>
					</div>
					<div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
						<ul className='nav navbar-nav'>
							<li className='dropdown'>
	          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
	          <ul className="dropdown-menu">
	            <li><a href="/#/browse">Browse</a></li>
	            <li><a href="/#/favorites">Favorites</a></li>
	            <li><a href="/#/uploads">Uploads</a></li>
	          </ul>
	        </li>
						</ul>
						<LoginPanel />
					</div>
				</div>
			</nav>
		);
	},
});

module.exports = Navbar;
