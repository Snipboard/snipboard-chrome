import React, { useState } from 'react';
import '../styles/index.css';

const AddSnip = () => {
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState('');
  const [links, setLinks] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Snippet submitted:', { title, snippet, description, languages, links, notes });
    window.parent.postMessage('closeModal', '*');
  };

  const handleClose = () => {
    window.parent.postMessage('closeModal', '*');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-700 bg-opacity-100 z-50 p-4">
      <div className="max-w-full w-full h-full overflow-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-darkBlue p-16 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-lightBlue font-leagueSpartan">Add Snippet</h2>
            <form onSubmit={handleSubmit} id="snippet-form">
              <div className="mb-4">
                <label className="block text-left text-lightBlue font-semibold mb-2 font-leagueSpartan" htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  className="border border-lightBlue p-2 text-sm w-full rounded bg-lightBlue text-darkBlue font-leagueSpartan"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-lightBlue font-semibold mb-2 font-leagueSpartan" htmlFor="snippet">Code Snippet</label>
                <textarea
                  name="snippet"
                  className="border border-lightBlue p-2 text-sm w-full rounded bg-lightBlue text-darkBlue font-leagueSpartan"
                  rows="10"
                  placeholder="Enter your snippet"
                  value={snippet}
                  onChange={(e) => setSnippet(e.target.value)}
                  style={{ resize: 'none', overflow: 'auto' }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-lightBlue font-semibold mb-2 font-leagueSpartan" htmlFor="languages">Languages</label>
                <input
                  type="text"
                  name="languages"
                  className="border border-lightBlue p-2 text-sm w-full rounded bg-lightBlue text-darkBlue font-leagueSpartan"
                  placeholder="Enter languages, separated by commas"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                />
              </div>
            </form>
          </div>
          <div className="bg-darkBlue p-16 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <label className="block text-left text-lightBlue font-semibold mb-2 font-leagueSpartan" htmlFor="description">Description</label>
                <textarea
                  name="description"
                  className="border border-lightBlue p-2 text-sm w-full rounded bg-lightBlue text-darkBlue font-leagueSpartan"
                  rows="3"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ resize: 'none', overflow: 'auto' }}
                />
              </div>
              <div className="mb-4">
                <label className="block text-left text-lightBlue font-semibold mb-2 font-leagueSpartan" htmlFor="links">Links</label>
                <input
                  type="text"
                  name="links"
                  className="border border-lightBlue p-2 text-sm w-full rounded bg-lightBlue text-darkBlue font-leagueSpartan"
                  placeholder="Enter links, separated by commas"
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                />
              </div>
              <div className="mb-6">
                <label className="block text-left text-lightBlue font-semibold mb-2 font-leagueSpartan" htmlFor="notes">Additional Notes</label>
                <textarea
                  name="notes"
                  className="border border-lightBlue p-2 text-sm w-full rounded bg-lightBlue text-darkBlue font-leagueSpartan"
                  rows="3"
                  placeholder="Enter additional notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{ resize: 'none', overflow: 'auto' }}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-lightBlue hover:bg-darkBlue text-darkBlue font-bold py-2 px-5 rounded font-leagueSpartan"
                onClick={handleSubmit}
              >
                Save Snippet
              </button>
              <button
                id="close-modal"
                onClick={handleClose}
                className="bg-red hover:bg-darkRed text-white font-bold py-2 px-5 rounded font-leagueSpartan"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSnip;