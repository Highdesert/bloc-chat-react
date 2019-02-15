import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";
import "bootstrap/dist/css/bootstrap.min.css";

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
      activeRoomId: "",
      currentUser: "Guest"
    };
  }

  setActiveRoom = selectedRoom => {
    this.setState({ activeRoom: selectedRoom.name });
    this.setState({ activeRoomId: selectedRoom.key });
  };

  setUser = user => {
    this.setState({ currentUser: user ? user.displayName : "Guest" });
  };

  render() {
    return (
      <div className="App">
        <div className="display-4 text-center 1.5rem bg-info" id="header">
          <header>Bloc Chat</header>
        </div>

        <User
          firebase={firebase}
          setUser={this.setUser.bind(this)}
          user={this.state.currentUser}
        />

        <div className="container">
          <div className="row">
            <div className="col-md">
              <RoomList
                setActiveRoom={this.setActiveRoom.bind(this)}
                firebase={firebase}
              />
            </div>

            <div className="col-md">
              <div className="messageList">
                <MessageList
                  activeRoom={this.state.activeRoom}
                  activeRoomId={this.state.activeRoomId}
                  firebase={firebase}
                  user={this.state.currentUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
