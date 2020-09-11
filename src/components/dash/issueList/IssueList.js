import React from 'react';
import IssueCard from './IssueCard'
import ModalSelect from '../modals/ModalSelect'

const IssueList = (props) => {
    function cardClick(issueId) {
        props.setActiveIssue(issueId)
    }
    return (
        <section>
            <div className='modalSelect'>
                <ModalSelect id={props.id}/>
            </div>
            {props.list.map(issue=>{
                return <IssueCard key={issue.id} issue={issue} cardClick={cardClick}/>
            })}
        </section>
    )
}

export default IssueList