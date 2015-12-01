'use strict';

var React  = require('react');

var FileThumbnail = React.createClass({
	render: function() {
		return (
			<div style={{float: 'left'}} className='col-md-3'>
				<div style={{position: 'relative'}}>
					<h4 style={{textAlign: 'center'}}>Title: {this.props.data.title}</h4>
					<div style={{textAlign: 'center', fontStyle: 'italic'}}>Composer: {this.props.data.composer}</div>
					<img src={this.props.data.thumbnail_filename} />
				</div>
			</div>
			);
	}
});

module.exports = FileThumbnail;