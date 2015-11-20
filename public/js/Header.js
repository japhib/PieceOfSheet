'use strict';

var React  = require('react');

var Header = React.createClass({
    getDefaultProps: function(){
        return {
            fancyColor: "white",
            name: "no name defined"
        }
    },

    render: function() {
        return (
            <div>
                <h1>Header</h1>
            </div>
            );
        // // You can keep your styles here instead of in a CSS sheet - nice to bundle
        // // HTML, CSS, and JS in one file for each component.
        // var containerStyle = {
        //     backgroundColor: this.props.fancyColor
        // }

        // return (
        //     <div className="col-md-6 btn" style={containerStyle}>
        //         I am a fancy component. My name is {this.props.name}.
        //     </div>

        // );
    }
});

module.exports = Header;