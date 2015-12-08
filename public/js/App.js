var React = require('react')
var ReactDOM = require('react-dom');

// Routing stuff
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;

// Import my other source files
var Navbar = require('./Navbar');
var BrowseHeader = require('./BrowseHeader');
var Browse = require('./Browse');
var Footer = require('./Footer');
var RegisterPanel = require('./RegisterPanel');

var Files = [
{
    title: 'Aria in F major, BWV 587',
    composer: 'Johann Sebastian Bach',
    filename: 'Bach_-_BGA_-_BWV_587.pdf',
    thumbnail_file: 'Bach_-_BGA_-_BWV_587.pdf_p0001.jpeg',
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
{
    title: 'Aria in G minor, BWV 588',
    composer: 'Johannes Sebastianes Baches',
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
}
];

var headerProps = {
    numFiles: Files.length
};


var BrowsePage = React.createClass({
    render: function() {
        return (
            <div>
                <BrowseHeader numFiles={Files.length} title="Browse all uploads" />
                <Browse files={Files} />
            </div>
            );
    }
});

var Favorites = React.createClass({
    render: function() {
        return (
            <div>
                <BrowseHeader numFiles={Files.length} title="Favorites" />
                <Browse files={Files} />
            </div>
            );
    }
});

var MyUploads = React.createClass({
    render: function() {
        return (
            <div>
                <BrowseHeader numFiles={Files.length} title="My Uploads" />
                <Browse files={Files} />
            </div>
            );
    }
});

var Home = React.createClass({
    render: function() {
        return (
        <div class="row">
          <div className="col-xs-12 col-sm-6 col-lg-8 welcome">
            <h3>Hello, World!</h3>
            <Link to="/browse">Browse</Link><br />
            <Link to="/favorites">Favorites</Link><br />
            <Link to="/uploads">My Uploads</Link><br />
          </div>
          <div className="col-xs-6 col-lg-4 welcome"><RegisterPanel /></div>

        </div>
            );
    }
})


// The component to be rendered
var App = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar />
                {this.props.children}
                <Footer />
            </div>
            );
    }
})

debugger;

// Only needs to be called once.
ReactDOM.render(
    <Router>
        <Route path="/" component={App}>
          <Route path="browse" component={BrowsePage} />
          <Route path="uploads" component={MyUploads} />
          <Route path="favorites" component={Favorites} />
          <IndexRoute component={Home} />
        </Route>
    </Router>
    , document.querySelector('.app-container')
);
