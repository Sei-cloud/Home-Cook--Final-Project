import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_RECIPE, REMOVE_FAVORITE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { Button, Modal } from 'semantic-ui-react';

const RecipeCard = ({ recipe, isFavorite, refetch }) => {
  const [addFavoriteRecipe, { error: addRecipeError }] = useMutation(ADD_FAVORITE_RECIPE);
  const [removeFavoriteRecipe, { error: removeRecipeError }] = useMutation(REMOVE_FAVORITE_RECIPE);
  const [showMessage, setShowMessage] = useState(false);

  const handleAddFavorite = async () => {
    try {
      if (!Auth.loggedIn()) {
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
      const { data } = await addFavoriteRecipe({
        variables: { recipeData },
      });
      console.log(data);
      alert('Recipe added to favorites!');
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
      <Button onClick={handleAddFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>

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
