import React, {useState, useEffect} from 'react';
import {axiosAuth} from '../../../util/axiosAuth'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap'

const OrgModal = (props) => {
    const [requestType, setRequestType] = useState('post')
    const [orgs, setOrgs] = useState([]);
    const [project, setProject] = useState({
        title: '',
        description: '',
        active: true,
        org_key: null
    })
    useEffect(()=>{
        axiosAuth().get(`/users/orgRole/${props.id}`)
        .then(res=>{
            console.log('RES:', res)
            setOrgs(res.data)
        })
        .catch((err)=>{
            console.log("Didn't get those orgRoles for you. ", err)
        })
    }, [])

    if (props.updateProject) {
        setProject(props.updateProject)
    }
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const handleSubmit = (e) => {
        if (!(project.org_key || project.title)) {
            return
        }
        e.preventDefault()
        axiosAuth()[requestType](`/projects/${project.org_key}`,  project)
        .then((res)=>{
            console.log('added project', res)
        })
        .catch(err=>{
            console.error("There was an issue submitting this issue", err)
        })
        .finally(()=>{
            toggle()
            setProject({
                title:'',
                description: '',
                active: true,
                org_key: null
            })
        })
    }
    const handleChanges = e => {
        e.preventDefault()
        setProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <Button onClick={toggle}>Project</Button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>About Your Organization</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input type='select' name='org_key' onChange={handleChanges} value={project.org_key}>
                                <option selected disabled value={null}> *** Select One ***</option>
                                {/* get a set of orgs */}
                                {orgs.map(org=>{
                                    return (<option value={org.oId}>{org.oTitle}</option>)
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='title'>Title</Label>
                            <Input name='title' placeholder='Project Name/Title' onChange={handleChanges} value={project.title}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='description'>Description</Label>
                            <Input name='description' placeholder='A little blurb about your project' onChange={handleChanges} value={project.description}/>
                        </FormGroup>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>{
                        toggle()
                        setProject({title:'',description:'', active: true, org_key: null})
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}

export default OrgModal