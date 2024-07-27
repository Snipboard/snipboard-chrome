import React, { useState } from 'react';
import '../styles/index.css';

const AddSnip = () => {
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [links, setLinks] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Snippet submitted:', { title, snippet, description, tags, links, notes });
    window.parent.postMessage('closeModal', '*');
  };

  const handleClose = () => {
    window.parent.postMessage('closeModal', '*');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-darkBlue bg-opacity-100 z-50">
      <div className="max-w-4xl w-full grid grid-cols-2 gap-6">
        <div className="bg-lightBlue p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-darkBlue">Add Snippet</h2>
          <form onSubmit={handleSubmit} id="snippet-form">
            <div className="mb-4">
              <label className="block text-left text-darkBlue font-semibold mb-2" htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                className="border border-darkBlue p-2 w-full rounded"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-darkBlue font-semibold mb-2" htmlFor="snippet">Code Snippet</label>
              <textarea
                name="snippet"
                className="border border-darkBlue p-2 w-full rounded"
                rows="4"
                placeholder="Enter your snippet"
                value={snippet}
                onChange={(e) => setSnippet(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-darkBlue font-semibold mb-2" htmlFor="description">Description</label>
              <textarea
                name="description"
                className="border border-darkBlue p-2 w-full rounded"
                rows="3"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="bg-lightBlue p-8 rounded-lg shadow-lg flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <label className="block text-left text-darkBlue font-semibold mb-2" htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                className="border border-darkBlue p-2 w-full rounded"
                placeholder="Enter tags, separated by commas"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-darkBlue font-semibold mb-2" htmlFor="links">Links</label>
              <input
                type="text"
                name="links"
                className="border border-darkBlue p-2 w-full rounded"
                placeholder="Enter links, separated by commas"
                value={links}
                onChange={(e) => setLinks(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-left text-darkBlue font-semibold mb-2" htmlFor="notes">Additional Notes</label>
              <textarea
                name="notes"
                className="border border-darkBlue p-2 w-full rounded"
                rows="3"
                placeholder="Enter additional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue hover:bg-lightBlue text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Save Snippet
            </button>
            <button
              id="close-modal"
              onClick={handleClose}
              className="bg-red hover:bg-darkRed text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSnip;