import React, { useState } from "react";
import "./FilesTab.css"; // Import your CSS file for styling

function FilesTab({
  files,
  activeFile,
  setActiveFile,
  DEFAULT_CODE,
  setFiles,
}) {
  const [fileNameInput, setFileNameInput] = useState("");

  const [inputVisible, setInputVisible] = useState(false);

  const handleAddFile = () => {
    setInputVisible(true); // Show the input box
  };

  const handleFileClick = (fileName) => {
    setActiveFile(fileName);
  };

  const handleInputChange = (e) => {
    setFileNameInput(e.target.value);
  };

  const handleInputBlur = () => {
    if (fileNameInput.trim() !== "") {
      saveFileName();
    }
    setInputVisible(false); // Hide the input box
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      saveFileName();
      setInputVisible(false); // Hide the input box
    }
  };

  const saveFileName = () => {
    const newFile = {
      name: fileNameInput.trim(),
    };

    setFiles((oldFiles) => ({
      ...oldFiles,
      [newFile.name]: DEFAULT_CODE,
    }));

    setFileNameInput("");
  };

  return (
    <div className="FilesTab">
      {/* Button to add a new file */}
      <div className="inputContainer">
        <button className="addButton" onClick={handleAddFile}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M3 1h12.414L21 6.586V12h-2V9h-6V3H5v18h7v2H3zm12 2.414V7h3.586zM20 14v4h4v2h-4v4h-2v-4h-4v-2h4v-4z"
            />
          </svg>
        </button>
      </div>
      {/* Display the list of files */}
      <div className="fileList">
        {/* {files.map((file, index) => (
          <div
            className={`fileItem`}
            id={`${activeFile === file.name ? 'active' : ''}`}
            key={index}
            onClick={() => handleFileClick(file.name)}
          >
            {file.name}
          </div>
        ))} */}
        {Object.keys(files).map((fileName, index) => (
          <div
            className={`fileItem`}
            id={`${activeFile === fileName ? "active" : ""}`}
            key={index}
            onClick={() => handleFileClick(fileName)}
          >
            {fileName}
          </div>
        ))}
      </div>
      {/* Input box for adding a new file */}
      {inputVisible && (
        <div className="inputContainer">
          <input
            className="fileInput"
            type="text"
            placeholder="Enter file name"
            value={fileNameInput}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={handleInputKeyPress} // Handle Enter key press
            autoFocus // Auto-focus the input box when it appears
          />
        </div>
      )}
    </div>
  );
}

export default FilesTab;
