import React, { Component } from 'react';
import { Row, ControlLabel, Col, Button, Glyphicon } from 'react-bootstrap';

export default class TempReader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <Row>
                <Col xs={4} xsOffset={2}>
                    <ControlLabel>
                        Temperature (C):
                    </ControlLabel>
                </Col>
                <Col xs={2}>
                    [Reading]
                </Col>
                <Col xs={2}>
                    <a href="#">
                        <Glyphicon glyph="glyphicon glyphicon-refresh" />
                    </a>
                </Col>
            </Row>
            <Row>
                <Col xs={4} xsOffset={2}>
                    <ControlLabel>
                        Last reading:
                    </ControlLabel>
                </Col>
                <Col xs={2}>
                    [Date]
                </Col>
            </Row>
        </div>
    );
  }
}

