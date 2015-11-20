var React = require('react')
var ReactDOM = require('react-dom');

var Navbar = require('./Navbar');
var BrowseHeader = require('./BrowseHeader');
var Browse = require('./Browse');
var Footer = require('./Footer');

var Files = [
{
    title: 'Aria in F major, BWV 587',
    composer: 'Johann Sebastian Bach',
    filename: 'Bach_-_BGA_-_BWV_587.pdf',
    description: 'An aria written in the glorious key of F major!',
    comments: [
    {
        name: 'jbergeson',
        text: 'this is a first comment'
    },
    {
        name: 'sebrantley',
        text: 'I think this comment is the second.'
    }
    ]
},
];

var headerProps = {
    numFiles: Files.length
};


// The component to be rendered
var App = React.createClass({
    handleServerChange: function (newNumber) {
        console.log(`Wow, looked like the number changed to ${newNumber}!`)
    },

    render: function() {
        return (
            <div>
                <Navbar />
                <BrowseHeader headerProps={headerProps} />
                <Browse files={Files} />
                <Footer />
            </div>
            );
    }
})

debugger;

// Only needs to be called once.
ReactDOM.render(<App />, document.querySelector('.app-container'))