'use strict';

var React  = require('react');

var BrowseHeader = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Browse all uploads</h1><br />
                Number of files uploaded: {this.props.headerProps.numFiles}<br /><br />
            </div>
            );
    }
});

module.exports = BrowseHeader;