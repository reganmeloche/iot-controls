import React, { Component } from 'react';
import { Row, ControlLabel, Col, Glyphicon } from 'react-bootstrap';

import { connect } from 'react-redux';
import { checkStatus } from '../actions/index';

class StatusCheck extends Component {
    constructor(props) {
        super(props);
        this.getStatus = this.getStatus.bind(this);
    }

    componentDidMount() {
        this.props.checkStatus();
    }
    
    getStatus() {
        this.props.checkStatus();
    }

    render() {
        let statusValue = 'Inactive';
        let statusDate = 'unknown';

        if (this.props.status) {
            statusValue = this.props.status.value ? "Active" : "Inactive";
            statusDate = this.props.status.date;
        }

        return (
            <div>
                <Row>
                    <Col xs={4} xsOffset={2}>
                        <ControlLabel className="pull-right">
                            Device Status:
                        </ControlLabel>
                    </Col>
                    <Col xs={2}>
                        <span className="pull-left">
                            {statusValue}
                        </span>
                    </Col>
                    <Col xs={2}>
                        <a href="#" onClick={this.getStatus}>
                            <Glyphicon glyph="glyphicon glyphicon-refresh" />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} xsOffset={2}>
                        <ControlLabel className="pull-right">
                            Last check:
                        </ControlLabel>
                    </Col>
                    <Col xs={6}>
                        <span className="pull-left">
                            {statusDate}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      status: state.status,
    };
}
  
export default connect(mapStateToProps, { checkStatus })(StatusCheck);


