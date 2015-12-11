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
            <div className="col-xs-12 col-sm-6 col-lg-8 musicInfo">
                <div className='musicData'>
                <h1>Title: {this.data.title}</h1>
                <h3>Composer: {this.data.composer}</h3>
                    <iframe id="iframe" src={"media/" + this.data.filename}></iframe>
                </div>
            </div>
        )
    }
});

module.exports = View;
