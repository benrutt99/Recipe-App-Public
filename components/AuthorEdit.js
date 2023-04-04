import React from "react";

export default function AuthorEdit({
  author,
  handleAuthorDelete,
  handleAuthorChange,
}) {
  //**HANDLE CHANGE HELPER FUNCTION*//
  function handleChange(changes) {
    handleAuthorChange(author._id, { ...author, ...changes });
  }

  return (
    <>
      <input
        className='recipe-edit__input'
        type='text'
        value={author?.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <button
        onClick={() => handleAuthorDelete(author._id)}
        className='btn btn--danger'
      >
        &times;
      </button>
    </>
  );
}
