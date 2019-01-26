import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'; 
import RoomList from './components/RoomList.js';
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
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
