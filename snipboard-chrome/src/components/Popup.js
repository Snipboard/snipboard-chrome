import React from 'react';
import '../styles/index.css';

/* global chrome */

const Popup = () => {
    return (
        <div className="popup bg-darkBlue border-lightBlue border-solid border-4 rounded-md font-leagueSpartan p-4">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <img src="images/SnipboardTitle.png" alt="Snipboard Title" className="title mb-4" />
            
            <div className="grid grid-cols-2 gap-4">
                <button className="button bg-blue-500 text-white font-bold py-4 px-4 rounded flex flex-col items-center justify-center text-base border-4 border-transparent hover:border-lightBlue">
                    <i className="fas fa-plus mb-2 text-2xl"></i> Add Snippet
                </button>
                <button className="button bg-blue-500 text-white font-bold py-4 px-4 rounded flex flex-col items-center justify-center text-base border-4 border-transparent hover:border-lightBlue">
                    <i className="fas fa-bars mb-2 text-2xl"></i> Open Library
                </button>
                <button className="button bg-blue-500 text-white font-bold py-4 px-4 rounded flex flex-col items-center justify-center text-base border-4 border-transparent hover:border-lightBlue">
                    <i className="fas fa-user mb-2 text-2xl"></i> Account
                </button>
                <button className="button bg-blue-500 text-white font-bold py-4 px-4 rounded flex flex-col items-center justify-center text-base border-4 border-transparent hover:border-lightBlue">
                    <i className="fas fa-cog mb-2 text-2xl"></i> Settings
                </button>
            </div>
        </div>
    );
}

export default Popup;
