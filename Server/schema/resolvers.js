const bcrypt = require('bcryptjs');
const {signToken, authorizationError} = require ('../middleware/auth');
const User = require ('../models/User');
const Recipe = require('../models/Recipe');
const resolvers = {
  Query: {
    message: () => 'Hello, world!',
    user: async (_, { username }) => {
      return User.findOne({ username }).populate('favoriteRecipes');
    },
    userRecipes: async (_, args, context) => {
      return Recipe.find({ createdBy: context.user._id });
    },
    // userRecipes: async (_, { userId }) => {
    //   return Recipe.find({ createdBy: userId });
    // },
  },
  Mutation: {
    register: async (_, { username, password, email }) => {
      const user = await User.create({ username, password, email });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
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
      try {
        const recipe = await Recipe.findByIdAndDelete( recipeId )
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { favoriteRecipes: recipeId }},
          { new: true }
        );
        return user;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addUserRecipe: async (_, { recipeData }, context) => {
      if (!context.user) {
        throw authorizationError;
      }
      const recipe = await Recipe.create({
        ...recipeData,
        createdBy: context.user._id,
      });
      return recipe;
    },
    updateUser: async (_, { username, email }, context) => {
      if (!context.user) {
        throw authorizationError;
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { username, email },
        { new: true }
      );
      return updatedUser;
    },
  },
};
module.exports = resolvers;