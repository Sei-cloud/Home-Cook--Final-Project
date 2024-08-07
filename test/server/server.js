// Import necessary modules
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const {authMiddleware} = require ('./middleware/auth')
const {typeDefs, resolvers} = require ('./schema')
require('dotenv').config(); // Load environment variables
const db = require('./config/connection');

// Initialize the Express application
const app = express();
const port = process.env.PORT || 3001;

// Use built-in JSON middleware
app.use(express.json());

// Set up the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  })); 

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

db.once('open', () => {
    app.listen(port, () => {
      console.log(`API server running on port ${port}!`);
      console.log(`Use GraphQL at http://localhost:${port}/graphql`);
    });
  });
}

startApolloServer();
