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
        username
        email
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($username: String!) {
    deleteUser(username: $username)
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
      email
      username
      favoriteRecipes {
        _id
      }
    }
  }
`;

export const ADD_USER_RECIPE = gql`
  mutation addUserRecipe($recipeData: RecipeInput!) {
    addUserRecipe(recipeData: $recipeData) {
      _id
      name
      ingredients
      instructions
      imageUrl
      createdBy {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER_RECIPE = gql`
  mutation deleteUserRecipe($recipeId: ID!) {
    deleteUserRecipe(recipeId: $recipeId) {
      _id
      name
    }
  }
`;