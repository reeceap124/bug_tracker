import React, {useEffect, useState} from 'react'
import CommentCard from './CommentCard'
import {axiosAuth} from '../../../util/axiosAuth'

const CommentsList = (props) => {
    const [commentList, setCommentList] = useState([])
    const [newComment, setNewComment] = useState({
        comment: '',
        issue_key: props.issueId,
        created_by: props.match.params.id
    })
    
    useEffect(()=>{
        axiosAuth().get(`/comments/list/${props.issueId}`)
        .then(res=>{
            console.log('res.data', res.data)
            setCommentList(res.data)
        })
        .catch(err=>console.error('didn get those comments', err))
    }, [props.issueId])

    function handleChanges(e){
        e.preventDefault()
        setNewComment({
            ...newComment,
            comment: e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        axiosAuth().post(`/comments/${props.issueId}`, newComment)
        .then(res=>{
            console.log('RESponse', res)
            setCommentList([...commentList, res.data])
        })
        .catch(err=>console.error('didn add that comment', err))
        .finally(()=>setNewComment({...newComment, comment:''}))
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChanges} value={newComment.comment}/>
                <button type='submit'>Comment</button>
            </form>
            {commentList.map(comment=>{
                return <CommentCard key={comment.id} comment={comment}/>
            })}
        </div>
    )

}

export default CommentsList