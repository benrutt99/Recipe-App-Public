import React, { useContext } from "react";
import IngredientList from "./IngredientList";
import AuthorList from "./AuthorList";
import { RecipeContext } from "@/pages";

export default function Recipe(props) {
  // instead of passing up here ^^ destructure it here to be more clear

  const { handleRecipeDelete, handleRecipeSelect } = useContext(RecipeContext);

  const { _id, name, cookTime, servings, instructions, ingredients, authors } =
    props;

  return (
    <div className='recipe'>
      <div className='recipe__header'>
        <h3 className='recipe__title'>{name}</h3>
        <div>
          <button
            onClick={() => handleRecipeSelect(_id)}
            className='btn btn--primary mr-1'
          >
            Edit
          </button>
          <button
            // handleRecipeDelete(id) has to be inside an anonymous function because
            //if its not, it will just fire off HandleRecipeDelete(id) immediately
            // therefore making an empty page because id = null
            onClick={() => handleRecipeDelete(_id)}
            className='btn btn--danger'
          >
            Delete
          </button>
        </div>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Cook Time: </span>
        <span className='recipe__value'>{cookTime}</span>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Servings: </span>
        <span className='recipe__value'>{servings}</span>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Instructions: </span>
        <div className='recipe__value recipe__instructions recipe__value--indented'>
          {instructions}
        </div>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>Ingredients: </span>
        <div className='recipe__value recipe__value--indented'>
          <IngredientList ingredients={ingredients} />
        </div>
      </div>
      <div className='recipe__row'>
        <span className='recipe__label'>
          {authors.length > 1 ? "Authors:" : "Author:"}
        </span>
        <div className='recipe__value recipe__value--indented'>
          <AuthorList authors={authors} />
        </div>
      </div>
    </div>
  );
}
