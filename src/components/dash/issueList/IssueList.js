import React from 'react';
import IssueCard from './IssueCard'

const IssueList = (props) => {
    return (
        <section>
            {props.list.map(issue=>{
                return <IssueCard key={issue.id} issue={issue}/>
            })}
        </section>
    )
}

export default IssueList