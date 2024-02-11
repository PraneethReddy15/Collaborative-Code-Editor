import FilesTab from "../FieldComponents/FilesTab";
import SearchBar from "../FieldComponents/SearchBar";

function FieldArea({
  files,
  currField,
  activeFile,
  setActiveFile,
  DEFAULT_CODE,
  setFiles,
}) {
  return (
    <div className="FieldArea">
      {currField === "SearchBar" && <SearchBar />}
      {currField === "FilesTab" && (
        <FilesTab
          setFiles={setFiles}
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          DEFAULT_CODE={DEFAULT_CODE}
        />
      )}
    </div>
  );
}

export default FieldArea;
