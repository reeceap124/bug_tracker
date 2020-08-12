import React, {useState} from 'react';
import {axiosAuth} from '../../../util/axiosAuth';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

const IssueModal = (props) => {
    const {toggle, update, openModal, type} = props
    const [issue, setIssue] = useState({
        title : update.title || null, 
        content : update.content || null,
        open : update.open ||true,
        importance : update.importance || null, //integer
        project_key : update.project_key ||null, //integer
        created_by: update.created_by || props.match.params.id
        //need an updated at. may be able to write update EP to set this on the BE
    })

    const handleChanges =  e => {
        e.preventDefault();
        setIssue({
            ...issue,
            [e.target.name]: e.target.value
        })
    }


    axiosAuth()[type?'post':'put'](`issues/${issue.projectId}/${type?issue.id:''}`)
    .then((res)=>{
        console.log('added issue', res)
    })
    .catch(err=>{
        return err
    })

    return (
        <Modal isOpen={openModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{type?'Create New Issue':'Update Issue'}</ModalHeader>
            <ModalBody>
                <Form>
                    <Button>{type?'Create':'Update'}</Button>
                    <FormGroup>
                        <Label for='title'>Title</Label>
                        <Input name='title' id='title' placeholder='Title text' onChange={handleChanges} value={issue.title}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='content'>Content</Label>
                        <Input name='content' id='content' placeholder='Issue content' onChange={handleChanges} value={issue.content}/>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type='checkbox' name='open' onChange={handleChanges}value={issue.open}/>
                            Active
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for='importance'>Importance Level</Label>
                        <Input type='select' name='importance' id='importance'>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='project_key'>Project</Label>
                        <Input type='number'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='created_by'>Author</Label>
                        <Input type='number' name='created_by' id='created_by'/> {/*  disabled={updated.created_by?true:false} */}
                    </FormGroup>

                    <Button>Submit</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default IssueModal