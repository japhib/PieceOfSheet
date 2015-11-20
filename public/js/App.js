var React = require('react')
var ReactDOM = require('react-dom');

var Navbar = require('./Navbar');
var Header = require('./Header');
var Browse = require('./Browse');
var Footer = require('./Footer');

// The component to be rendered
var App = React.createClass({
    handleServerChange: function (newNumber) {
        console.log(`Wow, looked like the number changed to ${newNumber}!`)
    },

    render: function() {
        return (
            <div>
                <Navbar />
                <Header />
                <Browse />
                <Footer />
            </div>
            );
    }

    // render: function() {
    //     return (<div>
    //         <FancyComponent name="fancy #1"/>
    //         <FancyComponent name="fancy #2" fancyColor="green"/>
    //         <RandomNumber />
    //         <ServerInteractionComponent onChange={this.handleServerChange} />
    //     </div>)
    // }
})

debugger;

// Only needs to be called once.
ReactDOM.render(<App />, document.querySelector('.app-container'))