import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import { Auth } from 'aws-amplify';
import './Signup.css';

function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: ''
  })
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      props.setIsAuthenticated(true);
      props.history.push('/');
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  function validateConfirmationCode() {
    return fields.confirmationCode.length > 0;
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId='confirmationCode' bsSize='large'>
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control 
            autoFocus
            type='tel'
            value={fields.confirmationCode}
            onChange={handleFieldChange}
          />
          <Form.Text>Please check your email for the code.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          type='submit'
          bsSize='large'
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    )
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email' bsSize='large'>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            autoFocus
            type='email'
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId='password' bsSize='large'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type='password'
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword' bsSize='large'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type='password'
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          type='submit'
          bsSize='large'
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className='Signup'>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  )
}

export default Signup;