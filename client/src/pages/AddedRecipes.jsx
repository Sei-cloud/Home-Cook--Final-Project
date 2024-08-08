import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER_RECIPES } from '../utils/queries';
import MyFavorites from '../components/MyFavorites'


const AddedRecipes = () => {
  const { loading, data, refetch } = useQuery(QUERY_USER_RECIPES);

  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    refetch()
    if (data) {
      setUserRecipes(data.userRecipes);
    }
  }, );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Added Recipes</h1>
      <div className="recipe-list">
        {userRecipes.map((recipe) => (
          <MyFavorites key={recipe._id} recipe={recipe} refetch = {refetch} />
        ))}
      </div>
    </div>
  );
};

export default AddedRecipes;
