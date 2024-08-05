import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [modalOpen, setModalOpen] = useState(false);

  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await loginUser({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      setModalOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
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
    </>
  );
};

export default Login;
