import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{ username: "", content: "", sentAt: "", roomId: "" }]
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

  render() {
    return (
      <section className="messageList">
        {this.state.messages
          .filter(message => message.roomId === this.props.activeRoom.key)
          .map((messages, index) => (
            <section key={index}>
              <div>{messages.username}</div>
              <div>{messages.content}</div>
              <div>{messages.sentAt}</div>
            </section>
          ))}
      </section>
    );
  }
}
export default MessageList;
