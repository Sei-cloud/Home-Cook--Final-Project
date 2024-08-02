const bcrypt = require('bcryptjs');
const {signToken, authorizationError} = require ('../middleware/auth')
const User = require ('../models/User')

const resolvers = {
    Query: {
      message: () => 'Hello, world!'
    },
    Mutation: {
      register: async (_, { username, password, email }) => {
        console.log("made it to resolver")
        try {
          const user = await User.create({ username, password, email });
        const token = await signToken (user);
        console.log(token, user)
        return {token, user};
        } catch (error) {
          console.log(error)
          throw new Error (error)
        }
        // const user = await User.create({ username, password, email });
        // const token = await signToken (user);
        // return {token, user};
      },
      login: async (_, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error('User not found');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Incorrect password');
        }
        const token = await signToken (user);
        return {token, user};
      }
    }
  };

  module.exports = resolvers;