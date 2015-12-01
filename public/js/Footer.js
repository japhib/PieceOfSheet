'use strict';

var React  = require('react');

var Footer = React.createClass({
    render: function() {
        return (
            <div className="footer">
                <br />
                <br />
                <br />
                <div style={{ textAlign: 'center'}}>Copyright 2015 Piece of Sheet Inc.</div>
            </div>
            );
    }
});

module.exports = Footer;