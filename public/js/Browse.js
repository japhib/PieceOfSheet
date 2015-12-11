'use strict';

var React  = require('react');
var $ = require('jquery');

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
      $.ajax({
        url: this.props.source,
        dataType: 'json',
        type: 'POST',
        data: {
          username: this.props.user
        },
        success: function(data) {
          if(this.isMounted() ) {
            this.setState( {files:data} )
          }
        }.bind(this)
      });
  },

    render: function() {
      console.log('files');
      console.log(this.state.files);
        var source = this.props.source;
        var content = this.state.files.map( function( file ) {

          if(source !== '/favorites')
          {
            return (
          		<FileThumbnail data={file} />
          		);
          }
          else
          {
            return (
              <FileThumbnail data={JSON.parse(file)} />
              );
          }
        });
        return (
        	<div>
        		<BrowseHeader numFiles={this.state.files.length} title={this.props.title} />
                {content}
        	</div>
        	);
    }
});

module.exports = Browse;
