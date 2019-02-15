import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  };

  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  };

  signOut = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    return (
      <div className="container">
        <h6>Current User: {this.props.user}</h6>
        <button type="submit" onClick={this.signInWithPopup}>
          Log In
        </button>
        <button type="submit" onClick={this.signOut}>
          Log Out
        </button>
      </div>
    );
  }
}
export default User;
