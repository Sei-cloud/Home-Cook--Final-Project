import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Log the form state to check the payload being sent
      console.log(formState);

      const { data } = await loginUser({
        variables: { ...formState },
      });
      console.log(data); // Log the response data
      Auth.login(data.login.token);
      navigate('/profile'); // Redirect to profile page after login
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Input
        label="Email"
        className="form-input"
        placeholder="Your email"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
      />
      <Form.Input
        label="Password"
        className="form-input"
        placeholder="******"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleChange}
      />
      <Button
        className="btn btn-block btn-primary"
        style={{ cursor: 'pointer' }}
        type="submit"
      >
        Submit
      </Button>
      {error && <div>Login failed</div>}
    </Form>
  );
};

export default Login;
