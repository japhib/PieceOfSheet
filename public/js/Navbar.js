'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Navbar = React.createClass({
    render: function() {
        return (
            <div>
	            <div className="navbar">
	            	<h3><Link to="/" className="homepage_link">Piece of Sheet</Link></h3>
	            	<i>for all your sheet music needs</i>
	            </div>
	            <div className="navbar-spacer">&nbsp;</div>
            </div>
            );
    }
});

module.exports = Navbar;