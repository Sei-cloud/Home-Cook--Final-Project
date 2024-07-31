import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/App.css';
import savedRecipes from './pages/savedRecipes';
import RecipeSearch from './pages/RecipeSearch';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <RecipeSearch />,
      },
      {
        path: '/recipes',
        element: <savedRecipes />,
    },

  ],
},
]);