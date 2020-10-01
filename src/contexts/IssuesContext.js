import React, {createContext, useContext, useState, useEffect} from 'react';
import {axiosAuth} from '../util/axiosAuth'
import {useUser} from '../contexts/UserContext'
const IssuesContext = createContext();
export function useIssues() { //Custom hook for consuming context
    return useContext(IssuesContext)
}

export function IssuesProvider({children}) {
    const user = useUser()
    const [issues, setIssues] = useState([]) //All issues associated with user
    const [filtered, setFiltered] = useState([]) //Filtered list that gets displayed
    const [filters, setFilters] = useState({}) //Table of filters used to get filtered list
    const [activeIssue, setActiveIssue] = useState() //Defines currently active issue

    // fetches all issues related to user
    useEffect(()=>{
        axiosAuth().get(`/issues/list/${user}`)
        .then(res => {
            if (res.data.error && res.data.message) {
                return console.error('got em', res.data)
            }
            //TODO: set up with context to allow update on submission
            setIssues(res.data)
        })
        .catch(()=>{
            console.log('There was an issue retrieving your issues')
        })
    }, [user])

    //when filters or issues change we re-evaluate the issues rendered in filtered list
    useEffect(()=>{
        const updatedIssues = issues.filter(issue=>{
            let returnable = true
            for (const filter in filters) {
                if (issue[filter] !== filters[filter]) {
                    returnable = false
                }
            }
            if(returnable){return issue}
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