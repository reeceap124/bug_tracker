import React, {useState, useEffect} from 'react'
import {useIssues} from '../../../contexts/IssuesContext'
import CommentsList from './CommentsList'
import { axiosAuth } from '../../../util/axiosAuth'

const IssueDetail = (props) => {
    const issuesContext = useIssues()
    const activeIssue = issuesContext.activeIssue
    const [issue, setIssue] = useState(null)
    const [comments, setComments] = useState([])
    //Retrieves data about specific issue
    //TODO: clean it up by just setting current issue to the clicked issue. No need to do a HTTP request.
    useEffect(()=>{
        if (activeIssue){
            axiosAuth().get(`/issues/specific/${activeIssue}`)
            .then((res)=>{
                setIssue(res.data)
            })
            .then(()=>{
                axiosAuth().get(`/comments/list/${activeIssue}`)
                .then(res=>{
                    setComments(res.data)
                })
                .catch(err=>console.log('There was an error getting your comments', err))
            })
            .catch(err=>console.error('Trouble getting issue', err))
        }
        
    }, [activeIssue])

    if (issue) {
        return (
            <div>
            <h2>Title: {issue.title}</h2>
            <div>
                <h3>Contents:</h3>
                <p>{issue.content}</p>
            </div>
            <CommentsList issueId={activeIssue}/>
            </div>
            
        )
    } else {return null}
}

export default IssueDetail