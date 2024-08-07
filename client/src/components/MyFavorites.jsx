import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_FAVORITE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';

const MyFavorites = ({ recipe, isFavorite, refetch }) => {

  const [removeFavoriteRecipe, {error: removeRecipeError}] = useMutation(REMOVE_FAVORITE_RECIPE);

  const handleRemoveFavorite = async () => {
    try {
      if (!Auth.loggedIn()) {
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
      <img src={recipe.strMealThumb || recipe.imageUrl || `/recipe-placeholder.jpg`} alt={recipe.strMeal || recipe.name} />
      <p>
        <a href={recipe.strSource || recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
          Recipe Source
        </a>
      </p>
      {recipe?.ingredients.length && (recipe.ingredients.map((ingredient, index)=>(
        <p key={index}>
            {ingredient}
        </p>
      )))}
      <p>
        {recipe.instructions ? recipe.instructions: ""}
      </p>
      
        <button onClick={handleRemoveFavorite}>Remove from Favorites</button>
    </div>
  );
};

export default MyFavorites;
