import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import './Login.css';

function Login(props) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });

  function validateForm() {
    // return email.length > 0 && password.length > 0;
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      props.setIsAuthenticated(true);
      // props.history.push('/');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className='Login'>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email' bsSize='large'>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
            // onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' bsSize='large'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password'
            value={fields.password}
            onChange={handleFieldChange}
            // onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          type='submit'
          bsSize='large'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
        {/* <Button disabled={!validateForm()} type='submit'>Submit</Button> */}
      </Form>
    </div>
  )
}

export default Login;