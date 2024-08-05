import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import '../styles/index.css';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/vs2015.css';
import { MdAutoAwesome } from "react-icons/md";
import { functions } from '../firebase.js';
import { httpsCallable } from 'firebase/functions';
import Groq from 'groq-sdk';

// Import the languages you want to support
import javascriptHighlight from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import csharp from 'highlight.js/lib/languages/csharp';
import xml from 'highlight.js/lib/languages/xml'; // For HTML
import css from 'highlight.js/lib/languages/css';
import markdown from 'highlight.js/lib/languages/markdown';

// Register the languages with highlight.js
hljs.registerLanguage('javascript', javascriptHighlight);
hljs.registerLanguage('python', python);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('markdown', markdown);

const AddSnip = () => {
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState('');
  const [suggestedTitle, setSuggestedTitle] = useState('');
  const [changeCount, setChangeCount] = useState(0);
  const [lastGeneratedSnippet, setLastGeneratedSnippet] = useState('');
  const [lastGeneratedTitle, setLastGeneratedTitle] = useState('');

  const debounceTimeout = useRef(null);
  const groq = new Groq({ 
    apiKey: process.env.REACT_APP_GROQ_API_KEY, 
    dangerouslyAllowBrowser: true 
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Snippet submitted:', { title, snippet, description, languages });
    window.parent.postMessage('closeModal', '*');
  };

  const handleClose = () => {
    window.parent.postMessage('closeModal', '*');
  };

  const detectLanguage = (code) => {
    const { language } = hljs.highlightAuto(code, ['javascript', 'python', 'csharp', 'html', 'css', 'markdown']);
    setLanguages(language);
  };

  const handleSnippetChange = (val) => {
    setSnippet(val);
    setChangeCount(changeCount + 1);

    if (val === lastGeneratedSnippet) {
      setSuggestedTitle(lastGeneratedTitle);
    } else if (val.length >= 20 && changeCount >= 5) {
      generateTitleSuggestion(val);
      handleLanguageDetectClick();
      setChangeCount(0);
    } else if (val.length >= 20) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        generateTitleSuggestion(val);
        handleLanguageDetectClick();
        setChangeCount(0);
      }, 2000); // 2 seconds debounce
    }
  };

  const handleLanguageDetectClick = () => {
    detectLanguage(snippet);
  };

  const generateTitleSuggestion = async (code) => {
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: "Give me a max 15 word description which describes the following code snippet. In your return message, you must give only the description, with no speech marks or other supporting text. Remember, I only want your max 15 word description of this code snippet: '" + code + "'",
          },
        ],
        model: "llama3-8b-8192",
      });
      const newTitle = chatCompletion.choices[0]?.message?.content || "Enter title";
      setSuggestedTitle(newTitle);
      setLastGeneratedSnippet(code);
      setLastGeneratedTitle(newTitle);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Tab' && suggestedTitle) {
      e.preventDefault();
      setTitle(suggestedTitle);
      setSuggestedTitle('');
    }
  };

  const handleTitleAutofill = () => {
    setTitle(suggestedTitle);
    setSuggestedTitle('');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-darkBlue rounded-xl shadow-2xl z-50">
      <div className="max-w-full w-full h-full overflow-auto p-2">
        <div className="bg-darkBlue p-4">
          <h2 className="text-2xl font-bold mb-6 text-lightBlue font-leagueSpartan">
            Add <span className="text-lightRed">Snip</span>
          </h2>
          <form onSubmit={handleSubmit} id="snippet-form">
            <div className="relative bg-zinc-800 border-black shadow-xl border-4 p-4 rounded-xl">
              <div className="flex items-center mb-3 relative">
                <MdAutoAwesome className="text-lg text-white opacity-70 mr-2" />
                <input
                  type="text"
                  name="title"
                  className="text-white font-bold px-4 pb-2 bg-transparent text-lg border-none focus:outline-none w-full"
                  placeholder={suggestedTitle && !title ? "Suggested: " + suggestedTitle : "Enter title"}
                  value={title}
                  onChange={handleTitleChange}
                  onKeyDown={handleTitleKeyDown}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                />
              </div>
              <div className="relative border-4 border-black bg-codeBg rounded-lg h-max text-base">
                <CodeMirror
                  value={snippet}
                  height="200px"
                  extensions={[javascript({ jsx: true })]}
                  onChange={(value, viewUpdate) => handleSnippetChange(value)}
                  theme={vscodeDark}
                />
              </div>
              <div className="flex justify-between items-center mt-2 space-x-2">
                <button
                  type="button"
                  className="bg-lightBlue hover:bg-blue text-darkBlue text-sm font-bold py-1 px-3 rounded-full"
                  onClick={handleLanguageDetectClick}
                >
                  <MdAutoAwesome className="text-lg" />
                </button>
                <input
                  type="text"
                  name="languages"
                  className="text-white px-4 py-2 rounded text-sm font-bold bg-transparent border-none focus:outline-none w-full"
                  placeholder={languages ? "Suggested: " + languages : "Choose a language or use auto-detect"}
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                />
              </div>
              <div className="mt-4 text-white bg-zinc-800 rounded-lg mb-2">
                <h2 className="font-bold mb-2 text-lg">Description</h2>
                <textarea
                  name="description"
                  className="border-none p-2 text-base w-full bg-lightCodeBg text-white font-leagueSpartan font-bold focus:outline-none"
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
        <img src="/images/SnipboardIconCropped.png" alt="Snipboard Icon" className="absolute bottom-2 left-2 w-12 h-12" />
      </div>
    </div>
  );
};

export default AddSnip;
