function Icon({ currField, name, setCurrField, toggleStatus, status }) {
    return (
        <div className="Icon">
            <button className="iconBtn" onClick={() => {
                if (currField === name || currField==="init") {
                    toggleStatus(!status);
                } 
                else if(!status){
                    toggleStatus(!status);
                }
                setCurrField(name);
            }}>
               {name === "SearchBar"?<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"/></svg>:<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M20 7h-3a2 2 0 0 1-2-2V2"/><path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z"/><path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8"/></g></svg>}
            </button>
        </div>
    );
}

export default Icon;