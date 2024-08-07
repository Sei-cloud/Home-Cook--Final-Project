const bcrypt = require('bcryptjs');
const {signToken, authorizationError} = require ('../middleware/auth');
const User = require ('../models/User');
const Recipe = require('../models/Recipe');

const resolvers = {
  Query: {
    message: () => 'Hello, world!',

    // Query to get a user by username and populate their favorite recipes
    user: async (_, { username }) => {
      return User.findOne({ username }).populate('favoriteRecipes');
    },

    // Query to get recipes created by the authenticated user
    userRecipes: async (_, args, context) => {
      return Recipe.find({ createdBy: context.user._id });
    },
  },

  
  Mutation: {
    // Mutation to register a new user
    register: async (_, { username, password, email }) => {
      try {
        const user = await User.create({ username, password, email }); 
        const token = signToken(user); 
        return { token, user }; 
      } catch (error) {
        console.log(error); 
      }
    },

    // Mutation to log in a user
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email }); 
      if (!user) {
        throw new Error('User not found'); 
      }
      const valid = await bcrypt.compare(password, user.password); // Compare the provided password with the stored hashed password
      if (!valid) {
        throw new Error('Incorrect password'); 
      }
      const token = signToken(user); 
      return { token, user }; 
    },

    // Mutation to add a favorite recipe for the authenticated user
    addFavoriteRecipe: async (_, { recipeData }, context) => {
      if (!context.user) {
        throw authorizationError; // Throw an authorization error if the user is not authenticated
      }
      try {
        const recipe = await Recipe.create(recipeData); // Create a new recipe
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { favoriteRecipes: recipe._id } }, // Add the recipe to the user's favorite recipes
          { new: true }
        );
        return user; // Return the updated user
      } catch (error) {
        throw new Error(error); // Throw an error if something goes wrong
      }
    },

    // Mutation to remove a favorite recipe for the authenticated user
    removeFavoriteRecipe: async (_, { recipeId }, context) => {
      if (!context.user) {
        throw authorizationError; // Throw an authorization error if the user is not authenticated
      }
      try {
        const recipe = await Recipe.findByIdAndDelete(recipeId); // Delete the recipe
        const user = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { favoriteRecipes: recipeId } }, // Remove the recipe from the user's favorite recipes
          { new: true }
        );
        return user; // Return the updated user
      } catch (error) {
        throw new Error(error.message); // Throw an error if something goes wrong
      }
    },

    // Mutation to add a new recipe for the authenticated user
    addUserRecipe: async (_, { recipeData }, context) => {
      if (!context.user) {
        throw authorizationError; // Throw an authorization error if the user is not authenticated
      }
      const recipe = await Recipe.create({
        ...recipeData,
        createdBy: context.user._id, // Set the creator of the recipe to the authenticated user
      });
      return recipe; // Return the newly created recipe
    },

    // Mutation to update the authenticated user's details
    updateUser: async (_, { username, email }, context) => {
      if (!context.user) {
        throw authorizationError; // Throw an authorization error if the user is not authenticated
      }
      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { username, email }, // Update the user's username and email
        { new: true }
      );
      return updatedUser; // Return the updated user
    },

    // Mutation to delete a user by username (only if authenticated)
    deleteUser: async (parent, { username }, context) => {
      if (context.user) {
        try {
          await User.deleteOne({ username }); // Delete the user by username
          return true; // Return true if successful
        } catch (err) {
          console.error(err);
          return false; // Return false if an error occurs
        }
      }
      throw new AuthenticationError('Not logged in'); 
    }
  },
};

module.exports = resolvers; 