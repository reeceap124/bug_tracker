import React, {createContext, useContext, useReducer} from 'react';
const IssuesContext = createContext();
export function useIssues() { //Custom hook for consuming context
    return useContext(IssuesContext)
}
//Set up local state for issues here. 
    //issues
    //filtered
    //active

//Creates context that includes the full issue list, the filtered issues, and the active issue 
const ACTIONS = {
    updateIssues : 'updateIssues',
    updateFiltered : 'updateFiltered',
    updateActive : 'updateActive'
}
function reducer (state, action) {
    switch(action.type) {
        case ACTIONS.updateIssues:
            return {...state, allIssues: action.payload}
        case ACTIONS.updateFiltered:
            return {...state, updateFiltered: action.payload}
        case ACTIONS.updateActive:
            return {...state, updateActive:action.payload}
    }
}
export function IssuesProvider({children}) {

    const [issuesState, dispatch] = useReducer(reducer, {
        allIssues,
        filteredIssues,
        activeIssue
    })
    function update(actionType, payload){
        dispatch({type: ACTIONS[actionType], payload: payload})
    }
    return (
        <IssuesContext.Provider value={{issues:issuesState.allIssues, filteredIssues:issuesState.filteredIssues, activeIssue:issuesState.filteredIssues, update}}>
            {children}
        </IssuesContext.Provider>
    )
}