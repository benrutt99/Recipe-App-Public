import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import AuthorEdit from "./AuthorEdit";
import { RecipeContext } from "@/pages";

export default function RecipeEdit({ recipe }) {
  //**CONTEXT**//
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

  //**HANDLE CHANGE HELPER FUNCTION**//
  function handleChange(changes) {
    handleRecipeChange(recipe._id, { ...recipe, ...changes });
  }

  //**HANDLE INGREDIENT CHANGE**//
  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients];
    const index = newIngredients.findIndex((i) => i._id === id);
    newIngredients[index] = ingredient;
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
  function handleIngredientDelete(id) {
    handleChange({
      ingredients: recipe.ingredients.filter((i) => i._id !== id),
    });
  }

  //**HANDLE AUTHOR CHANGE**//
  function handleAuthorChange(id, author) {
    //create a new array of recipe authors (can't change original)
    const newAuthors = [...recipe.authors];
    const index = newAuthors.findIndex((a) => a._id === id);
    newAuthors[index] = author;
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
  function handleAuthorDelete(id) {
    handleChange({ authors: recipe.authors.filter((a) => a._id !== id) });
  }

  return (
    <div className='recipe-edit'>
      <div className='recipe-edit__remove-button-container'>
        <button
          className='btn recipe-edit__remove-button'
          onClick={() => handleRecipeSelect(undefined)}
        >
          &times;
        </button>
      </div>
      <div className='recipe-edit__details-grid'>
        <label htmlFor='name' className='recipe-edit__label'>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className='recipe-edit__input'
          value={recipe.name}
          onChange={(e) => handleChange({ name: e.target.value })}
        />

        <label htmlFor='cookTime' className='recipe-edit__label'>
          Cook Time
        </label>
        <input
          type='text'
          name='name'
          id='cookTime'
          className='recipe-edit__input'
          value={recipe.cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
        />

        <label htmlFor='servings' className='recipe-edit__label'>
          Servings
        </label>
        <input
          type='number'
          min='1'
          name='name'
          id='same'
          className='recipe-edit__input'
          value={recipe.servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
        />

        <label htmlFor='instructions' className='recipe-edit__label'>
          Instructions
        </label>
        <textarea
          name='instructions'
          id='instructions'
          className='recipe-edit__input'
          onChange={(e) => handleChange({ instructions: e.target.value })}
          value={recipe.instructions}
        ></textarea>
      </div>
      <br />
      <label className='recipe-edit__label'>Ingredients</label>
      <div className='recipe-edit__ingredient-grid'>
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map((ingredient, index) => (
          <RecipeIngredientEdit
            key={index}
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
      <div>
        <div>Author(s)</div>
      </div>
      <div>
        {recipe.authors.map((author, index) => (
          <AuthorEdit
            key={index}
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
