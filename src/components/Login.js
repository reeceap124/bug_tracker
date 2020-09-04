import React, {useState} from 'react';
import axios from 'axios';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const Login = (props) => {
    const [message, setMessage] = useState(null); //For displaying any issues logging in
    const [creds, setCreds] = useState({ //user credentials passed into login form
        email: '',
        password: ''
    })
    //updates creds state to match the form
    const handleChanges = e => {
        e.preventDefault()
        setCreds({
            ...creds,
            [e.target.name]: e.target.value
        })
    }
    //Submits login credentials to API endpoint
    //Returns token and user data, and pushes to users dashboard
    const login = e => {
        e.preventDefault()
        setMessage('Logging In...')
        axios.post('http://localhost:3300/api/auth/login', creds)
        .then(res=>{
            setMessage('Login Success')
            localStorage.setItem('token', res.data.token)
            props.history.push(`/dash/${res.data.user.id}`) 
        })
        .catch(err=>{
            setMessage('Login Error')
            return err
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
        <Form className='authForm' onSubmit={login}>
            <h2>Login</h2>
            {message?<p>{message}</p>:null}
            <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Valid Email' onChange={handleChanges} value={creds.email}/>
            </FormGroup>
            <FormGroup>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='Enter Password' onChange={handleChanges} value={creds.password}/>
            </FormGroup>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default Login