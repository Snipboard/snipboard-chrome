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
        <div className="side-panel">
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <p>Side panel</p>
            <button onClick={handleEnlarge}>Snipboard</button>
            {/* Add some sample talwind css code to test */}
            <div className="bg-blue p-4">
                <p className="text-darkRed">Sample text</p>
            </div>
        </div>
    );
}

export default SidePanel;
