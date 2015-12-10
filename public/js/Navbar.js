'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Auth = require('./Auth');

var LoginPanel = React.createClass({
	// initial state
	getInitialState: function() {
		return {
			loggedIn: this.props.loggedIn,
			// there was an error on logging in
			error: false
		};
	},

	componentDidMount: function() {
		console.log( Auth.isLoggedIn() );
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
			this.props.onLoginChange(false);
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
				this.props.onLoginChange(false);
				return;
			} else {
				this.setState({
					loggedIn: true,
					error: false
				});
				this.props.onLoginChange(true);
			}
		}.bind(this));
	},

	logout: function(event) {
		event.preventDefault();

		Auth.logout(function(loggedIn) {
			if(loggedIn) {
				this.setState({
					loggedIn: false,
					error: false
				});
				this.props.onLoginChange(false);
			}
		}.bind(this));
	},

	name: function() {
		return Auth.getName();
	},

	render: function() {
		if ( this.state.loggedIn ) {
			return (
				<div className='navbar-right'>
					<span className='white-text'>Hello, {this.name}!</span>
					<form className='navbar-form navbar-right LoginPanel' onSubmit={this.logout}>
						<div className='form-group'>
						</div>
						<button type='submit' className='btn btn-default'>Logout</button>
					</form>
				</div>
			);
		} else {
			return (
				<form className='navbar-form navbar-right LoginPanel' onSubmit={this.login}>
					<div className='form-group'>
						<input type='text' ref='username' className='form-control input-md' placeholder='Username'></input>
						<input type='password' ref='password' className='form-control input-md' placeholder='Password'></input>
					</div>
					<button type='submit' className='btn btn-default'>Login</button>
				</form>
				);
		}
	}
});

var Navbar = React.createClass({
	getInitialState: function() {
			return({
				loggedIn: this.props.loggedIn,
				error: false
			});
	},

	onLoginChange: function(status) {
		this.setState({
			loggedIn: status
		});
		this.props.onLoginChange(status);
	},

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
					            <li><a href="/#/my-uploads">My Uploads</a></li>
					            <li><a href="/#/upload">Upload Music</a></li>
					          </ul>
					        </li>
						</ul>
						<LoginPanel loggedIn={this.state.loggedIn} onLoginChange={this.onLoginChange} />
					</div>
				</div>
			</nav>
			);
	},
});

module.exports = Navbar;
