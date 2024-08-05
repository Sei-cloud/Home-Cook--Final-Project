const bcrypt = require('bcryptjs');
const {signToken, authorizationError} = require ('../middleware/auth');
const User = require ('../models/User');
const Recipe = require('../models/Recipe');

const resolvers = {
  Query: {
    message: () => 'Hello, world!',
    user: async (_, { username }) => {
      return User.findOne({ username }).populate('favoriteRecipes');
    }
  },
  Mutation: {
    register: async (_, { username, password, email }) => {
      const user = await User.create({ username, password, email });
      const token = signToken(user);
      return { token, user };
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
      const token = signToken(user);
      return { token, user };
    },
    addFavoriteRecipe: async (_, { recipeData }, context) => {
      if (!context.user) {
        throw authorizationError;
      }
      try {
        const recipe = await Recipe.create (recipeData)
        const user = await User.findByIdAndUpdate(context.user._id, 
          {$push: {favoriteRecipes:recipe._id}},
          {new:true}
        );
        return user
      } catch (error) {
        throw new Error(error)
      }
      
    },
    removeFavoriteRecipe: async (_, { recipeId }, context) => {
      if (!context.user) {
        throw authorizationError;
      }
      const user = await User.findById(context.user._id);
      user.favoriteRecipes.pull(recipeId);
      await user.save();
      return user.populate('favoriteRecipes');
    }
  }
};

module.exports = resolvers;
