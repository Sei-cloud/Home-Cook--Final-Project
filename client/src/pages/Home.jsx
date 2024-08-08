import React, { useState } from "react";
import RecipeSearch from "../components/RecipeSearch";
import SignupForm from "./Register";
import RecipeList from "../components/RecipeList";
import "../styles/styles.css";
import Auth from "../utils/auth";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const recipeHandler = (array) => {
    setRecipes(array);
  };

  return (
    <div className="App home-page container">
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to Home-Cook</h1>
          <p>
            Discover and save your favorite recipes, or share your own culinary
            creations!
          </p>
          {!Auth.loggedIn() && ( // Conditionally render the button
            <button
              className="hero-button"
              onClick={() => (window.location.href = "/register")}
            >
              Sign Up Now
            </button>
          )}
        </div>
      </div>
      <div>
        <h1>Find your new favorite recipe!</h1>
        <RecipeSearch recipeHandler={recipeHandler} />
        {recipes.length > 0 && <RecipeList recipes={recipes} />}
      </div>
      <footer className="footer">
        <div className="github-links">
          <span>Mady by</span>
          <a
            href="https://github.com/Sam-Cowman"
            target="_blank"
            rel="noopener noreferrer"
          >
            Samantha
          </a>
          <a
            href="https://github.com/charliejb1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Charlie
          </a>
          <a
            href="https://github.com/Sei-cloud"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sei
          </a>
        </div>
      </footer>
    </div>
  );
};

const Signup = () => {
  return (
    <div className="App">
      <h1>Home-Cook</h1>
      <SignupForm />
    </div>
  );
};

export { Signup, Home };
