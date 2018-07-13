import React, { Component } from 'react';
import { Form, FormGroup, Radio, ControlLabel, Col } from 'react-bootstrap';

export default class LightControl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <Form horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} xs={3} xsOffset={2}>
                        Light Colour:
                    </Col>
                    <Col xs={5} >
                        <Radio name="radioGroup" inline>
                            Red
                        </Radio>{' '}
                        <Radio name="radioGroup" inline>
                            Green
                        </Radio>{' '}
                        <Radio name="radioGroup" inline>
                            Blue
                        </Radio>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    );
  }
}

