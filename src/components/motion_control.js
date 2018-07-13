import React, { Component } from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

export default class MotionControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <Row className="show-grid">
                <Col xs={4} xsOffset={4}>
                <Button>
                    <Glyphicon glyph="glyphicon glyphicon-arrow-up" />
                </Button>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={4} xsOffset={4}>
                    <Button className="pull-left">
                        <Glyphicon glyph="glyphicon glyphicon-arrow-left" />
                    </Button>
                    <Button className="pull-right">
                        <Glyphicon glyph="glyphicon glyphicon-arrow-right" />
                    </Button>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={4} xsOffset={4}>
                    <Button>
                        <Glyphicon glyph="glyphicon glyphicon-arrow-down" />
                    </Button>
                </Col>
            </Row>
        </div>
    );
  }
}

