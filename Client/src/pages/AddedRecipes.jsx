import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER_RECIPES } from '../utils/queries';
import MyFavorites from '../components/MyFavorites'
import Auth from '../utils/auth';

const AddedRecipes = () => {
  const { loading, data } = useQuery(QUERY_USER_RECIPES, {
    variables: { userId: Auth.getProfile().data._id },
  });
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    if (data) {
      setUserRecipes(data.userRecipes);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Added Recipes</h1>
      <div className="recipe-list">
        {userRecipes.map((recipe) => (
          <MyFavorites key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default AddedRecipes;
