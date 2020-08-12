import React, {useState} from 'react';
import axios from 'axios'
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const Register = (props) => {
    const [message, setMessage] = useState(null)
    const [creds, setCreds] = useState({
        email: '',
        password: '',
        passCopy: '',
        display_name: '',
        first_name: '',
        last_name: ''
    })
    const handleChanges = e => {
        e.preventDefault()
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }
    const register = e => {
        e.preventDefault()
        if (creds.password !== creds.passCopy) {
            return setMessage('Passwords Must Match')
        }
        axios.post('http://localhost:3300/api/auth/register', {
            email: creds.email,
            password: creds.password,
            display_name: creds.display_name,
            first_name: creds.first_name,
            last_name: creds.last_name
        })
        .then(res=>{
            props.history.push(`/dash/${res.data.id}`)
        })
        .catch(err=>{
            setMessage('Registration Error')
            return err
        })
        .finally(()=>{
            return(
                setCreds({
                    email: '',
                    password: '',
                    display_name: '',
                    first_name: '',
                    last_name: ''
                })
            )
        })
    }
    return (
        <Form className='authForm' onSubmit={register}>
            <h2>Sign up</h2>
            {message?<p>{message}</p>:null}
            <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Valid Email' onChange={handleChanges} value={creds.email}/>
            </FormGroup>
            <FormGroup>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='Enter Password' onChange={handleChanges} value={creds.password}/>
            </FormGroup>
            <FormGroup>
                <Label for='passCopy'>Password</Label>
                <Input type='password' name='passCopy' id='passCopy' placeholder='Re-type Password' onChange={handleChanges} value={creds.passCopy}/>
            </FormGroup>
            <FormGroup>
                <Label for='display_name'>Display Name</Label>
                <Input type='text' name='display_name' id='display_name' placeholder='Name that other users see' onChange={handleChanges} value={creds.display_name}/>
            </FormGroup>
            <FormGroup>
                <Label for='fName'>First Name</Label>
                <Input type='text' name='fName' id='fName' placeholder='(optional)' onChange={handleChanges} value={creds.first_name}/>
            </FormGroup>
            <FormGroup>
                <Label for='lName'>Last Name</Label>
                <Input type='text' name='lName' id='lName' placeholder='(optional)' onChange={handleChanges} value={creds.last_name}/>
            </FormGroup>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default Register