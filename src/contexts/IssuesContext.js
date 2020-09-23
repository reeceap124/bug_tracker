import React, {createContext, useContext, useReducer} from 'react';
const IssuesContext = createContext();
export function useIssues() { //Custom hook for consuming context
    return useContext(IssuesContext)
}

export function IssuesProvider({children}) {
    const [issues, setIssues] = useState([])
    function updateIssues(newIssuesList){
        setIssues(newIssuesList)
    }
    return (
        <IssuesContext.Provider value={{issues, updateIssues}}>
            {children}
        </IssuesContext.Provider>
    )
}