const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [String],
  instructions: String,
  imageUrl: String,
  sourceUrl: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
