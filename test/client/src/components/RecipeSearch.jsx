import React, { useState } from 'react';
import { searchRecipes } from '../utils/api';

const RecipeSearch = ({ recipeHandler }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query.trim() === '') return;
    const results = await searchRecipes(query);
    console.log(recipeHandler)
    recipeHandler(results);
  };

  return (
    <div className="recipe-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default RecipeSearch;
