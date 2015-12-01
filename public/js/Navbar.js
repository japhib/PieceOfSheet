'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;




var LoginPanel = React.createClass({
	render: function() {
		return (
			<form className="LoginPanel">
        		<input type="text" name="username" className='input-lg' />
        		<input type="text" name="username" className='input-lg' />
        		<input type="submit" value="Login" className='input-lg' />
			</form>
			);
	}
});

var LoginBtn = React.createClass({
	render: function() {
		return (
			<div className="plain_white_link">Login</div>
			);
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
	            		<LoginBtn />
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