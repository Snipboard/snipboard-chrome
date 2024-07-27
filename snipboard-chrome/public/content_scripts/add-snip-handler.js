if (!window.snipboardInjected) {
  window.snipboardInjected = true;

  // Create and append iframe
  const iframe = document.createElement('iframe');
  iframe.id = 'snipboard-modal-iframe';
  iframe.style.position = 'fixed';
  iframe.style.top = '50%';
  iframe.style.left = '50%';
  iframe.style.width = '95%';
  iframe.style.height = '80%';
  iframe.style.border = 'none';
  iframe.style.zIndex = '10001'; // Higher than the overlay
  iframe.style.transform = 'translate(-50%, -50%)';
  iframe.style.display = 'none'; // Initially hidden
  iframe.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Transparent background
  iframe.style.allowTransparency = 'true';

  // Create the background overlay
  const overlay = document.createElement('div');
  overlay.id = 'snipboard-modal-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Darken effect
  overlay.style.zIndex = '10000'; // Just below the iframe
  overlay.style.display = 'none'; // Initially hidden

  document.body.appendChild(iframe);
  document.body.appendChild(overlay);

  // Function to show the modal
  function showModal() {
    iframe.src = chrome.runtime.getURL('../addsnip.html'); // Adjust path if necessary
    iframe.style.display = 'block'; // Show the iframe
    overlay.style.display = 'block'; // Show the overlay
  }

  // Listen for messages from the iframe to handle closing
  window.addEventListener('message', (event) => {
    if (event.origin === new URL(chrome.runtime.getURL('')).origin && event.data === 'closeModal') {
      iframe.style.display = 'none';
      overlay.style.display = 'none';
    }
  });

  // Listener for showing the modal
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showModal') {
      showModal();
      sendResponse({ status: 'modal shown' });
    }
  });
}
