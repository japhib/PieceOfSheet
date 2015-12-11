'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Redirect = ReactRouter.Redirect;
var Auth = require('./Auth');
var $ = require('jquery');

var Upload = React.createClass({
	mixins: [ History ],
	getInitialState: function() {
		return {
			data_uri: null,
			submitted: false,
			error: null
		};
	},
	fileChosen: function(e) {
		var filename = $('.upload-form input[type=file]').val().split('\\').pop();
		$('.upload-form .filename').html( filename );

		// Read file so we can upload it via ajax
		var self = this;
		var reader = new FileReader();
		var file = e.target.files[0];

		reader.onload = function(upload) {
			self.setState({
				data_uri : upload.target.result
			});
			// console.log( this.state.data_uri );
		}.bind(this);

		reader.readAsDataURL(file);
	},
	onSubmit: function(e) {
		e.preventDefault();
		var username = Auth.getName();
		console.log('\nuser ' + Auth.getName() + '\n');
		var filename = $('.upload-form input[type=file]').val().split('\\').pop();
		var contents = $('.upload-form').serializeArray();
		contents.push({name:'file', value:this.state.data_uri});
		contents.push({name:'filename_end', value:filename});
		contents.push({name:'uploader', value: username});

		// submit the file
		$.ajax({
			url: '/upload',
			data: contents,
			dataType: 'json',
			type: 'POST',
			success: function(res) {
				console.log(res);
				if ( res == 'success' ) {
					console.log('pushing history');
					this.history.pushState(null, '/browse');
				}
			}.bind(this),
			error: function(xhr, status, err) {
				console.log('error');
				console.log(err);
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div>
				<h1>Upload new music</h1>
				<form className='upload-form' action="/upload" method="POST" encType="multipart/form-data" onSubmit={this.onSubmit}>
					<table><tbody>
						<tr>
							<td>Title:</td><td><input type="text" name="title" ref="title" /></td>
						</tr>
						<tr>
							<td>Composer:</td><td><input type="text" name="composer" ref="composer" /></td>
						</tr>
						<tr>
							<td>File:</td>
							<td>
								<span className="btn btn-default btn-file">
									Select File <input type="file" onChange={this.fileChosen} name="file" />
								</span>
								<span className="filename" />
							</td>
						</tr>
						<tr>
							<td>Description:</td><td><textarea name="description" /></td>
						</tr>
						<tr>
							<td />
							<td><input type="submit" value="Upload!" className='btn btn-primary' /></td>
						</tr>
					</tbody></table>
					{ localStorage.token ? ( <input type="hidden" name="token" value={localStorage.token} /> ) : null }
				</form>
			</div>
			);
	}
});

module.exports = Upload;
