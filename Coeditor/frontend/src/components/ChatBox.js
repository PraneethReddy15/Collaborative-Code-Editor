import { useState } from "react";
import "./chatBox.css";

function ChatBox({ chat, sendMessage, currentUser }) {
  const [message, setMessage] = useState("");

  return (
    <div className="ChatBox">
      {chat === null ? (
        <p>No messages</p>
      ) : (
        <ul>
          {chat.map((message, index) => (
            <li
              key={index}
              className={
                message.username === currentUser.username ? "sent" : "received"
              }
            >
              <p>{message.message}</p>

              <small>
                {message.user === currentUser.id ? "You" : message.username}{" "}
              </small>
              <small>
                {new Date(message.timestamp).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </small>
            </li>
          ))}
        </ul>
      )}
      <div className="chat-components">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-message"
          type="text"
          placeholder="Enter Message"
        ></input>
        <button onClick={() => sendMessage(message)} className="send-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4 18.5v-13L19.423 12zM5 17l11.85-5L5 7v3.885L9.846 12L5 13.115zm0 0V7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
