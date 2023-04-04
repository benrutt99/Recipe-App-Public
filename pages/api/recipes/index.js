import dbConnect from "@/utils/dbConnect";
import Recipe from "../../../models/Recipe";

// Connect to the database
dbConnect();

export default async function handler({ method, body }, res) {
  switch (method) {
    case "GET":
      try {
        // Find all recipes
        const recipes = await Recipe.find({});
        res.status(200).json({ data: recipes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // Create a new recipe
        const recipe = await Recipe.create(body);
        res.status(201).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
