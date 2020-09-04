import React, {useState, useEffect} from 'react'
import { axiosAuth } from '../../../util/axiosAuth'

const IssueDetail = (props) => {
    const [issue, setIssue] = useState(null)
    const [comments, setComments] = useState([])
    useEffect(()=>{
        if (props.activeIssue){
            axiosAuth().get(`/issues/specific/${props.activeIssue}`)
            .then((res)=>{
                setIssue(res.data)
            })
            .then(()=>{
                axiosAuth().get(`/comments/list/${props.activeIssue}`)
                .then(res=>{
                    setComments(res.data)
                })
                .catch(err=>console.log('There was an error getting your comments', err))
            })
            .catch(err=>console.error('Trouble getting issue', err))
        }
        
    }, [props.activeIssue])

    if (issue) {
        return (
            <div>
            <h2>Title: {issue.title}</h2>
            <div>
                <h3>Contents:</h3>
                <p>{issue.content}</p>
            </div>
            </div>
        )
    } else {return null}
}

export default IssueDetail