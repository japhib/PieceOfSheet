var React = require('react')
var ReactDOM = require('react-dom');

// Routing stuff
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;

var Auth = require('./Auth');

// Import my other source files
var Navbar = require('./Navbar');
var BrowseHeader = require('./BrowseHeader');
var Browse = require('./Browse');
var Footer = require('./Footer');
var RegisterPanel = require('./RegisterPanel');
var Upload = require('./Upload');
var View = require('./View');


var BrowsePage = React.createClass({
    render: function() {
        return (
            <Browse source="/all-uploads" title="Browse all uploads" />
            );
    }
});

var Favorites = React.createClass({
    render: function() {
        return (
            <div>
                <Browse source="/favorites" title="Favorites" />
            </div>
            );
    }
});

var MyUploads = React.createClass({
    render: function() {
        return (
            <div>
                <Browse source="/my-uploads" title="My Uploads" />
            </div>
            );
    }
});

var Home = React.createClass({
    getInitialState: function() {
      return ({
        loggedIn: Auth.loggedIn()
      });
    },

    onLoginChange: function(status) {
      this.setState({
        loggedIn: status
      });
      // console.log(typeof this.props.onLoginChange)
      // this.props.onLoginChange(status);
    },

    getLoginStatus: function() {
      return Auth.loggedIn();
    },

    render: function() {
      console.log('rendering home..')
      if(!this.getLoginStatus())
      {
        return (
        <div class="row">
          <div className="col-xs-12 col-sm-6 col-lg-8 welcome">
            <div className='welcome'>
            <h1>Welcome to Piece of Sheet!</h1>
            <h3> Your new home for sheet music.</h3>
            <div className='spacermid-loggedout' />
            <Link to="/browse">Browse</Link><br />
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
            <div className='spacermid' />
            <Link to="/browse">Browse</Link><br />
            <Link to="/favorites">Favorites</Link><br />
            <Link to="/my-uploads">My Uploads</Link><br />
            <Link to="/upload">Upload Music</Link><br />
            <Link to="/view">View</Link><br />
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
        loggedIn: Auth.loggedIn()
      });
    },

    onLoginChange: function(status) {
      this.setState({
        loggedIn: status
      });
      this.loggedIn = status;
    },

    renderChildren: function() {

      for(var i = 0; i < 1; i++)
      {
        console.log(this.props.children);
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
          <Route path="view" component={View} />
          <IndexRoute component={Home} />
        </Route>
    </Router>
    , document.querySelector('.app-container')
);
