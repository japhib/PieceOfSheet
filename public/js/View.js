'use strict';

var React  = require('react');

var CommentBox = require('./CommentBox');
var BrowseHeader = require('./BrowseHeader');

var View = React.createClass({
    componentWillMount:function() {
        this.data = JSON.parse(localStorage.getItem("data"))
        localStorage.removeItem("data")
        console.log(this.data)
    },

    render: function() {
        return(
            <div className="welcome">
                <h1>Title: {this.data.title}</h1>
                <h3>Composer: {this.data.composer}</h3>
                <form className='upload-form' action="/upload" method="POST" encType="multipart/form-data" onSubmit={this.onSubmit}>
                  <button type='submit' className='btn btn-default'>Favorite This</button>
                </form>
                <div className='spacerview' />
                <iframe src={"media/" + this.data.filename} width="650" height="700"></iframe>
                <a href={"media/" + this.data.filename}>Download</a>
                <h4>Description:</h4>
                <h5>this.data.description</h5>
            </div>
        )
    }
});

module.exports = View;
