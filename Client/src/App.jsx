import React, { useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import RecipeSearch from './components/RecipeSearch';
import RecipeList from './components/RecipeList';
import Navbar from './components/Navbar';
import './styles/App.css';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearchResults = (results) => {
    setRecipes(results);
  };

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Navbar />
      <div className="ui container">
        {/* <h1>Home-Cook</h1> */}
        {/* <RecipeSearch onSearchResults={handleSearchResults} />
        <RecipeList recipes={recipes} /> */}
        <Outlet/>
      </div>
    </div>
    </ApolloProvider>
  );
};

export default App;
