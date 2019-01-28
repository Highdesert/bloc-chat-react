import React, { Component } from "react";
import { Row, Container, Col } from "reactstrap";

class RoomList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [], 
			newRoomName: ''
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

			<Container id="roomsList">
				<Col>
					{this.state.rooms.map(room => (
						<li key={room.key}>{room.name}</li>
					))}
				</Col>

				<div className="form">
					<h3>Create A Room</h3>
						<form
							onSubmit={e => {
								e.preventDefault();
								this.createRooms(this.state.newRoomName); 
							}}>
						<label for="roomName">Enter a room name</label>
						<input
							type="text"
							id="roomName"
							value={this.state.newRoomName}
							onChange={e => this.handleChange(e)} />
						<input type="submit"/>
					</form>
					</div>
			

			</Container>

		);
	}
}

export default RoomList;
