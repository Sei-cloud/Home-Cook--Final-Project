import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button, Message, Container } from 'semantic-ui-react';
import { ADD_USER_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';

const AddRecipe = () => {
  const [formState, setFormState] = useState({
    name: '',
    ingredients: '',
    instructions: ''
  });

  const [addUserRecipe, { error }] = useMutation(ADD_USER_RECIPE);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const ingredientsArray = formState.ingredients.split(',').map(item => item.trim());

    try {
      const { data } = await addUserRecipe({
        variables: {
          recipeData: {
            name: formState.name,
            ingredients: ingredientsArray,
            instructions: formState.instructions
          }
        },
      });

      setSuccessMessage('Recipe added successfully!');
      setFormState({
        name: '',
        ingredients: '',
        instructions: ''
      });
    } catch (e) {
      console.error('Error adding recipe:', e); // Log detailed error message
      alert('Failed to add recipe.');
    }
  };

  return (
    <Container>
      <h2>Add a New Recipe</h2>
      <Form onSubmit={handleFormSubmit} success={!!successMessage} error={!!error}>
        <Form.Input
          label="Recipe Name"
          name="name"
          placeholder="Recipe Name"
          value={formState.name}
          onChange={handleChange}
          required
        />
        <Form.Input
          label="Ingredients"
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          value={formState.ingredients}
          onChange={handleChange}
          required
        />
        <Form.TextArea
          label="Instructions"
          name="instructions"
          placeholder="Instructions"
          value={formState.instructions}
          onChange={handleChange}
          required
        />
        <Button type="submit" primary>Add Recipe</Button>
        <Message success header="Success!" content={successMessage} />
        {error && <Message error header="Error" content="Failed to add recipe." />}
      </Form>
    </Container>
  );
};

export default AddRecipe;
