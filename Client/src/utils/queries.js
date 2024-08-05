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