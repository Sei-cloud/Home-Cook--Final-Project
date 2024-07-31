import React from 'react';
import RecipeSearch from '../components/Recipe/RecipeSearch';
import SignupForm from '../components/SignupForm';

const Home = () => {
  return (
    <div>
      <h1>Home-Cook-Test</h1>
      <RecipeSearch />
      
      {}
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
