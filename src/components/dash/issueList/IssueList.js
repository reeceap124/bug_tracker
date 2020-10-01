import React, {useEffect} from 'react';
import IssueCard from './IssueCard'
import ModalSelect from '../modals/ModalSelect'
import {useUser} from '../../../contexts/UserContext'
import {useIssues} from '../../../contexts/IssuesContext'
import { axiosAuth } from '../../../util/axiosAuth';

const IssueList = (props) => {
    const id = useUser()
    const issuesContext = useIssues()

    function cardClick(issueId) {
        issuesContext.update(issuesContext.activeIssue, issueId)
    }
    return (
        <section>
            <div className='modalSelect'>
                <ModalSelect/>
            </div>
            {issuesContext.filtered.map(issue=>{
                return <IssueCard key={issue.id} issue={issue} cardClick={cardClick}/>
            })}
        </section>
    )
}

export default IssueList