import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/styles.css';
import RecipeSearch from './components/RecipeSearch';
import { Home } from './pages/Home';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import FavoriteRecipes from './pages/FavoriteRecipes';
import AddRecipe from './components/AddRecipe';
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
      {
        path: 'profile',
        element: <ProfilePage />,
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
