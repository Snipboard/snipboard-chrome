// content.js

function detectCodeSnippets() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when at least 10% of the code block is visible
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const codeElement = entry.target;
                if (codeElement.parentNode.parentNode) {
                    addSaveButton(codeElement);
                    observer.unobserve(codeElement); // Stop observing once the button is added
                }
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    const codeElements = document.querySelectorAll('pre code, .code-block');

    codeElements.forEach((codeElement) => {
        // Handle 'devsite-code' elements differently if needed
        if ((codeElement.tagName === 'CODE' && codeElement.parentElement.tagName === 'PRE') || codeElement.classList.contains('code-block')) {
            observer.observe(codeElement);
        }
    });
}

function addSaveButton(codeElement) {
    // Check if the code element is already processed
    if (codeElement.dataset.processed === 'true') {
        console.log('Save button already exists for this code element.');
        return;
    }

    const button = document.createElement('button');
    button.innerText = 'Save';
    button.style.marginTop = '5px';
    button.style.backgroundColor = '#f90';
    button.style.border = 'none';
    button.style.padding = '2px 5px';
    button.style.fontSize = '12px';
    button.style.cursor = 'pointer';
    button.style.position = 'absolute';
    button.style.right = '0'; // Align to the right
    button.style.bottom = '0'; // Align to the bottom

    button.addEventListener('click', () => {
        const snippet = codeElement.innerText;
        chrome.runtime.sendMessage({ action: 'saveSnippet', snippet: snippet });
    });

    //thats <button> sorted

    const ultimateWrapper = document.createElement('div');
    ultimateWrapper.style.position = 'relative';
    ultimateWrapper.style.paddingBottom = '30px'; // Ensure space for the button
    //<div> sorted

    // Clone the original code element and its contents
    const clonedPre = codeElement.parentNode.cloneNode(true);
    ultimateWrapper.appendChild(clonedPre);

    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.position = 'relative';
    buttonWrapper.style.display = 'flex';
    buttonWrapper.style.justifyContent = 'flex-end'; // Align button to the right
    buttonWrapper.style.marginTop = '5px'; // Add margin to place the button below the code block
    buttonWrapper.appendChild(button);

    // Append the button wrapper after the code block
    ultimateWrapper.appendChild(buttonWrapper);

    // Mark the code element as processed by getting the child of cloned pre
    clonedPre.querySelector('code').dataset.processed = 'true';

    // Replace the original code element with the wrapper
    codeElement.parentNode.parentNode.replaceChild(ultimateWrapper, codeElement.parentNode);

    //Current structure of html will be:
    //<pre>
    // <div>
    //  <code>
    //  <div>
    //    <button>Save</button>

    //we want to change it to:
    //<pre>
    // <code>
    //<div>
    //  <button>Save</button>

}

detectCodeSnippets();

// Observe changes to the DOM and re-run detection if necessary
const observer = new MutationObserver(detectCodeSnippets);
observer.observe(document.body, { childList: true, subtree: true });
