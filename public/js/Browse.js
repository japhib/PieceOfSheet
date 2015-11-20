'use strict';

var React  = require('react');

var Browse = React.createClass({
	showFiles: function() {
		var ret = '';
		this.props.files.forEach(function(entry) {
			console.log( entry );
			ret += entry.title + '\n';
		});
		return ret;
	},
    render: function() {
        return (
            <div>
            	{this.showFiles()}
            </div>
            );
    }
});

module.exports = Browse;