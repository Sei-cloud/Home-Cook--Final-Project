import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Register = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [registerUser, {error, data}] =useMutation (REGISTER_USER)

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await registerUser({
        variables: { ...formState },
      });
      console.log (data)
      Auth.login(data.register.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
  
              <Form onSubmit={handleFormSubmit}>
                <Form.Input
                  label="Username"
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
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
              </Form>
            
  );
};

export default Register;