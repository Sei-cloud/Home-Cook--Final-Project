import React, { useState } from 'react';
import RecipeList from './components/RecipeList';
import './styles/App.css';


const App = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearchResults = (results) => {
    setRecipes(results);
  };

  return (
    <div className="App">
      <h1>Home-Cook</h1>
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default App;
