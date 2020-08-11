import React, {useState} from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const Login = (props) => {
    const [creds, setCreds] = useState({
        email: '',
        password: ''
    })
    const handleChanges = e => {
        e.preventDefault()
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }
    const login = e => {
        e.preventDefault()
        axios.post('http://localhost:3300/api/auth/login', creds)
        .then(res=>{
            console.log("data: ", res.data)
            localStorage.setItem('token', res.data.token)
            props.history.push('/dash')
        })
        .catch(err=>{
            console.log("Login Error", err)
        })
        .finally(()=>{
            return(
                setCreds({
                    email: '',
                    password: ''
                })
            )
        })
    }

    return (
        <Form className='authForm'>
            <h2>Login</h2>
            <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Valid Email' onChange={handleChanges} value={creds.email}/>
            </FormGroup>
            <FormGroup>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='Enter Password' onChange={handleChanges} value={creds.password}/>
            </FormGroup>
            <Button onClick={login}>Submit</Button>
        </Form>
    )
}

export default Login