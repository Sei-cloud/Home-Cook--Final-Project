import React, { useState } from 'react';
import RecipeSearch from '../components/RecipeSearch';
import SignupForm from './Register';
import RecipeList from '../components/RecipeList'
import '../styles/styles.css'


const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const recipeHandler = (array) => {
    setRecipes(array);
  };

  return (
    <div className="App home-page"> {/* Apply both App and home-page classes here */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to Home-Cook</h1>
          <p>Discover and save your favorite recipes, or share your own culinary creations!</p>
          <button className="hero-button" onClick={() => window.location.href = '/register'}>
            Sign Up Now
          </button>
        </div>
      </div>
      <div>
      <h1>Find your new favorite recipe!</h1>
      <RecipeSearch recipeHandler={recipeHandler} />
      {recipes.length > 0 && <RecipeList recipes={recipes} />}
      </div>
    </div>
  );
};

const Signup = () => {
  return (
    <div className="App"> {/* Apply only the App class here */}
      <h1>Home-Cook</h1>
      <SignupForm />
    </div>
  );
};

export { Signup, Home };