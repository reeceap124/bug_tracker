import React from 'react';
import {Card, CardHeader, CardText, CardBody} from 'reactstrap'

const IssueCard = ({issue, cardClick}) => {
    return (
        <Card onClick={()=>cardClick(issue.id)}>
            <CardHeader tag='h3'>
                {issue.title}
            </CardHeader>
            
            <CardBody>
                <CardText>{issue.content}</CardText>
            </CardBody>
            
        </Card>
    )
}

export default IssueCard
