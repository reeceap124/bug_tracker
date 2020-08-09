import React from 'react';

const IssueCard = ({issue}) => {
    return (
        <div>
            <h4>{issue.title}</h4>
            <p>{issue.content}</p>
        </div>
    )
}

export default IssueCard