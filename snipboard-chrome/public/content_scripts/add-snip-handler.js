if (!window.snipboardInjected) {
  window.snipboardInjected = true;

  // Create and append iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'snipboard-modal-iframe';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.zIndex = '9999';
  iframe.style.display = 'none'; // Initially hidden
  document.body.appendChild(iframe);

  // Function to show the modal
  function showModal() {
    iframe.src = chrome.runtime.getURL('html/add-snip.html'); // Load your modal content
    iframe.style.display = 'block'; // Show the iframe

    // Listen for messages from the iframe to handle closing
    window.addEventListener('message', (event) => {
      if (event.origin === new URL(chrome.runtime.getURL('')).origin && event.data === 'closeModal') {
        iframe.style.display = 'none';
      }
    });
  }

  // Listener for showing the modal
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showModal') {
      showModal();
      sendResponse({ status: 'modal shown' });
    }
  });
}
