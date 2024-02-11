import { useState } from "react";
import "./Login.css";

function Login({ joinRoom, roomId, setRoomId, createRoom }) {
  const [newRoomId, setNewRoomId] = useState("");

  return (
    <div className="login-container">
      <div className="sign-in-box">
        <h2>ACCESS ROOM</h2>
        <input
          type="text"
          className="input-ele"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        {/* <input type="text" placeholder="Enter Join Link" value={joinLink} onChange={(e) => setJoinLink(e.target.value)} /> */}
        <button className="button-lgn" onClick={joinRoom}>
          Join
        </button>
        {/* <div className="error-login">{error}</div> Display error message */}
      </div>
      <div className="create-room-box">
        <h2>CREATE NEW ROOM</h2>
        <input
          type="text"
          className="input-ele"
          placeholder="Enter id"
          value={newRoomId}
          onChange={(e) => setNewRoomId(e.target.value)}
        />
        <button className="button-lgn" onClick={() => createRoom(newRoomId)}>
          Create
        </button>
      </div>
      {/* <button className="button-lgn" onClick={() => setInRoom(true)}> */}
      {/* Choose No Room */}
      {/* </button> */}
    </div>
  );
}

export default Login;
