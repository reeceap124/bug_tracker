import React, {createContext, useContext, useState} from 'react';
const IssuesContext = createContext();
export function useIssues() { //Custom hook for consuming context
    return useContext(IssuesContext)
}
//Set up local state for issues here. 
    //issues
    //filtered
    //active

//Creates context that includes the full issue list, the filtered issues, and the active issue 
export function IssuesProvider({issues, filteredIssues, activeIssue, children}) {
    const [issuesList, setIssuesList] = useState(issues)
    const [filteredList, setFilteredList] = useState(filteredIssues)
    const [active, setActive] = 
    function updateIssues(newIssuesList) {
        setIssuesList(newIssuesList)
    }
    function updateFiltered(newFilteredList) {
        setFilteredList(newFilteredList)
    }
    function updateActive(newActive) {
        setActive(newActive)
    }
    return (
        <IssuesContext.Provider value={{issues, filteredIssues, activeIssue}}>
            {children}
        </IssuesContext.Provider>
    )
}