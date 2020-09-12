import React, {useState, useEffect} from 'react';
import {useUser} from '../../../contexts/UserContext'
import {axiosAuth} from '../../../util/axiosAuth'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap'

const OrgModal = (props) => {
    const id = useUser()
    const [requestType, setRequestType] = useState('post')
    const [orgs, setOrgs] = useState([]);
    const [project, setProject] = useState({
        title: '',
        description: '',
        active: true,
        org_key: null
    })
    useEffect(()=>{
        setProject({...project, org_key: props.created.org})
        axiosAuth().get(`/users/orgRole/${id}`)
        .then(res=>{
            setOrgs(res.data)
        })
        .catch((err)=>{
            console.log("Didn't get those orgRoles for you. ", err)
        })
    }, [props.modal])

    if (props.updateProject) {
        setProject(props.updateProject)
    }
    const toggle = (nextModal = null) => {
        if (props.modal === 'project') {
            props.setModal(nextModal)
        } else {
            props.setModal('project')
        }
    }

    const handleSubmit = (e) => {
        if (!(project.org_key || project.title)) {
            return
        }
        e.preventDefault()
        axiosAuth()[requestType](`/projects/${project.org_key}`,  project)
        .then((res)=>{
            console.log('added project', res)
            props.updateCreated({org:project.org_key, project:res.data.id})
        })
        .catch(err=>{
            console.error("There was an issue submitting this issue", err)
        })
        .finally(()=>{
            toggle()
            props.goToModal('issue')
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
            {props.goalButton('project', toggle)}
            <Modal isOpen={props.modal === 'project'} toggle={props.cancelCreation}>
                <ModalHeader>About Your Project</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input type='select' name='org_key' onChange={(e)=>{
                                if(e.target.value === 'addOrg') {
                                    toggle()
                                    return (props.goToModal('org'))
                                }
                                handleChanges(e)
                            }} value={project.org_key}>
                                <option selected disabled value={null}> *** Select One ***</option>
                                {/* get a set of orgs */}
                                {orgs.map(org=>{
                                    return (<option value={org.oId}>{org.oTitle}</option>)
                                })}
                                <option value='addOrg'>* Add New *</option>
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
                        props.cancelCreation()
                        setProject({title:'',description:'', active: true, org_key: null})
                    }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}

export default OrgModal