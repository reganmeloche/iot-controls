import React, { Component } from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

import { connect } from 'react-redux';
import { control } from '../actions/index';

class MotionControl extends Component {
    constructor(props) {
        super(props);
        this.applyControl = this.applyControl.bind(this);
    }

    applyControl(dir) {
        this.props.control(dir);
    }

  render() {
    return (
        <div>
            <Row className="show-grid">
                <Col xs={4} xsOffset={4}>
                <Button onClick={this.applyControl.bind(this,'f')}>
                    <Glyphicon glyph="glyphicon glyphicon-arrow-up" />
                </Button>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={4} xsOffset={4}>
                    <Button className="pull-left" onClick={this.applyControl.bind(this,'l')}>
                        <Glyphicon glyph="glyphicon glyphicon-arrow-left" />
                    </Button>
                    <Button className="pull-right" onClick={this.applyControl.bind(this,'r')}>
                        <Glyphicon glyph="glyphicon glyphicon-arrow-right" />
                    </Button>
                </Col>
            </Row>
            <Row className="show-grid">
                <Col xs={4} xsOffset={4}>
                    <Button onClick={this.applyControl.bind(this,'b')}>
                        <Glyphicon glyph="glyphicon glyphicon-arrow-down" />
                    </Button>
                </Col>
            </Row>
        </div>
    );
  }
}

export default connect(null, { control })(MotionControl);

