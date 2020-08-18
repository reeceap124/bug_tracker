import React, {useState} from 'react';
import {axiosAuth} from '../../../util/axiosAuth'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap'

const OrgModal = (props) => {
    const [requestType, setRequestType] = useState('post')
    const [org, setOrg] = useState({
        title: '',
        description: ''
    });
    if (props.updateOrg) {
        setOrg(props.updateOrg)
    }
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosAuth()[requestType](`orgs/${requestType==='post'?'':org.id}`,  org)
        .then((res)=>{
            console.log('added issue', res)
            axiosAuth().post(`/users/orgRole/${props.id}`, {user_key: props.id, role_key: 1, org_key: res.data.id})
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
            <Button onClick={toggle}>Org</Button>
            <Modal isOpen={isOpen} toggle={toggle}>
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
                        toggle()
                        setOrg({title:'',description:''})
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}

export default OrgModal