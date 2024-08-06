import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import 'fomantic-ui-css/semantic.min.css';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Auth from '../utils/auth'; // Ensure Auth is imported

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
        {/* Show these buttons only if the user is logged in */}
        {Auth.loggedIn() ? (
          <>
          {/* //   <div className="item">
          //     <Button as={Link} to="/favorites">Favorites</Button>
          //   </div>
          //   <div className="item">
          //     <Button as={Link} to="/add-recipe">Add Recipe</Button>
          //   </div>
          //   <div className="item">
          //     <Button as={Link} to="/added-recipes">My Recipes</Button>
          //   </div> */}
            <div className="item">
              <Button as={Link} to="/profile">Profile</Button>
            </div>
            <div className="item">
              <Button onClick={() => Auth.logout()}>Logout</Button>
            </div>
          </>
        ) : (
          <>
            <div className="item">
              <Button onClick={() => setOpenLogin(true)}>Login</Button>
            </div>
            <div className="item">
              <Button onClick={() => setOpenRegister(true)}>Register</Button>
            </div>
          </>
        )}
      </div>

      {/* Login Modal */}
      <Modal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        size="small"
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <Login />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenLogin(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Register Modal */}
      <Modal
        open={openRegister}
        onClose={() => setOpenRegister(false)}
        size="small"
      >
        <Modal.Header>Register</Modal.Header>
        <Modal.Content>
          <Register />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpenRegister(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Navbar;
