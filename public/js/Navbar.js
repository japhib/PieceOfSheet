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
				<form className="LoginPanel" method="POST" onSubmit={this.login}>
					<input type="text" name="username" ref="username" className='input-md' />
					<input type="password" name="password" ref="password" className='input-md' />
					<input type="submit" value="Login" className='input-md' />
				</form>
				);
		}
	}
});

var Navbar = React.createClass({
	render: function() {
		return (
			<div>
				<div className="navbar">

					<div className="navbarLeft">
						<h3><Link to="/" className="homepage_link">Piece of Sheet</Link></h3>
						<i>for all your sheet music needs</i>
					</div>

					<div className="navbarRight">
						<LoginPanel />
					</div>

					<div className="navbarCenter">
						<div className="navbarLinks">
							<Link to="/browse">Browse</Link> 
							|
							<Link to="/favorites">Favorites</Link> 
							|
							<Link to="/uploads">My Uploads</Link>
							|
							<a href="logout">Logout</a>
						</div>
					</div>
					<div style={{clear: 'both'}}></div>
					
				</div>
				<div className="navbar-spacer">&nbsp;</div>
			</div>
			);
	}
});

module.exports = Navbar;