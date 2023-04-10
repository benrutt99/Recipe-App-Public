import React from "react";

export default function RecipeIngredientEdit({
  ingredient,
  handleIngredientChange,
  handleIngredientDelete,
  idx,
}) {
  //**HANDLE CHANGE HELPER FUNCTION**//
  function handleChange(changes) {
    //console.log(changes);
    handleIngredientChange(idx, { ...ingredient, ...changes });
  }

  return (
    <>
      <input
        className='recipe-edit__input'
        type='text'
        value={ingredient?.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <input
        className='recipe-edit__input'
        type='text'
        value={ingredient?.amount}
        onChange={(e) => handleChange({ amount: e.target.value })}
      />
      <button
        onClick={() => handleIngredientDelete(idx)}
        className='btn btn--danger'
      >
        &times;
      </button>
    </>
  );
}
