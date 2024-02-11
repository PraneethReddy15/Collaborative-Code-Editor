import Intro from "./Intro";
import Fields from "./Fields";
import "./SideBar.css";

function SideBar({ activeFile, setActiveFile, files, DEFAULT_CODE, setFiles }) {
  return (
    <div className="SideBar">
      <Intro />
      <Fields
        setFiles={setFiles}
        files={files}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
        DEFAULT_CODE={DEFAULT_CODE}
      />
    </div>
  );
}

export default SideBar;
