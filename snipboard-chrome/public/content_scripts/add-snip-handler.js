// Create and append modal container
const modalContainer = document.createElement('div');
modalContainer.id = 'snipboard-modal-container';
document.body.appendChild(modalContainer);

// Create a shadow root
const shadowRoot = modalContainer.attachShadow({ mode: 'open' });

// Add styles and modal HTML to the shadow root
shadowRoot.innerHTML = `
  <style>
    #snipboard-modal-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    }

    .snipboard-modal {
      background: white;
      padding: 20px;
      border-radius: 10px;
      max-width: 500px;
      width: 100%;
      text-align: center;
    }

    #close-modal {
      background-color: #f56565; /* Red color */
      color: #fff; /* White text */
      padding: 0.5rem; /* Padding */
      border: none;
      border-radius: 0.25rem; /* Rounded corners */
      cursor: pointer;
    }
  </style>
  <div id="snipboard-modal-container">
    <div class="snipboard-modal">
      <!-- Modal content will be injected here -->
      <button id="close-modal">Close</button>
    </div>
  </div>
`;

// Function to show the modal
function showModal() {
  fetch(chrome.runtime.getURL('html/add-snip.html'))
    .then(response => response.text())
    .then(data => {
      // Inject the content into the shadow DOM
      shadowRoot.querySelector('.snipboard-modal').innerHTML = data + shadowRoot.querySelector('#close-modal').outerHTML;

      // Show the modal
      shadowRoot.querySelector('#snipboard-modal-container').style.display = 'flex';

      shadowRoot.querySelector('#close-modal').addEventListener('click', () => {
        shadowRoot.querySelector('#snipboard-modal-container').style.display = 'none';
      });

    })
    .catch(err => console.error('Failed to load or process the modal:', err));
}

// Listener for showing the modal
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showModal') {
    showModal();
    sendResponse({ status: 'modal shown' });
  }
});
