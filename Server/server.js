// Import necessary modules
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
require('dotenv').config(); // Load environment variables

// Initialize the Express application
const app = express();
const port = process.env.PORT || 3001;

// Define a GraphQL schema
const schema = buildSchema(`
  type Query {
    message: String
    searchRecipes(query: String!): [Recipe]
  }

  type Recipe {
    idMeal: String
    strMeal: String
    strMealThumb: String
    strSource: String
  }
`);

// Define resolver functions
const root = {
  message: () => 'Hello, world!',
  searchRecipes: async ({ query }) => {
    // Fetch recipes from TheMealDB API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    return data.meals || [];
  }
};

// Set up the /graphql endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL IDE
}));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
