import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import RecipeCard from '../components/RecipeCard';
import Auth from '../utils/auth';

const FavoriteRecipes = () => {
  const { loading, data, refetch } = useQuery(QUERY_USER, {
    variables: { username: Auth.getProfile().data.username },
  });
   // State to manage the list of favorite recipes
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  
 // useEffect hook to update the favorite recipes when data changes
  useEffect(() => {
    if (data) {
      setFavoriteRecipes(data.user.favoriteRecipes);
    }
  }, [data]);

  const handleRemoveFavorite = (recipeId) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe._id !== recipeId)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Favorite Recipes</h1>
      <div className="recipe-list">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            isFavorite={true}
            refetch={refetch}
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteRecipes;
