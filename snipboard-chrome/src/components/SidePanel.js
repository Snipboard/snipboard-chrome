import React, { useState } from 'react';
import '../styles/index.css';

/* global chrome */

const SidePanel = () => {

    const handleEnlarge = () => {
        chrome.windows.getCurrent({ populate: true }, (window) => {
            chrome.sidePanel.open({ windowId: window.id });
        });

        //close the popup
        window.close();
    };

    return (
        <div className="side-panel bg-darkBlue font-leagueSpartan p-4">
            <div className="flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Button 1
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
                    Button 2
                </button>
            </div>
            <div className="mt-4">
                <input className="border border-gray-400 rounded py-2 px-4" type="text" placeholder="Enter your name" />
            </div>
            <div className="mt-4">
                <textarea className="border border-gray-400 rounded py-2 px-4" placeholder="Enter your message"></textarea>
            </div>
        </div>
    );
}

export default SidePanel;
