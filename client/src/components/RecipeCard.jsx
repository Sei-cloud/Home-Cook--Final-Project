import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_RECIPE, REMOVE_FAVORITE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { Button, Modal } from 'semantic-ui-react';

const RecipeCard = ({ recipe, isFavorite, refetch, onRemoveFavorite }) => {
  const [addFavoriteRecipe, { error: addRecipeError }] = useMutation(ADD_FAVORITE_RECIPE);
  const [removeFavoriteRecipe, { error: removeRecipeError }] = useMutation(REMOVE_FAVORITE_RECIPE);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  // Handle adding a favorite recipe
  const handleAddFavorite = async () => {
    try {
      if (!Auth.loggedIn()) {
        setMessage('You need to be logged in to add or remove recipes from favorites.');
        setShowMessage(true);
        return;
      }

      if (isFavorite) {
        setMessage('Recipe is already in your favorites!');
        setShowMessage(true);
        return;
      }

      const recipeData = {
        name: recipe.strMeal || recipe.name,
        ingredients: recipe.ingredients || [],
        instructions: recipe.strInstructions || recipe.instructions,
        imageUrl: recipe.strMealThumb || recipe.imageUrl,
        sourceUrl: recipe.strSource || recipe.sourceUrl,
      };

      await addFavoriteRecipe({
        variables: { recipeData },
      });

      setMessage('Recipe added to favorites!');
      setShowMessage(true);
      if (refetch) refetch();
    } catch (e) {
      console.error(e);
      setMessage('Failed to add recipe to favorites. It might have already added.');
      setShowMessage(true);
    }
  };

  // Handle removing a favorite recipe
  const handleRemoveFavorite = async () => {
    try {
      if (!Auth.loggedIn()) {
        setMessage('You need to be logged in to add or remove recipes from favorites.');
        setShowMessage(true);
        return;
      }

      await removeFavoriteRecipe({
        variables: { recipeId: recipe._id },
      });

      setMessage('Recipe removed from favorites!');
      setShowMessage(true);
      onRemoveFavorite(recipe._id);
      if (refetch) refetch();
    } catch (e) {
      console.error(e);
      setMessage('Failed to remove recipe from favorites.');
      setShowMessage(true);
    }
  };

  // Ensure the favorite state is accurate
  useEffect(() => {
    // This ensures that the component reflects the correct favorite state
    setMessage('');
  }, [isFavorite]);

  return (
    <div className="recipe-card">
      <h2>{recipe.strMeal || recipe.name}</h2>
      <img src={recipe.strMealThumb || recipe.imageUrl} alt={recipe.strMeal || recipe.name} />
      <p>
        <a href={recipe.strSource || recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
          Recipe Source
        </a>
      </p>
      {isFavorite ? (
        <Button onClick={handleRemoveFavorite} color="red">
          Remove
        </Button>
      ) : (
        <Button onClick={handleAddFavorite}>
          Add to Favorites
        </Button>
      )}

      <Modal open={showMessage} onClose={() => setShowMessage(false)} dimmer="blurring">
        <Modal.Header>Notification</Modal.Header>
        <Modal.Content>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setShowMessage(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default RecipeCard;
