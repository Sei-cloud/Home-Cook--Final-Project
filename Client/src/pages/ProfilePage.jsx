import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_USER, UPDATE_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import '../styles/styles.css'; // Importing the styles.css file for all styling

const Profile = () => {
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username },
  });
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(true);
  const [updateUser, { error }] = useMutation(UPDATE_USER);

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

  return (
    <Container>
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Profile Page</h1>
          <p>Manage your account details and view your favorite recipes.</p>
        </div>
      </div>
      <h1>Profile</h1>
      <Form onSubmit={handleSubmit}>
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
      {editMode && ( <Button type="button" onClick={handleEditClick}>
            Edit
          </Button>)}
      <div>
      <br />
        <Button as={Link} to="/add-recipe" primary>
          Add Recipe
        </Button>
        <Button as={Link} to="/added-recipes" secondary>
          My Recipes
        </Button>
        <Button as={Link} to="/favorites" secondary>
          Favorites
        </Button>
        <Button as={Link} to="/" secondary>
          Back to Search
        </Button>
      </div>
      {error && <p>Error updating profile. Please try again.</p>}
    </Container>
  );
};

export default Profile;