import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    //initializing state
    this.state = {
      messages: [],
      newMessageContent: null
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  createMessage(newMessage) {
    this.messagesRef.push({
      username: this.props.user ? this.props.user : "Guest",
      content: this.state.newMessageContent,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoomId
    });

    this.setState({ newMessageContent: "" });
  }

  handleChange(e) {
    this.setState({ newMessageContent: e.target.value });
  }

  render() {
    const activeRoomId = this.props.activeRoomId;

    return (
      <div className="message-list">
        <h3>Active Room: {this.props.activeRoom}</h3>
        {this.state.messages
          .filter(message => {
            return message.roomId === activeRoomId;
          })
          .map((message, i) => (
            <ul key={i} className="message-content">
              <li>Username: {message.username}</li>
              <li>Message: {message.content}</li>
              <li>Sent at: {message.sentAt}</li>
            </ul>
          ))}
        <div className="messageText">
          <h4>Create Message</h4>
          <form
            value={this.state.newMessageContent}
            id="messageText"
            onSubmit={e => {
              e.preventDefault();
              this.createMessage(this.state.newMessageContent);
            }}
          >
            <input
              type="text"
              id="roomName"
              value={this.state.newMessageContent}
              onChange={e => this.handleChange(e)}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
