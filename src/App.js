import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDajPRTcM4OSBvbfTD25VLaj7xqORJCLLU",
  authDomain: "bloc-chat-d8374.firebaseapp.com",
  databaseURL: "https://bloc-chat-d8374.firebaseio.com",
  projectId: "bloc-chat-d8374",
  storageBucket: "bloc-chat-d8374.appspot.com",
  messagingSenderId: "430560309092"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      activeRoomId: ""
    };
  }

  setActiveRoom = selectedRoom => {
    this.setState({ activeRoom: selectedRoom.name });
    this.setState({ activeRoomId: selectedRoom.key });
  };
  render() {
    return (
      <div className="App">
        <div className="header">
          <header>Bloc Chat</header>
        </div>
        <div className="roomList">
          <RoomList
            setActiveRoom={this.setActiveRoom.bind(this)}
            firebase={firebase}
          />
        </div>
        <div className="container">
          <div className="messageList">
            <MessageList
              activeRoom={this.state.activeRoom}
              activeRoomId={this.state.activeRoomId}
              firebase={firebase}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
