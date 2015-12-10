'use strict';

var React  = require('react');

var FileThumbnail = React.createClass({
	render: function() {
		return (
			<div style={{float: 'left'}} className='col-md-3 hoverable'>
				<div style={{position: 'relative'}}>
					<h4 style={{textAlign: 'center'}}>{this.props.data.title}</h4>
					<div style={{textAlign: 'center', fontStyle: 'italic'}}>Composer: {this.props.data.composer}</div>
					<img src={'media/'+this.props.data.thumbnail_file} className="thumbnail_pic" />
				</div>
			</div>
			);
	}
});

module.exports = FileThumbnail;