import Head from "next/head";
import RecipeList from "@/components/RecipeList";
import RecipeEdit from "@/components/RecipeEdit";

import { createContext, useState, useEffect } from "react";
import { handleRecipeAddFetch } from "../utils/Fetching";
import { updateSelectedRecipeFetch } from "../utils/Fetching";
import { deleteRecipeFetch } from "../utils/Fetching";
import Toast from "@/components/Toast";

//setting up context for our recipe props (handleRecipeAdd & handleRecipeDelete)
export const RecipeContext = createContext();

//BASICALLY A GET REQUEST
export async function getServerSideProps() {
  try {
    const response = await fetch(process.env.WEBSITE_URL);
    const responseObject = await response.json();

    return {
      props: { recipesData: responseObject.data },
    };
  } catch (error) {
    console.error("error in getServerSideProps", error);

    return {
      props: { recipesData: [] },
    };
  }
}

export default function Home({ recipesData }) {
  const [keyword, setKeyword] = useState();
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState([]);
  const [saved, isSaved] = useState(false);

  //**FUNCTION FOR SEARCHING RECIPES**//
  function handleRecipeSearch(searchTerm) {
    setKeyword(searchTerm);
  }

  const searchedRecipe = recipes
    ? recipes.filter((r) => {
        const lowerCaseRecipe = r.name.toLowerCase();
        const lowerCaseKeyword = keyword?.toLowerCase() ?? null;
        return lowerCaseRecipe.includes(lowerCaseKeyword);
      })
    : [];

  //**CURRENT SELECTED RECIPE**//
  const selectedRecipe = recipes.find(
    (recipe) => recipe._id === selectedRecipeId
  );

  //**LOAD INITIAL RECIPES DATA**//
  useEffect(() => {
    setRecipes(recipesData ?? []);
  }, [recipesData]);

  //** TOAST POP UP TIMEOUT **/
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isSaved(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [saved]);

  function saveRecipe() {
    updateSelectedRecipeFetch(selectedRecipe);
    isSaved(true);
    handleRecipeSelect(undefined);
  }

  //context props
  const RecipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleRecipeSearch,
    saveRecipe,
  };

  //**SET CURRENT SELECTED RECIPE TO STATE**/
  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
    //console.log(id);
  }

  //**ADD NEW RECIPE CLICK EVENT**/
  async function handleRecipeAdd() {
    const newRecipe = {
      name: "",
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
      {saved && <Toast saved={saved} />}
      <RecipeContext.Provider value={RecipeContextValue}>
        <RecipeList recipes={keyword ? searchedRecipe : recipes} />

        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </RecipeContext.Provider>
    </>
  );
}
