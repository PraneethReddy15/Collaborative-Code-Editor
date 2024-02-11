import SideBar from "./components/SideBar";
import Coeditor from "./components/Coeditor";
import NavBar from "./components/NavBar";
import RoomNavBar from "./components/RoomNavBar";
import Login from "./components/Login";
import PersonLogin from "./components/PersonLogin"; // Import PersonLogin component
import { useState, useEffect, useReducer } from "react";
import ChatBox from "./components/ChatBox";
import socketIOClient from "socket.io-client";

import loginService from "./services/login";
import userService from "./services/user";
import Notification from "./components/notification";
import ErrorMessage from "./components/errorMessage";
import ShowPeople from "./components/ShowPeople";
import "./App.css";
import roomService from "./services/room";
const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : "http://localhost:4001";

function App() {
  const [inRoom, setInRoom] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedEditorUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setCurrentUser({ username: user.username, id: user.id });
      setLoginStatus(true);
      const roomIdFromStorage = window.localStorage.getItem("roomId");

      if (roomIdFromStorage) {
        setRoomId(roomIdFromStorage);
        setInRoom(true);
      }
    }
  }, []);

  /********************************socket ******************************* */
  const DEFAULT_CODE = "// write your code here";
  const DEFAULT_FILE_NAME = "script.js";

  const [socket, setSocket] = useState(null);
  const [files, setFiles] = useState({
    [DEFAULT_FILE_NAME]: DEFAULT_CODE,
  });
  const [roomId, setRoomId] = useState("");
  const [activeFile, setActiveFile] = useState("script.js");
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket == null) return;

    socket.on("code", ({ fileName, newCode }) => {
      setFiles((oldFiles) => ({
        ...oldFiles,
        [fileName]: newCode,
      }));
    });

    socket.on("error", (errorMessage) => {
      setError("socket error" + errorMessage);
      setTimeout(() => {
        setError(null);
      }, 5000);
    });
    socket.on("message", (messageData) => {
      setChatMessages((oldMessages) => [...oldMessages, messageData]);
    });
    return () => {
      if (socket) {
        socket.off("code");
        socket.off("error");
        socket.off("message");
      }
    };
  }, [socket]);

  const handleCodeChange = (newCode) => {
    setFiles((oldFiles) => ({
      ...oldFiles,
      [activeFile]: newCode,
    }));
    if (socket) {
      socket.emit("code", { roomId: roomId, fileName: activeFile, newCode });
    }
  };

  const joinRoom = async () => {
    if (socket == null) return;

    try {
      const rooms = await roomService.getRooms();
      const roomExists = rooms.some((room) => room.roomId === roomId);

      if (!roomExists) {
        throw new Error("Room does not exist");
      }
      window.localStorage.setItem("roomId", roomId);
      setInRoom(true);
      socket.emit("join", roomId, currentUser.id);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  const leaveRoom = () => {
    if (socket == null) return;
    socket.emit("leave", roomId, currentUser.id);
    setRoomId(""); // Clear the room ID
    setInRoom(false);
    setFiles({
      [DEFAULT_FILE_NAME]: DEFAULT_CODE,
    });
    setChatMessages([]);
    window.localStorage.removeItem("roomId");
  };
  const createRoom = async (newRoomId) => {
    if (socket == null) return;

    try {
      const rooms = await roomService.getRooms();
      const roomExists = rooms.some((room) => room.roomId === newRoomId);

      if (roomExists) {
        throw new Error("Room already exists");
      }

      socket.emit("create", newRoomId, currentUser.id);
      setInRoom(true);
      setRoomId(newRoomId);
      window.localStorage.setItem("roomId", newRoomId);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const sendMessage = (message) => {
    if (socket == null && !currentUser) return;
    socket.emit(
      "message",
      roomId,
      currentUser.id,
      message,
      currentUser.username
    );
  };

  /****************************************************** */
  const [signUp, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setnotification] = useState("");
  const [error, setError] = useState("");

  const [showChatBox, setShowChatBox] = useState(false); // State to manage ChatBox visibility

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedEditorUser", JSON.stringify(user));

      setUsername("");
      setPassword("");
      setLoginStatus(true);
      setCurrentUser({
        username: user.username,
        id: user.id,
        room: user.rooms,
      });
      if (user.rooms && user.rooms.length > 0) {
        setRoomId(user.rooms);
        setInRoom(true);
      }
    } catch (error) {
      setError(error.response.data.error || "error");
      console.log(error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const userCreated = await userService.createUser({
        username,
        password,
      });
      if (userCreated) {
        setnotification(`${username} created successfully`);
        setTimeout(() => {
          setnotification(null);
        }, 5000);
      }

      setUsername("");
      setPassword("");
      setSignup(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error || "error");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedEditorUser");
    window.location.reload();
  };

  const [showPeople, setShowPeople] = useState(false);

  return (
    <div className="App">
      <Notification message={notification} />
      <ErrorMessage message={error} />
      {loginStatus ? (
        inRoom ? (
          <RoomNavBar
            roomId={roomId}
            handleLogout={handleLogout}
            handleLeaveRoom={leaveRoom}
            currUser={currentUser}
            setnotification={setnotification}
            setShowPeople={setShowPeople}
            showPeople={showPeople}
          />
        ) : (
          <NavBar handleLogout={handleLogout} loginStatus={loginStatus} />
        )
      ) : (
        <NavBar loginStatus={loginStatus} />
      )}

      <div className="Content">
        {loginStatus ? (
          inRoom ? (
            <>
              <SideBar
                setFiles={setFiles}
                files={files}
                activeFile={activeFile}
                setActiveFile={setActiveFile}
                DEFAULT_CODE={DEFAULT_CODE}
              />
              <Coeditor
                handleCodeChange={handleCodeChange}
                files={files}
                activeFile={activeFile}
                DEFAULT_CODE={DEFAULT_CODE}
                DEFAULT_FILE_NAME={DEFAULT_FILE_NAME}
              />
              {showChatBox && (
                <ChatBox
                  chat={chatMessages}
                  sendMessage={sendMessage}
                  currentUser={currentUser}
                />
              )}
              <button
                className="ChatBoxButton"
                onClick={() => setShowChatBox(!showChatBox)}
              >
                Toggle ChatBox
              </button>
              {showPeople && (
                <ShowPeople
                  roomId={roomId}
                  currUser={currentUser}
                  setnotification={setnotification}
                />
              )}
            </>
          ) : (
            <Login
              joinRoom={joinRoom}
              roomId={roomId}
              setRoomId={setRoomId}
              createRoom={createRoom}
            />
          )
        ) : (
          <PersonLogin
            handleSignIn={handleSignup}
            signUp={signUp}
            handleLogin={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        )}
      </div>
    </div>
  );
}

export default App;
