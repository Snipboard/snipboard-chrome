// src/components/AddSnip.js
import React from 'react';

const AddSnip = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const snip = formData.get('snippet');
    console.log("Snippet saved:", snip);
    // Add your save logic here
  };

  return (
    <div>
      <h2>Add Snippet</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Snippet:
          <input type="text" name="snippet" required />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddSnip;
