// content.js

/**
* Detects code snippets as they enter the viewport, and invokes addSaveButton if needed
*/
function detectCodeSnippets() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // How much of the code visible before triggering?
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            // Add save button if the code element is intersecting.
            if (entry.isIntersecting) {
                const codeElement = entry.target;
                // Add save button and unobserve the code element
                if (codeElement.parentNode.parentNode) {
                    addSaveButton(codeElement);
                    observer.unobserve(codeElement);
                }
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    const codeElements = document.querySelectorAll('pre code, .code-block');

    codeElements.forEach((codeElement) => {
        // This method is called by the code element to observe the code element.
        if ((codeElement.tagName === 'CODE' && codeElement.parentElement.tagName === 'PRE') || codeElement.classList.contains('code-block')) {
            observer.observe(codeElement);
        }
    });
}

/**
* Adds a button to save the snippet. It is called when the user clicks on the button in the code element.
* 
* @param codeElement - The code element to process. Should normally be a <code> element
* 
* @return { boolean } True if the button was added
*/
function addSaveButton(codeElement) {
    // Check if the code element is already processed, return if it is
    // If the dataset has processed true then the dataset is processed.
    if (codeElement.dataset.processed === 'true') {
        return;
    }

    //Desired structure will be like this
    //<div> ---ultimateWrapper in code
    //  <pre> ---clonedPre
    //      <code>
    //  <div> ---buttonWrapper
    //      <button>Save</button>

    const button = document.createElement('button');
    button.innerText = 'Save';
    button.style.marginTop = '5px';
    button.style.backgroundColor = '#f90';
    button.style.border = 'none';
    button.style.padding = '2px 5px';
    button.style.fontSize = '12px';
    button.style.cursor = 'pointer';
    button.style.position = 'absolute';
    button.style.right = '0';
    button.style.bottom = '0';

    button.addEventListener('click', () => {
        const snippet = codeElement.innerText;
        chrome.runtime.sendMessage({ action: 'saveSnippet', snippet: snippet });
    });

    // <button> created

    const ultimateWrapper = document.createElement('div');
    ultimateWrapper.style.position = 'relative';
    ultimateWrapper.style.paddingBottom = '30px'; // Ensure space for the button
    // <div> to hold pre and button is created

    // Clone the original code element and its contents
    const clonedPre = codeElement.parentNode.cloneNode(true);
    ultimateWrapper.appendChild(clonedPre); //adding to the larger div

    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.position = 'relative';
    buttonWrapper.style.display = 'flex';
    buttonWrapper.style.justifyContent = 'flex-end';
    buttonWrapper.style.marginTop = '5px';
    buttonWrapper.appendChild(button);

    ultimateWrapper.appendChild(buttonWrapper); //adding button to the larger div

    // Mark the code element as processed by getting the child of cloned pre
    clonedPre.querySelector('code').dataset.processed = 'true';

    return codeElement.parentNode.parentNode.replaceChild(ultimateWrapper, codeElement.parentNode);
}

detectCodeSnippets();

// Create the modal container
const modalContainer = document.createElement('div');
modalContainer.id = 'snipboard-modal-container';
document.body.appendChild(modalContainer);

// Add styles for the modal
const style = document.createElement('style');
style.innerHTML = `
  #snipboard-modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
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
`;
document.head.appendChild(style);

// Function to show the modal
function showModal() {
  modalContainer.innerHTML = `
    <div class="snipboard-modal">
      <h2>Add Snippet</h2>
      <form>
        <input type="text" placeholder="Snippet title" /><br /><br />
        <textarea placeholder="Snippet content"></textarea><br /><br />
        <button type="submit">Add Snippet</button>
      </form>
      <br />
      <button id="close-modal">Close</button>
    </div>
  `;

  // Add close event
  document.getElementById('close-modal').addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });

  modalContainer.style.display = 'flex';
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showModal') {
    showModal();
    sendResponse({ status: 'modal shown' });
  }
});


// Observe changes to the DOM and re-run detection if necessary
const observer = new MutationObserver(detectCodeSnippets);
observer.observe(document.body, { childList: true, subtree: true });

