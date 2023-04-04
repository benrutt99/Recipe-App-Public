import dbConnect from "@/utils/dbConnect";
import Recipe from "@/models/Recipe";

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  try {
    await dbConnect();

    switch (method) {
      case "GET": {
        const recipe = await Recipe.findById(id);

        if (!recipe) {
          return res
            .status(400)
            .json({ success: false, message: "Does not exist" });
        }

        return res.status(200).json({ success: true, data: recipe });
      }
      case "POST": {
        const recipe = await Recipe.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!recipe) {
          return res.status(400).json({ success: false });
        }

        return res.status(200).json({ success: true, data: recipe });
      }
      case "DELETE": {
        const deletedRecipe = await Recipe.deleteOne({ _id: id });

        if (!deletedRecipe) {
          return res.status(400).json({ success: false });
        }

        return res.status(200).json({ success: true, data: {} });
      }
      default: {
        return res.status(400).json({ success: false });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false });
  }
};
