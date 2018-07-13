import React, { Component } from 'react';

import { Form, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';


export default class MessageBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <form>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon>Message</InputGroup.Addon>
                        <FormControl type="text" />
                        <InputGroup.Button>
                            <Button type="submit">Send</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
          </form>
        </div>
    );
  }
}

