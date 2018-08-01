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
        const status = this.props.light.status;

        return (
            <div>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} xs={3} xsOffset={2}>
                            Toggle light:
                        </Col>
                        <Col xs={4} >
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
  
