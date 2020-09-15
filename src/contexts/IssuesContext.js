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
    return (
        <IssuesContext.Provider value={{issues, filteredIssues, activeIssue}}>
            {children}
        </IssuesContext.Provider>
    )
}