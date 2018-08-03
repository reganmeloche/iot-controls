import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import MotionControl from './motion_control';
import LightControl from './light_control';
import TempReader from './temp_reader';
import MessageBox from './message_box';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Grid>
            <Row className="show-grid">
            <Col md={6}>
                <div className="control_area">
                    <MotionControl />
                </div>
                <br/>
                <div className="control_area">
                    <LightControl />
                </div>
                <br/>
                <div className="control_area">
                    <TempReader />
                </div>
            </Col>
            <Col md={6}>
                <div className="control_area">
                    <MessageBox />
                </div>
            </Col>
            </Row>
        </Grid>
    );
  }
}
