import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/App.css';
import './styles/variables.css'; // Import the variables CSS file
import RecipeSearch from './components/RecipeSearch';
import { Home } from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import FavoriteRecipes from './pages/FavoriteRecipes';
import AddRecipe from './pages/AddRecipe';
import AddedRecipes from './pages/AddedRecipes';
import 'fomantic-ui-css/semantic.min.css';

// Create a root for the React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'register', // Define the path for the Register component
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        index: true,
        element: <RecipeSearch />,
      },
      {
        path: 'favorites', // Define the path for the FavoriteRecipes component
        element: <FavoriteRecipes />,
      },
      {
        path: 'add-recipe', // Define the path for the AddRecipe component
        element: <AddRecipe />,
      },
      {
        path: 'added-recipes', // Define the path for the AddedRecipes component
        element: <AddedRecipes />,
      },
    ],
  },
]);

// Render the application
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
