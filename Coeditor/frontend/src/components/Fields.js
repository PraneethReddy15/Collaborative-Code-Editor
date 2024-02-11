import IconMenu from "./IconMenu";
import FieldArea from "./FieldArea";
import "./Fields.css";
import { useState } from "react";

function Fields({ activeFile, setActiveFile, files, DEFAULT_CODE, setFiles }) {
  const [currField, setCurrField] = useState("init");
  const [status, toggleStatus] = useState(false);
  return (
    <div className="Fields SBItem">
      <IconMenu
        currField={currField}
        setCurrField={setCurrField}
        toggleStatus={toggleStatus}
        status={status}
      />
      {status && (
        <FieldArea
          setFiles={setFiles}
          files={files}
          currField={currField}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          DEFAULT_CODE={DEFAULT_CODE}
        />
      )}
    </div>
  );
}

export default Fields;
