import Head from "next/head";
import RecipeList from "@/components/RecipeList";
import RecipeEdit from "@/components/RecipeEdit";

import { createContext, useState, useEffect } from "react";
import { handleRecipeAddFetch } from "../utils/Fetching";
import { updateSelectedRecipeFetch } from "../utils/Fetching";
import { deleteRecipeFetch } from "../utils/Fetching";

//setting up context for our recipe props (handleRecipeAdd & handleRecipeDelete)
export const RecipeContext = createContext();

//BASICALLY A GET REQUEST
export async function getServerSideProps() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL);
    const responseObject = await response.json();

    return {
      props: { recipesData: responseObject.data },
    };
  } catch (error) {
    console.error(error);

    return {
      props: { recipesData: [] },
    };
  }
}

export default function Home({ recipesData }) {
  const [keyword, setKeyword] = useState();
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState([]);

  //**FUNCTION FOR SEARCHING RECIPES**//
  function handleRecipeSearch(searchTerm) {
    setKeyword(searchTerm);
  }

  const searchedRecipe = recipes.filter((r) => {
    const lowerCaseRecipe = r.name.toLowerCase();
    const lowerCaseKeyword = keyword?.toLowerCase() ?? null;
    return lowerCaseRecipe.includes(lowerCaseKeyword);
  });

  //**CURRENT SELECTED RECIPE**//
  const selectedRecipe = recipes.find(
    (recipe) => recipe._id === selectedRecipeId
  );

  //**LOAD INITIAL RECIPES DATA**//
  useEffect(() => {
    setRecipes(recipesData ?? []);
  }, [recipesData]);

  //**WHEN RECIPE CHANGES**//
  useEffect(() => {
    if (selectedRecipe) {
      console.log(selectedRecipe.id);
      updateSelectedRecipeFetch(selectedRecipe);
    }
  }, [selectedRecipe, recipes]);

  //context props
  const RecipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeSearch,
  };

  //**SET CURRENT SELECTED RECIPE TO STATE**/
  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
    console.log(id);
  }

  //**ADD NEW RECIPE CLICK EVENT**/
  async function handleRecipeAdd() {
    const newRecipe = {
      name: "New Recipe",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [],
      authors: [],
    };
    try {
      const newRecipes = await handleRecipeAddFetch(newRecipe);
      setRecipes(newRecipes);
    } catch (error) {
      console.error(error);
      // Handle the error here (e.g. show a toast message)
    }
  }

  //**HELPER FUNCTION FOR HANDLING CHANGES**/
  function handleRecipeChange(id, recipe) {
    setRecipes((prevRecipes) =>
      prevRecipes.map((prevRecipe) =>
        prevRecipe._id === id ? recipe : prevRecipe
      )
    );
  }

  //**ADD RECIPE DELETE CLICK EVENT**/
  function handleRecipeDelete(id) {
    deleteRecipeFetch(id, selectedRecipe, setSelectedRecipeId, setRecipes);
  }

  return (
    <>
      <Head>
        <title>Recipe Tracker</title>
      </Head>
      <RecipeContext.Provider value={RecipeContextValue}>
        <RecipeList recipes={keyword ? searchedRecipe : recipes} />

        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </RecipeContext.Provider>
    </>
  );
}
