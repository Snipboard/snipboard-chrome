document.getElementById('snipboard-button').addEventListener('click', handleEnlarge);

function handleEnlarge() {
    chrome.windows.getCurrent({ populate: true }, (window) => {
        chrome.sidePanel.open({ windowId: window.id });
    });

    // Close the popup
    window.close();
}
