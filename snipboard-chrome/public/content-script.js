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
    buttonWrapper.appendChild(button);

    wrapper.appendChild(buttonWrapper);
    wrapper.classList.add('code-wrapper');
    //check if there exists a div with class code-wrapper
    if (codeElement.parentNode) {
        codeElement.parentNode.replaceChild(wrapper, codeElement); // Replace the original code element
    } else {
        console.error('Failed to replace codeElement because it has no parentNode.');
    }
}

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
                addSaveButton(codeElement);
                observer.unobserve(codeElement); // Stop observing once the button is added
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);

    // Updated selector to include 'devsite-code' elements
    const codeElements = document.querySelectorAll('pre code, .code-block');

    codeElements.forEach((codeElement) => {
        // Handle 'devsite-code' elements differently if needed
        if ((codeElement.tagName === 'CODE' && codeElement.parentElement.tagName === 'PRE') || codeElement.classList.contains('code-block')) {
            if (!codeElement.nextElementSibling || codeElement.nextElementSibling.className !== 'add-snippet-btn') {
                // Check if the button has already been added to avoid duplication
                observer.observe(codeElement);
            }
        }
    });
}

// Run the detection on page load
detectCodeSnippets();

// Observe changes to the DOM and re-run detection if necessary
const observer = new MutationObserver(detectCodeSnippets);
observer.observe(document.body, { childList: true, subtree: true });
