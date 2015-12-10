'use strict';

var React  = require('react');

var CommentBox = require('./CommentBox');
var FileThumbnail = require('./FileThumbnail');
var BrowseHeader = require('./BrowseHeader');

var Browse = React.createClass({
    getInitialState: function() {
        return {
            files: []
        };
    },
    componentDidMount: function() {
        $.get('/all-uploads', function( data ) {
            if ( this.isMounted() ) {
                this.setState( {files:data} );
            }
        }.bind(this));
    },
    render: function() {
        var content = this.state.files.map( function( file ) {
        	return ( 
        		<FileThumbnail data={file} />
        		);
        });
        return (
        	<div>
        		<BrowseHeader numFiles={this.state.files.length} title="Browse all uploads" />
                {content}
        	</div>
        	);
    }
});

module.exports = Browse;