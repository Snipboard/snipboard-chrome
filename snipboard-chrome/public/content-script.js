// content.js

function addSaveButton(codeElement) {
    console.log('Adding save button to code element:', codeElement);

    const button = document.createElement('button');
    button.innerText = 'Save';
    button.style.position = 'absolute';
    button.style.bottom = '5px'; // Slight padding from the bottom
    button.style.right = '5px'; // Slight padding from the right
    button.style.zIndex = '1000';
    button.style.backgroundColor = '#f90';
    button.style.border = 'none';
    button.style.padding = '2px 5px'; // Smaller padding
    button.style.fontSize = '12px'; // Smaller font size
    button.style.cursor = 'pointer';

    button.addEventListener('click', () => {
        const snippet = codeElement.innerText;
        chrome.runtime.sendMessage({ action: 'saveSnippet', snippet: snippet });
    });

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.paddingBottom = '30px'; // Ensure space for the button
    wrapper.appendChild(codeElement.cloneNode(true)); // Clone the code element

    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.position = 'absolute';
    buttonWrapper.style.bottom = '0';
    buttonWrapper.style.right = '0';
    buttonWrapper.className = 'code-wrapper';
    buttonWrapper.appendChild(button);

    wrapper.appendChild(buttonWrapper);

    // Replace the original code element with the wrapper
    codeElement.parentNode.replaceChild(wrapper, codeElement);
}

function detectCodeSnippets() {
    const codeElements = document.querySelectorAll('pre code, .code-block');

    let index = 0;

    function addButtonsSequentially() {
        if (index < codeElements.length) {
            const codeElement = codeElements[index];
            if ((codeElement.tagName === 'CODE' && codeElement.parentElement.tagName === 'PRE') || codeElement.classList.contains('code-block')) {
                if (!codeElement.querySelector('.code-wrapper')) {
                    addSaveButton(codeElement);
                }
            }
            index++;
            setTimeout(addButtonsSequentially, 50); // Add buttons with a slight delay
        }
    }

    addButtonsSequentially();
}

document.addEventListener('DOMContentLoaded', () => {
    detectCodeSnippets();
});

// Observe changes to the DOM and re-run detection if necessary
const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length || mutation.removedNodes.length) {
            detectCodeSnippets();
        }
    });
});
observer.observe(document.body, { childList: true, subtree: true });
