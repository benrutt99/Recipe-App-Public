//**ADD NEW RECIPE CLICK EVENT FETCH**/
export async function handleRecipeAddFetch(newRecipe) {
  try {
    const response = await fetch(`/api/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { success } = await response.json();

    if (success) {
      const recipesResponse = await fetch("/api/recipes");

      if (!recipesResponse.ok) {
        throw new Error(`HTTP error! status: ${recipesResponse.status}`);
      }

      const { data } = await recipesResponse.json();

      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

//**UPDATE RECIPE FETCH**/
export async function updateSelectedRecipeFetch(selectedRecipe) {
  try {
    if (selectedRecipe) {
      const response = await fetch(`/api/recipes/${selectedRecipe._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedRecipe),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    console.log("saved recipe to db");
  } catch (error) {
    console.error("Error updating recipe:", error);
  }
}

//**DELETE RECIPE FETCH**/
export async function deleteRecipeFetch(
  id,
  selectedRecipe,
  setSelectedRecipeId,
  setRecipes
) {
  try {
    if (selectedRecipe != null && selectedRecipe._id === id) {
      setSelectedRecipeId(undefined);
    }

    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedRecipe),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseObject = await response.json();

    if (responseObject?.success == true) {
      const response = await fetch("/api/recipes");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseObject = await response.json();

      const updateRecipes = responseObject.data;
      setRecipes(updateRecipes);
    }
  } catch (error) {
    console.error(error);
  }
}
