import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import MotionControl from './motion_control';
import LightControl from './light_control';
import TempReader from './temp_reader';
import MessageBox from './message_box';
import StatusCheck from './status_check';

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
                    <StatusCheck />
                    <div className="control_divider"/>
                    <MotionControl />
                    <div className="control_divider"/>
                    <LightControl />
                    <div className="control_divider"/>
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
