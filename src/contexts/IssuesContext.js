import React, {createContext, useContext, useState, useEffect} from 'react';
const IssuesContext = createContext();
export function useIssues() { //Custom hook for consuming context
    return useContext(IssuesContext)
}

export function IssuesProvider({children}) {
    const [issues, setIssues] = useState([]) //All issues associated with user
    const [filtered, setFiltered] = useState([]) //Filtered list that gets displayed
    const [filters, setFilters] = useState({}) //Table of filters used to get filtered list
    const [activeIssue, setActiveIssue] = useState() //Defines currently active issue
    useEffect(()=>{ //when filters change we re-evaluate the issues rendered in filtered list
        const updatedIssues = issues.filter(issue=>{
            filters.forEach(filter=>{
                if (issue[filter] === filters[filter]){
                    //finish writing the check here, when back from dinner.
                }
            })
        })
        setFiltered(updatedIssues)

    },[filters, issues])

    //Takes state to be updated and desired changes
    //Example: issuesContext.update(issuesContext.issues, someNewIssuesList)
    function update(toUpdate, incomingUpdates){ 
        switch (toUpdate) {
            case issues:
                return setIssues(incomingUpdates)
            case filtered:
                return setFiltered(incomingUpdates)
            case filters:
                return setFilters(incomingUpdates)
            case activeIssue:
                return setActiveIssue(incomingUpdates)
            default:
                return console.error(`no valid match for: ${toUpdate}`)
        }

    }
    return (
        <IssuesContext.Provider value={{issues, filtered, filters, activeIssue, update}}>
            {children}
        </IssuesContext.Provider>
    )
}