const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require ("dotenv").config()
const secret = process.env.JWT_SECRET
console.log('SECRET', secret)
const expiration = '2h';

const authMiddleware = ({req}) => {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
      }

  if (!token) {
    return req;
  }

  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration }) 
    req.user = data;
  } catch {
    console.log('Invalid token');
  }
  return req;
};

const signToken = ({ email, username, _id }) => {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

const authenticationError = new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  })

module.exports = {authMiddleware, signToken, authenticationError}
