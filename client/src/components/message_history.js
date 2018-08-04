import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchMessages } from '../actions/index';
import moment from 'moment';

class MessageHistory extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMessages(); 
  }

  render() {
    let messageList = this.props.messageHistory.map((x, i) => {
      return (
        <ListGroupItem key={i}>
          <span className="pull-left">
            {moment(x.date).format('MMM Do YYYY, h:mm:ss a')}
          </span>
          <span>
            {x.text}
          </span>
          
        </ListGroupItem>
      );
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

export default connect(mapStateToProps, { fetchMessages })(MessageHistory);

