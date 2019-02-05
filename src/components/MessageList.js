import React, { Component } from "react";

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
      <React.Fragment>
        <div className="activeRoom">Active Room: {this.props.activeRoom}</div>
        {this.state.messages
          .filter(message => {
            return message.roomId === this.props.activeRoomId;
          })
          .map((message, i) => (
            <div>
              <p key={i}>Message content: {message.content}</p>
              <p key={i}>Username: {message.username}</p>
              <p key={i}>Sent at: {message.sentAt}</p>
            </div>
          ))}
        ;
      </React.Fragment>
    );
  }
}

export default MessageList;
