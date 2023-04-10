import React from "react";

export default function AuthorEdit({
  author,
  handleAuthorDelete,
  handleAuthorChange,
  idx,
}) {
  //**HANDLE CHANGE HELPER FUNCTION*//
  function handleChange(changes) {
    handleAuthorChange(idx, { ...author, ...changes });
  }

  return (
    <div className='author-edit-container'>
      <input
        className='author-edit__input'
        type='text'
        value={author?.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <button
        onClick={() => handleAuthorDelete(idx)}
        className='btn btn--danger'
      >
        &times;
      </button>
    </div>
  );
}
