import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { sendMessage } from '../actions/index';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.submitMessage = this.submitMessage.bind(this);
  }

  submitMessage() {
    const value = { text: this.refs.message_text.value };
    this.props.sendMessage(value);
  }

  render() {
    return (
        <div>
            <Form>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>Message</InputGroup.Addon>
                        <input className="form-control" type="text" ref="message_text"/>
                        <InputGroup.Button>
                            <Button type="submit" onClick={this.submitMessage}>Send</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
          </Form>
        </div>
    );
  }
}


export default connect(null, { sendMessage })(MessageForm);

