import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessageContent: ""
    };

    this.messagesRef = this.props.firebase.database().ref("Messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  handleChange(e) {
    this.setState({ newMessageContent: e.target.value });
  }

  render() {
    const activeRoomId = this.props.activeRoomId;
    return (
      <Container>
        <div className="row">Active Room: {this.props.activeRoom}</div>
        {this.state.messages
          .filter(message => {
            return message.roomId === activeRoomId;
          })
          .map((message, i) => (
            <div className="message-content">
              <p key={i}>Username: {message.username}</p>
              <p key={i}>Message: {message.content}</p>

              <p key={i}>Sent at: {message.sentAt}</p>
            </div>
          ))}
      </Container>
    );
  }
}

export default MessageList;
