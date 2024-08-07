const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require ("dotenv").config()
const secret = process.env.JWT_SECRET
const expiration = '2h';

// Middleware function to authenticate requests
const authMiddleware = ({ req }) => {
  // Get the token from the request body, query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // If the token is in the authorization header, format it correctly
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  // If no token is found, return the request object as is
  if (!token) {
    return req;
  }

  try {
    // Verify the token and extract the user data
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data; // Attach the user data to the request object
  } catch {
    console.log('Invalid token'); 
  }

  return req; 
};

// Function to sign a new token
const signToken = ({ email, username, _id }) => {
  const payload = { email, username, _id }; // Create a payload with user details
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration }); // Sign the token with the secret key and set the expiration time
}

// Create a new GraphQLError for authentication failures
const authenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

module.exports = { authMiddleware, signToken, authenticationError }; 