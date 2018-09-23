import React, { Component } from 'react';
import { Form, FormGroup, Radio, ControlLabel, Col } from 'react-bootstrap';

import { connect } from 'react-redux';
import { toggleLight, readLight } from '../actions/index';

class LightControl extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.props.readLight();
    }
    
    toggle(val) {
        this.props.toggleLight(val);
    }

    render() {
        let status = false;
        if (this.props.light) {
            status = this.props.light.status;
        }

        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col xs={4} xsOffset={2}>
                            <ControlLabel className="pull-right">
                                Toggle Light:
                            </ControlLabel>
                        </Col>

                        <Col xs={4}>
                            <span className="pull-left">
                                <Radio 
                                    name="radioGroup" 
                                    checked={status}
                                    onChange={this.toggle.bind(this, true)}
                                    inline
                                >
                                    On
                                </Radio>{' '}
                                <Radio 
                                    name="radioGroup" 
                                    checked={!status} 
                                    onChange={this.toggle.bind(this, false)}
                                    inline
                                >
                                    Off
                                </Radio>{' '}
                            </span>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      light: state.light,
    };
  }
  
  export default connect(mapStateToProps, { toggleLight, readLight })(LightControl);
  
