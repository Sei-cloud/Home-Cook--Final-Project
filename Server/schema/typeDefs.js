const typeDefs =`
  type User {
    _id: ID!
    username: String
    email: String
    favoriteRecipes: [Recipe]
  }

  type Recipe {
    _id: ID!
    name: String
    ingredients: [String]
    instructions: String
    imageUrl: String
    sourceUrl: String
    createdBy: User
  }

    input RecipeInput {
    name: String
    ingredients: [String]
    instructions: String
    imageUrl: String
    sourceUrl: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    message: String
    user(username: String!): User
     userRecipes(userId: ID!): [Recipe]
  }

  type Mutation {
    register(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
    addFavoriteRecipe(recipeData: RecipeInput!): User
    removeFavoriteRecipe(recipeId: ID!): User
    addUserRecipe(recipeData: RecipeInput!): Recipe
  }
`;

module.exports = typeDefs;