import React from 'react';
import '../styles/index.css';

/* global chrome */

const Popup = () => {
    const handleAddSnip = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].url.startsWith('http')) {
            chrome.scripting.executeScript(
                {
                target: { tabId: tabs[0].id },
                files: ['content_scripts/add-snip-handler.js']
                },
                () => {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'showModal' });
                }
            );
            } else {
            console.error('Cannot inject script into a chrome:// URL');
            }
        });

        chrome.storage.local.set({ isModalVisible: true });
    };

    const handleOpenSidepanel = () => {
        chrome.windows.getCurrent({ populate: true }, (window) => {
        chrome.sidePanel.open({ windowId: window.id });
        });
        window.close();
    };

    const handleAccount = () => {
        console.log("Account clicked");
    }

    const handleSettings = () => {
        console.log("Settings clicked");
    }

  return (
    <div className="popup bg-darkBlue border-lightBlue border-solid border-4 rounded-md font-leagueSpartan p-4">
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <img src="images/SnipboardTitle.png" alt="Snipboard Title" className="title mb-4" />

      <div className="grid grid-cols-2 gap-4">
        <button 
          className="button bg-lightBlue text-darkBlue font-bold py-4 px-4 rounded flex flex-col items-center justify-center text-base border-4 border-transparent hover:bg-blue"
          onClick={handleAddSnip}
        >
          <i className="fas fa-plus mb-2 text-2xl"></i> Add Snip
        </button>
        <button 
          className="button bg-lightBlue text-darkBlue font-bold py-4 px-4 rounded flex flex-col items-center justify-center text-base border-4 border-transparent hover:bg-blue"
          onClick={handleOpenSidepanel}
        >
          <i className="fas fa-bars mb-2 text-2xl"></i> Manage Snips
        </button>
        <button 
          className="button bg-lightBlue text-darkBlue font-bold py-4 px-4 rounded flex flex-col items-center justify-center text-base border-4 border-transparent hover:bg-blue"
          onClick={handleAccount}
        >
          <i className="fas fa-user mb-2 text-2xl"></i> Account
        </button>
        <button 
          className="button bg-lightBlue text-darkBlue font-bold py-4 px-4 rounded flex flex-col items-center justify-center text-base border-4 border-transparent hover:bg-blue"
          onClick={handleSettings}
        >
          <i className="fas fa-cog mb-2 text-2xl"></i> Settings
        </button>
      </div>
    </div>
  );
}

export default Popup;
