import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_FAVORITE_RECIPE } from '../utils/mutations';
import Auth from '../utils/auth';
import { Button, Modal } from 'semantic-ui-react';

const MyFavorites = ({ recipe, refetch }) => {
  const [removeFavoriteRecipe, { error: removeRecipeError }] = useMutation(REMOVE_FAVORITE_RECIPE);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRemoveFavorite = async () => {
    try {
      if (!Auth.loggedIn()) {
        return;
      }
      await removeFavoriteRecipe({
        variables: { recipeId: recipe._id },
      });
      if (refetch) refetch();
      setModalOpen(false);
    } catch (e) {
      console.error(e);
      alert('Failed to remove recipe from favorites.');
    }
  };

  return (
    <div className="recipe-card">
      <h2>{recipe.strMeal || recipe.name}</h2>
      <img
        src={recipe.strMealThumb || recipe.imageUrl || `/recipe-placeholder.jpg`}
        alt={recipe.strMeal || recipe.name}
      />

      {recipe?.ingredients.length &&
        recipe.ingredients.map((ingredient, index) => (
          <p key={index}>{ingredient}</p>
        ))}
      <p>{recipe.instructions ? recipe.instructions : ''}</p>
      <Button color="red" onClick={() => setModalOpen(true)}>
        Remove
      </Button>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size="small"
        dimmer="blurring"
      >
        <Modal.Header>Confirm Removal</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to remove this recipe from your favorites?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button color="red" onClick={handleRemoveFavorite}>
            Remove
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default MyFavorites;
