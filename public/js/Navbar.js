'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

// var HoverButton = React.createClass({
//     getInitialState: function () {
//         return {hover: false};
//     },

//     mouseOver: function () {
//         this.setState({hover: true});
//     },

//     mouseOut: function () {
//         this.setState({hover: false});
//     },

//     render: function() {
//         var label = "foo";
//         if (this.state.hover) {
//             label = "bar";
//         }
//         return React.createElement(
//             "button",
//             {onMouseOver: this.mouseOver, onMouseOut: this.mouseOut},
//             label
//         );
//     }
// });



var LoginPanel = React.createClass({
	render: function() {
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
});

// var LoginBtn = React.createClass({
// 	render: function() {
// 		return (
// 			<div className="plain_white_link"><HoverButton /></div>
// 			);
// 	}
// });

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

/*
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
*/
});

module.exports = Navbar;
