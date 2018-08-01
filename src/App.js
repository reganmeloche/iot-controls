import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import { init } from './actions/index';

import MyNavbar from './components/navbar';
import Dashboard from './components/dashboard';

class App extends Component {
  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div className="App">
        <MyNavbar/>
        <div>
          <Dashboard/>
        </div>
      </div>
    );
  }
}

export default connect(null, { init })(App);

