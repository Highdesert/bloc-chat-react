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

  const;

  render() {
    return (
      <div className="container">
        <h6>You are currently logged in as: {this.props.user}</h6>
        <button
          className="btn btn-sm"
          type="submit"
          onClick={this.signInWithPopup}
        >
          Log In
        </button>
        <button className="btn btn-sm" type="submit" onClick={this.signOut}>
          Log Out
        </button>
      </div>
    );
  }
}
export default User;
