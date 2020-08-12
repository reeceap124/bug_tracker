import React, {useState} from 'react';
import {axiosAuth} from '../../../util/axiosAuth'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap'

const OrgModal = (props) => {
    const {modalChoice, toggle, openModal, requestType} = props;
    const orgUpdate = props.orgUpdate?props.orgUpdate:null
    const [org, setOrg] = useState({
        title: orgUpdate.title || '',
        description: orgUpdate.description || ''
    });
    const modalOn = (modalChoice==='org' && openModal)?true:false
    const handleSubmit = (e) => {
        e.preventDefault
        axiosAuth()[requestType?'post':'put'](`orgs/${requestType?'':org.id}`)
        .then((res)=>{
            console.log('added issue', res)
        })
        .catch(err=>{
            return console.error("There was an issue submitting this issue", err)
        })
    }

    return (
        <Modal isOpen={modalOn} toggle={toggle}>
            <ModalHeader toggle={toggle}>{requestType?'Create New Organization':'Update Organization'}</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for='title'>Title</Label>
                        <Input name='title' placeholder='Organization Name/Title' onChange={handleChanges} value={org.title}/>
                    </FormGroup>
                    <FormGroup>
                        <Lable for='description'>Description</Lable>
                        <Input name='description' placeholder='A little blurb about your org' onChange={handleChanges} value={org.description}/>
                    </FormGroup>
                    <Button>{requestType?'Create':'Update'}</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default OrgModal