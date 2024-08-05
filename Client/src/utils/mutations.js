import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_FAVORITE_RECIPE = gql`
  mutation AddFavoriteRecipe($recipeData: RecipeInput!) {
  addFavoriteRecipe(recipeData: $recipeData) {
    _id
    email
    username
    favoriteRecipes {
      _id
    }
  }
}
`;

export const REMOVE_FAVORITE_RECIPE = gql`
  mutation removeFavoriteRecipe($recipeId: ID!) {
    removeFavoriteRecipe(recipeId: $recipeId) {
      _id
      favoriteRecipes {
        _id
        name
        ingredients
        instructions
        imageUrl
        sourceUrl
      }
    }
  }
`;