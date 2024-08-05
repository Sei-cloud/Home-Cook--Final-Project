import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
     _id
      username
      email
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
export const QUERY_USER_RECIPES = gql`
  query userRecipes($userId: ID!) {
    userRecipes(userId: $userId) {
      _id
      name
      ingredients
      instructions
    }
  }
`;
