import React, { useState } from 'react';
import { searchRecipes } from '../utils/api';
import RecipeList from './RecipeList';
import { Button, Modal } from 'semantic-ui-react';
import '../styles/styles.css';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === '') return;
    const results = await searchRecipes(query);
    setSearchResults(results);
    setNoResults(results.length === 0);
    if (results.length === 0) {
      setModalOpen(true);
    }
  };

  return (
    <div>
      <div className="recipe-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
        />
        <Button onClick={handleSearch}
        style={{ backgroundColor: '#cc978e', color: '#fff' }}>
          Search
        </Button>
      </div>
      <RecipeList recipes={searchResults} />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
        dimmer="blurring"
      >
        <Modal.Header>No Results Found</Modal.Header>
        <Modal.Content>
          <p>We couldn't find any recipes that match your search query. Please try again with different keywords.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalOpen(false)} primary>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default RecipeSearch;
