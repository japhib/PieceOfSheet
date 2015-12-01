'use strict';

var React  = require('react');

var FavoritesHeader = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Favorites</h1><br />
                Number of files uploaded: {this.props.headerProps.numFiles}<br /><br />
            </div>
            );
    }
});

module.exports = FavoritesHeader;