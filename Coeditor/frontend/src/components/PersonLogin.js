import React, { useState } from "react";
import "./PersonLogin.css";
function PersonLogin({
  handleSignIn,
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="flex-container p-login">
      <div className="work">
        <img src={require("../images/codeImg.png")} alt="logo" />
        <div className="layer">
          <h3>
            C
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M6 21v-1H4v1a7 7 0 0 0 7 7h3v-2h-3a5 5 0 0 1-5-5m18-10v1h2v-1a7 7 0 0 0-7-7h-3v2h3a5 5 0 0 1 5 5m-13 0H5a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-3-1a4 4 0 1 0-4-4a4 4 0 0 0 4 4m0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2m19 21h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3m-7-5a4 4 0 1 0 4-4a4 4 0 0 0-4 4m6 0a2 2 0 1 1-2-2a2 2 0 0 1 2 2"
              />
            </svg>
            Editor
          </h3>
          <p>
            A Collaborative Code Editor with Room-Based Collaboration is an
            interactive web application designed to empower users to collaborate
            seamlessly on coding projects. This platform not only offers
            real-time code editing but also incorporates a room-based system,
            providing a personalized and secure environment for collaborative
            coding experiences.
          </p>
        </div>
      </div>
      <div className="content-container">
        <div className="form-container">
          <h1>{showSignIn ? "Sign Up" : "Login"}</h1>
          <span className="subtitle">USERNAME</span>
          <br />
          <input
            className="input-style"
            type="text"
            placeholder="Enter Username"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <span className="subtitle">PASSWORD</span>
          <br />
          <input
            className="input-style"
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
        </div>
        <button
          className="btn login-btn"
          onClick={showSignIn ? handleSignIn : handleLogin}
        >
          {showSignIn ? "Sign Up" : "Login"}
        </button>
        <button
          className="btn new-user-btn"
          onClick={() => setShowSignIn(!showSignIn)}
        >
          {showSignIn ? "Switch to Login" : "Sign Up Instead?"}
        </button>
      </div>
    </div>
  );
}
export default PersonLogin;
