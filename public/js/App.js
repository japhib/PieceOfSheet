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
var Upload = require('./Upload');


var BrowsePage = React.createClass({
    render: function() {
        return (
            <Browse />
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
    getInitialState: function() {
      return ({
        loggedIn: this.props.loggedIn
      });
    },

    onLoginChange: function(status) {
      this.setState({
        loggedIn: status
      });
      this.props.onLoginChange(status);
    },

    render: function() {
      if(!this.state.loggedIn)
      {
        return (
        <div class="row">
          <div className="col-xs-12 col-sm-6 col-lg-8 welcome">
            <div className='welcome'>
            <h1>Welcome to Piece of Sheet!</h1>
            <h3> Your new home for sheet music.</h3>
            <Link to="/browse">Browse</Link><br />
            <Link to="/favorites">Favorites</Link><br />
            <Link to="/my-uploads">My Uploads</Link><br />
            <Link to="/upload">Upload Music</Link><br />
            </div>
          </div>
          <div className="col-xs-6 col-lg-4 welcome"><RegisterPanel onLoginChange={this.onLoginChange} /></div>

        </div>
        );
      }
      else
      {
        return (
          <div className="welcome">
            <h1>Welcome to Piece of Sheet!</h1>
            <h3> Your new home for sheet music.</h3>
            <Link to="/browse">Browse</Link><br />
            <Link to="/favorites">Favorites</Link><br />
            <Link to="/my-uploads">My Uploads</Link><br />
            <Link to="/upload">Upload Music</Link><br />
          </div>
        );
      }
    }
})


// The component to be rendered
var App = React.createClass({
    loggedIn: false,

    getInitialState: function() {
      return ({
        loggedIn: false
      });
    },

    onLoginChange: function(status) {
      this.setState({
        loggedIn: status
      });
      this.loggedIn = status;
    },

    renderChildren: function() {

      for(i = 0; i < this.props.children.length; i++)
      {
        console.log(this.props.children[i].typeof);
      }
      return React.Children.map(this.props.children, function(child) {
        if(child.type === Home.type)
        {
          return React.cloneElement(child, {loggedIn: this.loggedIn, onLoginChange: this.onLoginChange});
        }
        else {
          return child
        }
      }.bind(this));
    },

    render: function() {
        return (
            <div>
                <Navbar loggedIn={this.state.loggedIn} onLoginChange={this.onLoginChange} />
                {this.renderChildren()}
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
          <Route path="my-uploads" component={MyUploads} />
          <Route path="favorites" component={Favorites} />
          <Route path="upload" component={Upload} />
          <IndexRoute component={Home} />
        </Route>
    </Router>
    , document.querySelector('.app-container')
);
