import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class MyNavbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <div>IoT Controls</div>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
    );
  }
}

