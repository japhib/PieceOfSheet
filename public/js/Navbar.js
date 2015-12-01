'use strict';

var React  = require('react');

var Navbar = React.createClass({
    render: function() {
        return (
            <div>
	            <div className="navbar">
	            	<h3>Piece of Sheet</h3>
	            	<i>for all your sheet music needs</i>
	            </div>
	            <div className="navbar-spacer">&nbsp;</div>
            </div>
            );
    }
});

module.exports = Navbar;