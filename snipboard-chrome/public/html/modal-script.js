function handleSubmit(event) {
    event.preventDefault();
    // Your submit logic here
    console.log("Snippet submitted:", event.target.snippet.value);
    window.parent.postMessage('closeModal', '*');
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('close-modal').addEventListener('click', () => {
      window.parent.postMessage('closeModal', '*');
    });
  
    document.getElementById('snippet-form').addEventListener('submit', handleSubmit);
  });
  