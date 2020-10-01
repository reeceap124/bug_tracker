import React, {useState, useEffect} from 'react';
import {axiosAuth} from '../../util/axiosAuth'
import Filters from './filters/Filters'
import IssueList from './issueList/IssueList'
import IssueDetail from './issueDetail/IssueDetail';
import {UserProvider} from '../../contexts/UserContext'
import {IssuesProvider, useIssues} from '../../contexts/IssuesContext'

const Dash = (props) => {
    const [activeIssue, setActiveIssue] = useState(null) //When set, holds the id of the active Issue that is displayed in issue details.
    

    return (
        <div className='dashWrapper'>
            <UserProvider user={props.match.params.id}>
            <IssuesProvider>
                <Filters/>
                <IssueList/>
                <IssueDetail activeIssue={activeIssue}/>
            </IssuesProvider>
            </UserProvider>
        </div>
        
    )
}

export default Dash