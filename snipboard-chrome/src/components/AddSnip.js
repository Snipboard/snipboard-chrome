import React, { useState } from 'react';
import '../styles/index.css';

const AddSnip = () => {
  const [snippet, setSnippet] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Snippet submitted:', snippet);
    // Send a message to close the modal
    window.parent.postMessage('closeModal', '*');
  };

  const handleClose = () => {
    window.parent.postMessage('closeModal', '*');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      <div className="bg-darkBlue p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl mb-4">Add Snippet</h2>
        <form onSubmit={handleSubmit} id="snippet-form">
          <textarea
            name="snippet"
            className="border p-2 mb-2 w-full"
            rows="4"
            cols="50"
            placeholder="Enter your snippet"
            value={snippet}
            onChange={(e) => setSnippet(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Snippet
          </button>
        </form>
        <button
          id="close-modal"
          onClick={handleClose}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddSnip;
