import React, {useEffect} from 'react';
import IssueCard from './IssueCard'
import ModalSelect from '../modals/ModalSelect'
import {useUser} from '../../../contexts/UserContext'
import {useIssues} from '../../../contexts/IssuesContext'
import { axiosAuth } from '../../../util/axiosAuth';

const IssueList = (props) => {
    const id = useUser()
    const issuesContext = useIssues()
    useEffect(()=>{
        axiosAuth().get(`/issues/list/${id}`)
        .then(res=>{
            if (res.data.error){
                return console.error(res.data)
            }
            issuesContext.update(issuesContext.filtered, res.data)
        })
        .catch(err=>{
            console.error('There was an error fetching your issues', err)
        })
    }, [id])
    function cardClick(issueId) {
        props.setActiveIssue(issueId)
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