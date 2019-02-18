import React, { Component } from "react";
import { Container } from "reactstrap";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: "",
      roomId: ""
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

  createRooms(e, newRoomName) {
    e.preventDefault();
    this.roomsRef.push({
      name: newRoomName
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <div className="rooms-list">
        <h4 className="">Create A Room</h4>

        <form
          className="form-group"
          onSubmit={e => {
            this.createRooms(e, this.state.newRoomName);
          }}
        >
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
    );
  }
}

export default RoomList;
