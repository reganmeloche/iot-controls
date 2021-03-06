import React, { Component } from 'react';
import { Row, ControlLabel, Col, Glyphicon } from 'react-bootstrap';

import { connect } from 'react-redux';
import { readTemp } from '../actions/index';

class TempReader extends Component {
    constructor(props) {
        super(props);
        this.getTemp = this.getTemp.bind(this);
    }

    componentDidMount() {
        this.props.readTemp();
    }
    
    getTemp() {
        this.props.readTemp();
    }

    render() {

        let tempValue = 'unknown';
        let tempDate = 'unknown';

        if (this.props.temperature) {
            tempValue = this.props.temperature.value;
            tempDate = this.props.temperature.date;
        }

        return (
            <div>
                <Row>
                    <Col xs={4} xsOffset={2}>
                        <ControlLabel className="pull-right">
                            Temperature (C):
                        </ControlLabel>
                    </Col>
                    <Col xs={2}>
                        <span className="pull-left">
                            {tempValue}
                        </span>
                    </Col>
                    <Col xs={2}>
                        <a href="#" onClick={this.getTemp}>
                            <Glyphicon glyph="glyphicon glyphicon-refresh" />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} xsOffset={2}>
                        <ControlLabel className="pull-right">
                            Last reading:
                        </ControlLabel>
                    </Col>
                    <Col xs={6}>
                        <span className="pull-left">
                            {tempDate}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      temperature: state.temperature,
    };
}
  
export default connect(mapStateToProps, { readTemp })(TempReader);


