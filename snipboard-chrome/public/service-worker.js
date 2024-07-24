// service-worker.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveSnippet") {
      const snippetData = request.data;
      // Implement the logic to save snippetData to Firebase or another service
      console.log('Saving snippet:', snippetData);
      // Example: saveSnippetToFirebase(snippetData);
    }
  });