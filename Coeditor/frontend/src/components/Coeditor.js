import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import "./Coeditor.css";

export default function Coeditor({
  handleCodeChange,
  files,
  activeFile,
  DEFAULT_CODE,
  DEFAULT_FILE_NAME,
}) {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [fileContents, setFileContents] = useState("");

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const runFile = () => {
    setFileContents(eval(files[activeFile] || DEFAULT_CODE));
    toggleCardVisibility();
  };

  const closeCard = () => {
    setIsCardVisible(false);
  };
  function getLanguage(fileName) {
    const extension = fileName.split(".").pop();
    let lang = "plaintext";
    switch (extension) {
      case "js":
        lang = "javascript";
        break;
      case "py":
        lang = "python";
        break;
      case "java":
        lang = "java";
        break;
      case "c":
        lang = "c";
        break;
      case "cpp":
        lang = "cpp";
        break;
      case "html":
        lang = "html";
        break;
      case "css":
        lang = "css";
        break;
      default:
        lang = "plaintext";
    }
    return lang;
  }

  return (
    <div className="Coeditor">
      <div className="run-button-container">
        <button onClick={runFile} className="run-button">
          <svg
            className="svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M17.215 8.68c1.047.568 1.047 2.07 0 2.638l-11.999 6.5a1.5 1.5 0 0 1-2.214-1.32V3.5a1.5 1.5 0 0 1 2.214-1.32z"
            />
          </svg>
        </button>
      </div>
      {isCardVisible && (
        <div className={`code-card`}>
          <div className="input">
            <input className="input-text" placeholder="Enter input here" />
          </div>
          <div className="output">
            <p>output</p>
            <pre>{fileContents}</pre>
          </div>
          <button onClick={closeCard} className="close-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
              />
            </svg>
          </button>
        </div>
      )}
      <Editor
        className="Editor"
        height="90vh"
        defaultLanguage="javascript"
        language={getLanguage(activeFile)}
        value={files[activeFile]?.toString() || DEFAULT_CODE}
        onChange={handleCodeChange}
      />
    </div>
  );
}
