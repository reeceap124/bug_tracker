import React from 'react';
import IssueCard from './IssueCard'

const IssueList = (props) => {
    function cardClick(issueId) {
        props.setActiveIssue(issueId)
    }
    return (
        <section>
            {props.list.map(issue=>{
                return <IssueCard key={issue.id} issue={issue} cardClick={cardClick}/>
            })}
        </section>
    )
}

export default IssueList