'use strict';

var React  = require('react');
var ReactRouter = require('react-router');
var Auth = require('./Auth');

var RegisterPanel = React.createClass({
  getInitialState: function() {
    return {
      error: false
    };
  },

  register: function() {
    var username = this.refs.username.value;
    var password = this.refs.password.value;

    if(this.refs.password.value !== this.refs.password_two.value)
    {
      this.setState({
        error: true,
        message: 'password must match'
      });
      return;
    }
    Auth.register(username, password, function(registered) {
      if(registered)
      {
        this.setState({
          error: false,
          registered: true
        });
        Auth.login(username, password, function(loggedIn) {
          if(loggedIn)
          {
            this.setState({
              error: false,
              loggedIn: true
            });
          }
          else
          {
            this.setState({
              error: true
            });
          }
        }.bind(this));
      }
      else
      {
        this.setState({
          error: true,
          message: 'Failed to Register.'
        });
      }
    }.bind(this));
  },

  render: function() {
    if(!this.state.loggedIn)
    {
      return (
        <div className='welcome'>
          <h1>Register</h1>
          <form onSubmit={this.register}>
            <div className='form-group'>
              <input type='text' ref='username' className='form-control input-md' placeholder='Username'></input>
              <input type='password' ref='password' className='form-control input-md' placeholder='Password'></input>
              <input type='password' ref='password_two' className='form-control input-md' placeholder='Repeat Password'></input>
            </div>
            <button type='submit' className='btn btn-default'>Register</button>
          </form>
        </div>
      );
    }
    else {
      return (
        <div />
      );
    }
  },
});

module.exports = RegisterPanel;
