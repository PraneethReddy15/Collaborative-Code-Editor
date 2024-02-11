import Icon from "./Icon"
function IconMenu({currField,setCurrField,toggleStatus,status}){
    return <div className="IconMenu FItem">
        <Icon name="FilesTab" currField={currField} setCurrField={setCurrField} toggleStatus={toggleStatus} status={status}/>
        <Icon name="SearchBar" currField={currField} setCurrField={setCurrField} toggleStatus={toggleStatus} status={status}/>
    </div>
}

export default IconMenu; 