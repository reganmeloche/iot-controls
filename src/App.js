import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MyNavbar from './components/navbar';
import Dashboard from './components/dashboard';

class App extends Component {
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

export default App;
