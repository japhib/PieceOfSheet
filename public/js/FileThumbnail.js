'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var History = ReactRouter.History;
var Link = ReactRouter.Link;

var FileThumbnail = React.createClass({displayName: "FileThumbnail",
        mixins: [ History ],
        handleClick:function() {
            localStorage.setItem("data", JSON.stringify(this.props.data))
            this.history.push({
                pathname: '/view',
                state: { data: 'THIS IS A TEST' }
            })
        },
		render: function() {
            if (!this.props.data.filename.endsWith('.pdf')){
			return (
                <div onClick={this.handleClick}>
                    <div style={{float: 'left'}} className="col-md-3 hoverable">
                         <div style={{position: 'relative'}}>
                            <h4 style={{textAlign: 'center'}}> Title: {this.props.data.title}</h4>
                            <div style={{textAlign: 'center', fontStyle: 'italic'}}> Composer: {this.props.data.composer}</div>
                            <img src={"media/"+this.props.data.filename} className="thumbnail_pic" />
                         </div>
                     </div>
                </div>
			);
            }
            else {
                return (
                    <div onClick={this.handleClick}>
                        <div style={{float: 'left'}} className="col-md-3 hoverable">
                            <div style={{position: 'relative'}}>
                                <h4 style={{textAlign: 'center'}}> Title: {this.props.data.title}</h4>
                                <div style={{textAlign: 'center', fontStyle: 'italic'}}> Composer: {this.props.data.composer}</div>
                                <img src={"media/"+this.props.data.thumbnail_file} className="thumbnail_pic" />
                            </div>
                        </div>
                    </div>
			    );
            }
		}
	});
module.exports = FileThumbnail;
