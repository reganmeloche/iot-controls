import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

class MessageHistory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let messageList = this.props.messageHistory.map((x, i) => {
      return (<ListGroupItem key={i}>{x.text}</ListGroupItem>);
    });
    
    return (
        <div className="message_history">
            <ListGroup>
                {messageList}
            </ListGroup>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messageHistory: state.messages,
  };
}

export default connect(mapStateToProps, null)(MessageHistory);

