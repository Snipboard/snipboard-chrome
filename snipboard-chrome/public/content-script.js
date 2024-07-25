// content.js

function detectCodeSnippets() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // How much of the code visible before triggering?
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const codeElement = entry.target;
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
        if ((codeElement.tagName === 'CODE' && codeElement.parentElement.tagName === 'PRE') || codeElement.classList.contains('code-block')) {
            observer.observe(codeElement);
        }
    });
}

function addSaveButton(codeElement) {
    // Check if the code element is already processed, return if it is
    if (codeElement.dataset.processed === 'true') {
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

    codeElement.parentNode.parentNode.replaceChild(ultimateWrapper, codeElement.parentNode);

    //Desired structure will be like this
    //<div> ---ultimateWrapper in code
    //  <pre> ---clonedPre
    //      <code>
    //  <div> ---buttonWrapper
    //      <button>Save</button>

}

detectCodeSnippets();

// Observe changes to the DOM and re-run detection if necessary
const observer = new MutationObserver(detectCodeSnippets);
observer.observe(document.body, { childList: true, subtree: true });
