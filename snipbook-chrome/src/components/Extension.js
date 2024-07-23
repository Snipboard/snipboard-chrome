import React, { useState } from 'react';
import Sidebar from './Popup';
import '../styles/index.css';

/* global chrome */

const Extension = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

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
            <p>Save snippets</p>
            <button onClick={handleEnlarge}>Snipbook</button>
        </div>
    );
}

export default Extension;
