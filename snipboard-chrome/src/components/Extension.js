import React, { useState } from 'react';
import Sidebar from './Popup';
import '../styles/index.css';

/* global chrome */

const Extension = () => {

    const handleEnlarge = () => {
        chrome.windows.getCurrent({ populate: true }, (window) => {
            chrome.sidePanel.open({ windowId: window.id });
        });

        //close the popup
        window.close();
    };

    return (
        <div className="extension">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <p>Side panel</p>
            <button onClick={handleEnlarge}>Snipboard</button>
        </div>
    );
}

export default Extension;
