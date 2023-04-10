import React, { useContext, useEffect } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import AuthorEdit from "./AuthorEdit";
import { RecipeContext } from "@/pages";

export default function RecipeEdit({ recipe }) {
  //**CONTEXT**//
  const { handleRecipeChange, saveRecipe } = useContext(RecipeContext);

  //**HANDLE CHANGE HELPER FUNCTION**//
  function handleChange(changes) {
    handleRecipeChange(recipe._id, { ...recipe, ...changes });
    //console.log(recipe);
  }

  //**HANDLE INGREDIENT CHANGE**//
  function handleIngredientChange(idx, ingredient) {
    const newIngredients = [...recipe.ingredients];
    newIngredients[idx] = ingredient;
    handleChange({ ingredients: newIngredients });
  }

  //**HANDLE INGREDIENT ADD**//
  function handleIngredientAdd() {
    const newIngredient = {
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  }

  //**HANDLE INGREDIENT DELETE**//
  function handleIngredientDelete(idx) {
    handleChange({
      ingredients: recipe.ingredients.filter((_, index) => index !== idx),
    });
  }

  //**HANDLE AUTHOR CHANGE**//
  function handleAuthorChange(idx, author) {
    const newAuthors = [...recipe.authors];

    newAuthors[idx] = author;
    handleChange({ authors: newAuthors });
  }

  //**HANDLE AUTHOR ADD**//
  function handleAuthorAdd() {
    const newAuthor = {
      name: "",
    };
    handleChange({ authors: [...recipe.authors, newAuthor] });
  }

  //**HANDLE AUTHOR DELETE**//
  function handleAuthorDelete(idx) {
    handleChange({
      authors: recipe.authors.filter((_, index) => index !== idx),
    });
  }

  const handleServings = (input) => {
    const value = input.replace(/\D/g, "");
    handleChange({ servings: value });
  };

  return (
    <div className='recipe-edit'>
      <div className='save--btn-container'>
        <button className='btn btn--save' onClick={() => saveRecipe()}>
          Save Recipe
        </button>
      </div>
      {/* <div className='recipe-edit__remove-button-container'>
        <button
          className='btn recipe-edit__remove-button'
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div> */}
      <div className='recipe-edit__details-grid'>
        <label htmlFor='name' className='recipe-edit__label'>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className='recipe-edit__input'
          value={recipe?.name}
          onChange={(e) => handleChange({ name: e.target.value })}
        />

        <label htmlFor='cookTime' className='recipe-edit__label'>
          Cook Time
        </label>
        <input
          type='text'
          name='cookTime'
          id='cookTime'
          className='recipe-edit__input'
          value={recipe?.cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
        />

        <label htmlFor='servings' className='recipe-edit__label'>
          Servings
        </label>
        <input
          type='number'
          name='servings'
          id='servings'
          min={1}
          className='recipe-edit__input'
          value={recipe?.servings}
          onChange={(e) => handleServings(e.target.value)}
        />

        <label htmlFor='instructions' className='recipe-edit__label'>
          Instructions
        </label>
        <textarea
          name='instructions'
          id='instructions'
          className='recipe-edit__input'
          onChange={(e) => handleChange({ instructions: e.target.value })}
          value={recipe?.instructions}
        ></textarea>
      </div>
      <br />
      <label className='recipe-edit__label'>Ingredients</label>
      <div className='recipe-edit__ingredient-grid'>
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient, idx) => (
          <RecipeIngredientEdit
            key={idx}
            idx={idx}
            handleIngredientChange={handleIngredientChange}
            ingredient={ingredient}
            handleIngredientDelete={handleIngredientDelete}
          />
        ))}
      </div>
      <div className='recipe-edit__add-ingredient-btn-container'>
        <button className='btn btn--primary' onClick={handleIngredientAdd}>
          Add Ingredient
        </button>
      </div>
      <br />
      {/* Author */}

      <div className='recipe-edit__author-grid'>
        <div>Authors</div>
        {recipe.authors.map((author, idx) => (
          <AuthorEdit
            key={idx}
            idx={idx}
            author={author}
            handleAuthorChange={handleAuthorChange}
            handleAuthorDelete={handleAuthorDelete}
          />
        ))}
      </div>
      <div className='recipe-edit__add-ingredient-btn-container'>
        <button className='btn btn--primary' onClick={handleAuthorAdd}>
          Add Author
        </button>
      </div>
    </div>
  );
}
