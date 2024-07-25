import React, { useState } from 'react';
import '../styles/index.css';

/* global chrome */

const Popup = () => {
    return (
        <div className="popup bg-darkBlue border-lightBlue border-solid border-4 rounded-md font-leagueSpartan p-4">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <img src="images/SnipboardTitle.png" alt="Snipboard Title" className="title" />
            {/* Add some sample Tailwind CSS code to test */}
            {/* <div className="bg-ligthBlue p-2">
            </div> */}
            <div className="grid grid-cols-2 gap-4 border border-lightBlue p-4 rounded-md">
                <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded flex items-center justify-left text-base">
                    <i className="fas fa-plus mr-2 text-lg"></i> Add Snippet
                </button>
                <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded flex items-center justify-left text-base">
                    <i className="fas fa-bars mr-2 text-lg"></i> Open Library
                </button>
                <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded flex items-center justify-left text-base">
                    <i className="fas fa-user mr-2 text-lg"></i> Account
                </button>
                <button className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded flex items-center justify-left text-base">
                    <i className="fas fa-cog mr-2 text-lg"></i> Settings
                </button>
            </div>
        </div>
    );
}

export default Popup;