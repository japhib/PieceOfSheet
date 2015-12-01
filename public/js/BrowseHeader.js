'use strict';

var React  = require('react');

var BrowseHeader = React.createClass({
    render: function() {
        return (
            <div>
                <h1>{this.props.title}</h1><br />
                Number of files uploaded: {this.props.numFiles}<br /><br />
            </div>
            );
    }
});

module.exports = BrowseHeader;