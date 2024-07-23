// content.js

function addSaveButton(codeElement) {
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

    // Wrap the code element in a relative positioned div to keep the button inside
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.background = getComputedStyle(codeElement).background; // Match the background
    wrapper.appendChild(codeElement.cloneNode(true)); // Clone the code element

    wrapper.appendChild(button);

    codeElement.parentNode.replaceChild(wrapper, codeElement); // Replace the original code element
}

function observeCodeSnippets() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when at least 10% of the code block is visible
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const codeElement = entry.target;
                if (!codeElement.parentNode.classList.contains('code-wrapper')) {
                    addSaveButton(codeElement);
                    observer.unobserve(codeElement); // Stop observing once the button is added
                }
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    // Updated selector to include 'devsite-code' elements
    const codeElements = document.querySelectorAll('pre code, pre, .highlight, .code-block, devsite-code');

    codeElements.forEach((codeElement) => {
        observer.observe(codeElement);
    });
}

// Run the observer on page load
observeCodeSnippets();
