import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/App.css';
import './styles/variables.css'; // Import the variables CSS file
import RecipeSearch from './components/RecipeSearch';
import Register from './pages/Register';
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
        element: <RecipeSearch />,
      },
      {
        path: 'register', // Define the path for the Register component
        element: <Register />,
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
