import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_RECIPE, REMOVE_FAVORITE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';

const RecipeCard = ({ recipe, isFavorite, refetch }) => {
  const [addFavoriteRecipe, {error: addRecipeError}] = useMutation(ADD_FAVORITE_RECIPE);
  const [removeFavoriteRecipe, {error: removeRecipeError}] = useMutation(REMOVE_FAVORITE_RECIPE);
  // console.log(recipe)

  const handleAddFavorite = async () => {
    try {
      const recipeData = {
        name: recipe.strMeal,
        ingredients: [],
        instructions: recipe.strInstructions,
        imageUrl: recipe.strMealThumb,
        sourceUrl: recipe.strSource
      }
      if (!Auth.loggedIn()) {
        return;
      }
      const {data} = await addFavoriteRecipe({
        variables: { recipeData: recipeData },
      });
      console.log(data)
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
        return;
      }
      await removeFavoriteRecipe({
        variables: { recipeId: recipe.idMeal },
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
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <p>
        <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
          Recipe Source
        </a>
      </p>
      {isFavorite ? (
        <button onClick={handleRemoveFavorite}>Remove from Favorites</button>
      ) : (
        <button onClick={handleAddFavorite}>Add to Favorites</button>
      )}
    </div>
  );
};

export default RecipeCard;