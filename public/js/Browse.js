'use strict';

var React  = require('react');

var CommentBox = require('./CommentBox');
var FileThumbnail = require('./FileThumbnail');

var Browse = React.createClass({
	// showFiles: function() {
	// 	var ret = '';
	// 	this.props.files.forEach(function(entry) {
	// 		console.log( entry );
	// 		ret += entry.title + '\n';
			
	// 		ret += (
	// 			<CommentBox data={entry.comments} />
	// 			);
	// 	});
	// 	return ret;
	// },
    render: function() {
        var content = this.props.files.map( function( file ) {
        	return ( 
        		<FileThumbnail data={file} />
        		);
        });
        return (
        	<div>
        		{content}
        	</div>
        	);
        // return (
        //     <div>
        //     	{this.showFiles()}
        //     </div>
        //     );
    }
});

module.exports = Browse;