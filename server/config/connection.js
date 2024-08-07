const mongoose = require('mongoose');

// this indicates a port for mongo server
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipeApp');

module.exports = mongoose.connection;
