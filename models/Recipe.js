const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  servings: {
    type: Number,
    required: false,
  },
  cookTime: {
    type: String,
    required: false,
  },
  instructions: {
    type: String,
    required: false,
  },
  ingredients: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      amount: String,
    },
  ],
  authors: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ],
});

module.exports =
  mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
