import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipeContext } from "@/pages";

export default function RecipeList({ recipes }) {
  //**CONTEXT**//
  const { handleRecipeAdd, handleRecipeSearch } = useContext(RecipeContext);
  return (
    <div className='recipe-list'>
      <div>
        <div className='search-bar__container'>
          <h3>Search Recipes:</h3>
          <input
            type='text'
            className='search-bar__input'
            onChange={(e) => handleRecipeSearch(e.target.value)}
          />
        </div>
        {/* itterate through all the recipes in recipes array */}
        {recipes?.map((recipe) => {
          // use spread operator to pass down all props
          return <Recipe key={recipe._id} {...recipe} />;
        })}
      </div>
      <div className='recipe-list__add-recipe-btn-container'>
        <button onClick={() => handleRecipeAdd()} className='btn btn--primary'>
          Add Recipe
        </button>
      </div>
    </div>
  );
}
