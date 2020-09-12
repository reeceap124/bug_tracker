import React, {useState} from 'react';
import {useUser} from '../../../contexts/UserContext'
import {axiosAuth} from '../../../util/axiosAuth'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap'

const OrgModal = (props) => {
    const id = useUser()
    const [requestType, setRequestType] = useState('post')
    const [org, setOrg] = useState({
        title: '',
        description: ''
    });
    if (props.updateOrg) {
        setOrg(props.updateOrg)
    }
    const toggle = (nextModal = null) => {
        if (props.modal === 'org') {
            props.setModal(nextModal)
        } else {
            props.setModal('org')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosAuth()[requestType](`orgs/${requestType==='post'?'':org.id}`,  org)
        .then((res)=>{
            console.log('added org',res.data)
            props.updateCreated({org:res.data.id, project:null})
            //need to update to handle put requests as well
            axiosAuth().post(`/users/orgRole/${id}`, {user_key: id, role_key: 1, org_key: res.data.id})
            .then(()=>{
                console.log('Added to orgRoles')
            })
            .catch(err=>{
                console.log('failed to add to orgRoles', err)
            })
        })
        .catch(err=>{
            console.error("There was an issue submitting this issue", err)
        })
        .finally(()=>{
            toggle()
            props.goToModal('project')
            setOrg({
                title:'',
                description: ''
            })
        })
    }
    const handleChanges = e => {
        e.preventDefault()
        setOrg({
            ...org,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            {props.goalButton('org', toggle)}
            <Modal isOpen={props.modal === 'org'} toggle={props.cancelCreation}>
                <ModalHeader>About Your Organization</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='title'>Title</Label>
                            <Input name='title' placeholder='Organization Name/Title' onChange={handleChanges} value={org.title}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='description'>Description</Label>
                            <Input name='description' placeholder='A little blurb about your org' onChange={handleChanges} value={org.description}/>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>{
                        props.cancelCreation()
                        setOrg({title:'',description:''})
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}

export default OrgModal