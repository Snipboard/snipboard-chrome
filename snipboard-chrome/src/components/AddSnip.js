import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import '../styles/index.css';

const AddSnip = () => {
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Snippet submitted:', { title, snippet, description, languages });
    window.parent.postMessage('closeModal', '*');
  };

  const handleClose = () => {
    window.parent.postMessage('closeModal', '*');
  };

  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-darkBlue rounded-xl shadow-2xl z-50">
      <div className="max-w-full w-full h-full overflow-auto p-2">
        <div className="bg-darkBlue p-4">
          <h2 className="text-2xl font-bold mb-6 text-lightBlue font-leagueSpartan">Add Snippet</h2>
          <form onSubmit={handleSubmit} id="snippet-form">
            <div className="relative bg-zinc-800 border-black shadow-xl border-4 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  name="title"
                  className="text-white font-bold pb-2 bg-transparent text-base border-none focus:outline-none w-full"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                />
              </div>
              <div className="relative border-4 border-black rounded-lg h-max">
                <CodeMirror value={value} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} theme={vscodeDark} />;
              </div>
              <div className="flex justify-between items-center mt-2">
                <input
                  type="text"
                  name="languages"
                  className="text-white px-4 py-2 rounded text-xs font-bold bg-transparent border-none focus:outline-none w-full"
                  placeholder="Enter languages, separated by commas"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                />
              </div>
              <div className="mt-2 text-white bg-zinc-800 rounded-lg">
                <h3 className="font-bold mb-2">Description</h3>
                <textarea
                  name="description"
                  className="border-none p-2 text-sm w-full bg-lightCodeBg text-white font-leagueSpartan focus:outline-none"
                  rows="3"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ resize: 'none', overflow: 'auto' }}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-16">
              <button
                type="submit"
                className="bg-lightBlue hover:bg-blue text-darkBlue text-sm font-bold py-2 px-5 rounded font-leagueSpartan"
              >
                Save Snippet
              </button>
              <button
                id="close-modal"
                onClick={handleClose}
                className="bg-lightRed hover:bg-darkRed text-white text-sm font-bold py-2 px-5 rounded font-leagueSpartan"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSnip;
