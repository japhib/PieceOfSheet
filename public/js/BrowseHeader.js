'use strict';

var React  = require('react');

var BrowseHeader = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Browse all uploads</h1><br />
                Number of files to browse: {this.props.headerProps.numFiles}<br />
            </div>
            );
    }
});

module.exports = BrowseHeader;