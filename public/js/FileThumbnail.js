'use strict';

var React  = require('react');

var FileThumbnail = React.createClass({displayName: "FileThumbnail",
		render: function() {
			return (
                React.createElement("a", {href:this.props.data.thumbnail_file},
				React.createElement("div", {style: {float: 'left'}, className: "col-md-3 hoverable"}, 
					React.createElement("div", {style: {position: 'relative'}}, 
						React.createElement("h4", {style: {textAlign: 'center'}}, "Title: ", this.props.data.title), 
						React.createElement("div", {style: {textAlign: 'center', fontStyle: 'italic'}}, "Composer: ", this.props.data.composer),
						React.createElement("img", {src: this.props.data.thumbnail_file, className: "thumbnail_pic"})
					)
				)
                )
			);
		}
	});
module.exports = FileThumbnail;
