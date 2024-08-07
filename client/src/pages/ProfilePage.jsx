import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { QUERY_USER, UPDATE_USER } from '../utils/queries';
import { DELETE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { Button, Container, Form, Input, Modal } from 'semantic-ui-react';
import '../styles/styles.css'; 

const Profile = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username },
  });
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(true);
  const [updateUser, { error: updateError }] = useMutation(UPDATE_USER);
  const [deleteUser, { error: deleteError }] = useMutation(DELETE_USER);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [accountDeleted, setAccountDeleted] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data?.user || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        variables: {
          username: userData.username,
          email: userData.email,
        },
      });
      setEditMode(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = () => {
    setUserData({
      username: user.username,
      email: user.email,
    });
    setEditMode(false);
  };

  const handleDeleteClick = () => {
    setDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser({
        variables: { username: user.username },
      });
      Auth.logout();
      setAccountDeleted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid className="profile-page-background">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Profile Page</h1>
          <p>Manage your account details and view your favorite recipes.</p>
        </div>
      </div>
      <h1>Profile</h1>
      
      {accountDeleted ? (
        <div>
          <h2>Account deleted successfully</h2>
          <p>Redirecting to home page...</p>
        </div>
      ) : (
        <>
        <div className="profile-form-content">
          <Form onSubmit={handleSubmit} >
            <Form.Field>
              <label>Username</label>
              <Input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                disabled={editMode}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={editMode}
              />
            </Form.Field>
            {!editMode ? (
              <Button type="submit" primary>
                Save
              </Button>
            ) : (
              <br />
            )}
          </Form>
          {editMode && (
            <Button type="button" onClick={handleEditClick}>
              Edit
            </Button>
          )}
          <div>
            <br />
            <Button as={Link} to="/add-recipe" primary>
              Add Recipe
            </Button>
            <Button as={Link} to="/added-recipes" primary>
              My Recipes
            </Button>
            <Button as={Link} to="/favorites" primary>
              Favorites
            </Button>
            <Button as={Link} to="/" secondary>
              Back to Search
            </Button>
            <div className='deleteBtn'>
            <Button type="button" onClick={handleDeleteClick} negative>
              Delete Account
            </Button>
            </div>
            </div>
          </div>
          {updateError && <p>Error updating profile. Please try again.</p>}
          {deleteError && <p>Error deleting account. Please try again.</p>}
        </>
      )}
      <Modal open={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this account? This action cannot be undone.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setDeleteConfirmation(false)}>Cancel</Button>
          <Button negative onClick={confirmDelete}>Delete</Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
};

export default Profile;
