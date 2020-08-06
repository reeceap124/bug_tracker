import React from 'react';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

const Register = (props) => {
    return (
        <Form className='registration'>
            <h2>Sign up</h2>
            <FormGroup>
                <Label for='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Valid Email'/>
            </FormGroup>
            <FormGroup>
                <Label for='password'>Password</Label>
                <Input type='password' name='password' id='password' placeholder='Enter Password'/>
            </FormGroup>
            <FormGroup>
                <Label for='passwordCopy'>Password</Label>
                <Input type='password' name='passwordCopy' id='passwordCopy' placeholder='Re-type Password'/>
            </FormGroup>
            <FormGroup>
                <Label for='displayName'>Display Name</Label>
                <Input type='text' name='displayName' id='displayName' placeholder='Name that other users see'/>
            </FormGroup>
            <FormGroup>
                <Label for='fName'>First Name</Label>
                <Input type='text' name='fName' id='fName' placeholder='(optional)'/>
            </FormGroup>
            <FormGroup>
                <Label for='lName'>Last Name</Label>
                <Input type='text' name='lName' id='lName' placeholder='(optional)'/>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}

export default Register