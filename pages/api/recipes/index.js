import dbConnect from "@/utils/dbConnect";
import Recipe from "../../../models/Recipe";
import NextCors from "nextjs-cors";

// Connect to the database
dbConnect()
  .then(() => {
    console.log("Database connected successfully (/api/recipes)");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export default async function handler(req, res) {
  const { method, body } = req;

  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

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
