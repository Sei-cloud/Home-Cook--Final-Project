import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import Register from '../pages/Register';

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div className="ui menu">
      <div className="header item">Home-Cook</div>
      <div className="right menu">
        <div className="item">
          <Link to="/favorites">Favorites</Link>
        </div>
        <div className="item">
          <Button onClick={() => setOpenLogin(true)}>Login</Button>
        </div>
        <div className="item">
          <Button onClick={() => setOpenRegister(true)}>Register</Button>
        </div>
      </div>

      <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          {/* <Form>
            <Form.Input label="Email" type="email" />
            <Form.Input label="Password" type="password" />
            <Button type="submit">Login</Button>
          </Form> */}
        </Modal.Content>
      </Modal>

      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Modal.Header>Register</Modal.Header>
        <Modal.Content>
          {/* <Form>
            <Form.Input label="Email" type="email" />
            <Form.Input label="Password" type="password" />
            <Form.Input label="Confirm Password" type="password" />
            <Button type="submit">Register</Button>
          </Form> */}
          <Register />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Navbar;
