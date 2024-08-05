import React, { useState } from 'react';
import RecipeSearch from '../components/RecipeSearch';
import SignupForm from './Register';
import RecipeList from '../components/RecipeList'


const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const recipeHandler = (array) => {
    setRecipes(array);
  };

  return (
    <div>
      <h1>Home-Cook</h1>
      <RecipeSearch recipeHandler={recipeHandler} />
      {recipes.length > 0 && <RecipeList recipes={recipes} />}
    </div>
  );
};

const Signup = () => {
  return (
    <div>
      <h1>Home-Cook</h1>
      <SignupForm />
    </div>
  );
};

export { Signup, Home };
