import React, { Component } from 'react';

import MessageForm from './message_form';
import MessageHistory from './message_history';

export default class MessageBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <MessageForm/>
            <MessageHistory/>
        </div>
    );
  }
}

