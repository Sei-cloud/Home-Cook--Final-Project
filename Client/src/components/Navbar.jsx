import React, { useState } from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import Register from '../pages/Register';
import Login from '../pages/Login'

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  return (
    <div className="ui menu">
    <div className="item">
      <Button as={Link} to="/" basic>
        Home-Cook
      </Button>
    </div>
    <div className="right menu">
      <div className="item">
        <Button as={Link} to="/favorites">Favorites</Button>
      </div>
      <div className="item">
          <Button as={Link}to="/add-recipe">Add Recipe</Button> 
        </div>
        <div className="item">
          <Button as={Link} to="/added-recipes">My Recipes</Button> 
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
          <Login />
        </Modal.Content>
      </Modal>

      <Modal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Modal.Header>Register</Modal.Header>
        <Modal.Content>
          <Register />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Navbar;
