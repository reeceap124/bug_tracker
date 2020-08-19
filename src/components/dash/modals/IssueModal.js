import React, {useState, useEffect} from 'react';
import {axiosAuth} from '../../../util/axiosAuth';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input} from 'reactstrap';

const IssueModal = (props) => {
    const [requestType, setRequestType] = useState('post')
    const [orgs, setOrgs] = useState([])
    const [projects, setProjects] = useState([])
    const [issue, setIssue] = useState({
        title : '', 
        content : '',
        open : true,
        importance : null, //integer
        project_key : null, //integer
        created_by: props.id //integer
        //need an updated at. may be able to write update EP to set this on the BE
    })

    useEffect(()=>{
        axiosAuth().get(`/users/orgRole/${props.id}`)
        .then(res=>{
            setOrgs(res.data)
        })
        .catch(err=>{
            console.log("Didn't get those orgRoles for you.", err)
        })
    }, [])

    const getProjects = (id) => {
        axiosAuth().get(`/projects/${id}`)
        .then(res=>{
            setProjects(res.data)
        })
        .catch(err=>console.log('didn get those projects', err))
    }

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const handleChanges =  e => {
        e.preventDefault();
        setIssue({
            ...issue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(issue)
        axiosAuth()[requestType](`issues/${issue.project_key}`, issue)
        .then((res)=>{
            console.log('added issue', res)
        })
        .catch(err=>{
            return console.error("There was an issue submitting this issue", err)
        })
    }
    
    return (
        <div>
            <Button onClick={toggle}>Issue</Button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>Create New Issue</ModalHeader>
                <ModalBody>
                    <Label>Organization</Label>
                    <Input type='select' onChange={(e)=>{
                        getProjects(e.target.value)
                        }}>
                            <option selected disabled value={null}> *** Select One ***</option>
                            {orgs.map(org=>{
                                return(<option value={org.oId}>{org.oTitle}</option>)
                            })}
                    </Input>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='project_key'>Project</Label>
                            <Input type='select' name='project_key' onChange={handleChanges} value={issue.project_key}>
                                <option selected disabled value={null}>*** Select One ***</option>
                                {projects.map(project=>{
                                    return (
                                        <option value={project.id}>{project.title}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='title'>Title</Label>
                            <Input name='title' placeholder='Title text' onChange={handleChanges} value={issue.title}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for='content'>Content</Label>
                            <Input name='content' placeholder='Issue content' onChange={handleChanges} value={issue.content}/>
                        </FormGroup>
                        {/* <FormGroup check>
                            <Label check>
                                <Input type='checkbox' name='open' onChange={handleChanges} value={issue.open}/>
                                Active
                            </Label>
                        </FormGroup> */}
                        <FormGroup>
                            <Label for='importance'>Importance Level</Label>
                            <Input type='select' name='importance' onChange={handleChanges} value={issue.importance}>
                                <option selected disabled value={null}>*** Select One ***</option>
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </Input>
                        </FormGroup>
                        
                        <Button>{requestType?'Create':'Update'}</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}

export default IssueModal