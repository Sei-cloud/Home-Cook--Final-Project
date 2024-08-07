import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_RECIPE, REMOVE_FAVORITE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { Button, Modal } from 'semantic-ui-react';

const RecipeCard = ({ recipe, isFavorite, refetch, onRemoveFavorite }) => {
    // useMutation hooks to add or remove a favorite recipe
  const [addFavoriteRecipe, { error: addRecipeError }] = useMutation(ADD_FAVORITE_RECIPE);
  const [removeFavoriteRecipe, { error: removeRecipeError }] = useMutation(REMOVE_FAVORITE_RECIPE);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddFavorite = async () => {
    try {
      // If user is not logged in, show message and stop
      if (!Auth.loggedIn()) {
        setShowMessage(true);
        return;
      }
      // Create an object with recipe data
      const recipeData = {
        name: recipe.strMeal || recipe.name,
        ingredients: recipe.ingredients || [],
        instructions: recipe.strInstructions || recipe.instructions,
        imageUrl: recipe.strMealThumb || recipe.imageUrl,
        sourceUrl: recipe.strSource || recipe.sourceUrl,
      };
      const { data } = await addFavoriteRecipe({
        variables: { recipeData },
      });
      console.log(data);
      alert('Recipe added to favorites!');
      // Refresh data if refetch function is provided, allows page to refresh promptly for user
      if (refetch) refetch();
    } catch (e) {
      console.error(e);
      alert('Failed to add recipe to favorites.');
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      if (!Auth.loggedIn()) {
        setShowMessage(true);
        return;
      }
      const { data } = await removeFavoriteRecipe({
        variables: { recipeId: recipe._id },
      });
      alert('Recipe removed from favorites!');
      onRemoveFavorite(recipe._id);
      if (refetch) refetch();
    } catch (e) {
      console.error(e);
      alert('Failed to remove recipe from favorites.');
    }
  };

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
        <Button onClick={handleRemoveFavorite}>Remove from Favorites</Button>
      ) : (
        <Button onClick={handleAddFavorite}>Add to Favorites</Button>
      )}

      <Modal open={showMessage} onClose={() => setShowMessage(false)}>
        <Modal.Header>Login Required</Modal.Header>
        <Modal.Content>
          <p>You need to be logged in to add or remove recipes from favorites.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setShowMessage(false)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default RecipeCard;
