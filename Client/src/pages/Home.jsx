import React from 'react';
import RecipeSearch from '../components/RecipeSearch';
import SignupForm from './Register';

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
