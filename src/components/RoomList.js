import React, { Component } from "react";
import { Container } from "reactstrap";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRooms(newRoomName) {
    this.roomsRef.push({
      name: newRoomName
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <Container>
        <h3 className="">Create A Room</h3>

        <div className="form">
          <form
            className="form-group"
            onSubmit={e => {
              e.preventDefault();
              this.createRooms(this.state.newRoomName);
            }}
          >
            <label htmlFor="roomName" />
            <input
              placeholder="Enter text"
              type="text"
              id="roomName"
              value={this.state.newRoomName}
              onChange={e => this.handleChange(e)}
            />
            <input className="btn-md btn-primary" type="submit" />

            <div className="roomsList">
              <h4 className="text-primary">Available Chat Rooms</h4>

              {this.state.rooms.map((room, i) => (
                <a key={i} onClick={() => this.props.setActiveRoom(room)}>
                  <li>{room.name}</li>
                </a>
              ))}
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

export default RoomList;
