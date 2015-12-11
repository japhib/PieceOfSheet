'use strict';

var React  = require('react');

var CommentBox = require('./CommentBox');
var BrowseHeader = require('./BrowseHeader');
var $ = require('jquery');

var View = React.createClass({
    componentWillMount:function() {
        this.data = JSON.parse(localStorage.getItem("data"))
        localStorage.removeItem("data")
        console.log(this.data)
    },

    handleCommentSubmit: function(e){
        e.preventDefault();
    },
    handleClick: function(){
        var contents = $('.upload-form').serializeArray();
        contents.push({name:'id', value:this.data._id});
        var newComments = this.refs.inputText.getDOMNode().value;
        contents.push({name:'comments', value:newComments});
        $.ajax({
            url: '/comment',
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
        alert("Your comment has been added. You can see it next time you come to this page.");
    },

    render: function() {
        return(
            <div className="welcome">
                <h1>Title: {this.data.title}</h1>
                <h3>Composer: {this.data.composer}</h3>
                <h5>Uploaded By: {this.data.uploader}</h5>
                <form className='upload-form' action="/upload" method="POST" encType="multipart/form-data" onSubmit={this.onSubmit}>
                  <button type='submit' className='btn btn-default'>Favorite This</button>
                </form>
                <div className='spacerview' />
                <iframe src={"media/" + this.data.filename} width="650" height="700"></iframe>
                <br><a href={"media/" + this.data.filename}>Download</a></br>
                <h4>Description:</h4>
                <h5>{this.data.description}</h5>
                <h4>Comments:</h4>
                <tbody>
                    {this.data.comments.map(function(object, i){
                        return <h5><td key={i}>{object}</td></h5>;
                    })}
                </tbody>
                <div>
                    <td>Add your own comment:</td>
                    <form onSubmit={this.handleCommentSubmit}>
                        <textarea ref="inputText" />
                        <input type="submit" onClick={this.handleClick.bind(this)} value="Submit" />
                    </form>
                </div>
            </div>
        )
    }
});

module.exports = View;
