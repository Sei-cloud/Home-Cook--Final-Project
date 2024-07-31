import React, { useState } from 'react';
import RecipeSearch from './components/RecipeSearch';
import RecipeList from './components/RecipeList';
import Navbar from './components/Navbar';
import './styles/App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearchResults = (results) => {
    setRecipes(results);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="ui container">
        {/* <h1>Home-Cook</h1> */}
        <RecipeSearch onSearchResults={handleSearchResults} />
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export default App;
