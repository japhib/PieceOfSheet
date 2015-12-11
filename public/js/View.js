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
                    <iframe src={"media/" + this.data.filename} width="650" height="700"></iframe>
            </div>
        )
    }
});

module.exports = View;
