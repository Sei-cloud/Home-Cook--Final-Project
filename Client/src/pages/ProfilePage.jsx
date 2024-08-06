import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_USER, UPDATE_USER } from '../utils/queries';
import Auth from '../utils/auth';
import { Button, Container, Form, Input } from 'semantic-ui-react';
const Profile = () => {
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username },
  });
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [updateUser, { error }] = useMutation(UPDATE_USER);
  if (loading) {
    return <div>Loading...</div>;
  }
  const user = data.user;
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
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handleEditClick = () => {
    setUserData({
      username: user.username,
      email: user.email,
    });
    setEditMode(true);
  };
  return (
    <Container>
      <h1>Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <Input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Form.Field>
        {editMode ? (
          <Button type="submit" primary>
            Save
          </Button>
        ) : (
          <Button type="button" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </Form>
      <div>
        <Button as={Link} to="/add-recipe" primary>
          Add Recipe
        </Button>
        <Button as={Link} to="/added-recipes" secondary>
          My Recipes
        </Button>
        <Button as={Link} to="/favorites" secondary>
          Favorites
        </Button>
      </div>
      {error && <p>Error updating profile. Please try again.</p>}
    </Container>
  );
};
export default Profile;