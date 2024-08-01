import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/App.css';
import RecipeSearch from './components/RecipeSearch';

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
        element: <RecipeSearch />,
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
