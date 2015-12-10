'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var $ = require('jquery');

var Upload = React.createClass({
	fileChosen: function() {
		console.log('here');
		var filename = $('.upload-form input[type=file]').val().split('\\').pop();
		$('.upload-form .filename').html( filename );
		console.log( filename );
	},

	submit: function(e) {
		e.preventDefault();
		var form_data = $('.upload-form').serializeArray();
		// form_data['token'] = lStorage.token;
		
	},

	render: function() {
		return (
			<div>
				<h1>Upload new music</h1>
				<form className='upload-form' onSubmit={this.submit}>
					<table>
						<tr>
							<td>Title:</td><td><input type="text" /></td>
						</tr>
						<tr>
							<td>Composer:</td><td><input type="text" /></td>
						</tr>
						<tr>
							<td>File:</td>
							<td>
								<span className="btn btn-default btn-file">
									Select File <input type="file" onChange={this.fileChosen} />
								</span>
								<span className="filename" />
							</td>
						</tr>
						<tr>
							<td>Description:</td><td><textarea /></td>
						</tr>
						<tr>
							<td />
							<td><input type="submit" value="Upload!" className='btn btn-primary' /></td>
						</tr>
					</table>
				</form>
			</div>
			);
	}
});

module.exports = Upload;