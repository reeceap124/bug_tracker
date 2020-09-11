import React from 'react'

const CommentCard = (props) => {
    return (
        <div>
            <p>{props.comment.comment}</p>
        </div>
    )
}

export default CommentCard