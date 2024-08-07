import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const [modalOpen, setModalOpen] = useState(false);

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
    } catch (e) {
      console.error(e);
      setModalOpen(true); // Open the modal on error
    }
  };

  const handleClose = () => setModalOpen(false);

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Input
          label="Email"
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <Form.Input
          label="Password"
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

      <Modal
        open={modalOpen}
        onClose={handleClose}
        size="small"
      >
        <Modal.Header>Login Failed</Modal.Header>
        <Modal.Content>
          <p>Wrong username or password</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleClose} negative>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Login;
