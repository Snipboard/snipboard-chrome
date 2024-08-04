/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const Groq = require("groq-sdk");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const groq = new Groq({
  apiKey: "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",
});

/**
 * Function to get Groq Chat Completion
 * @param {string} codeSnippet - The code snippet to describe
 * @return {Promise} - Returns a Groq chat completion promise
 */
async function getGroqChatCompletion(codeSnippet) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Write a max 15 word title to` +
        `describe this code: '${codeSnippet}'`,
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Create and deploy your first functions
exports.groqChat = onRequest(async (request, response) => {
  try {
    const codeSnippet = request.body.codeSnippet || "const x = 5;" +
    "const z = x + 5;";
    const chatCompletion = await getGroqChatCompletion(codeSnippet);
    // Print the completion returned by the LLM.
    const messageContent = chatCompletion.choices[0]?.message?.content || "";
    logger.info("Groq Chat Completion:", {
      structuredData: true,
      messageContent,
    });
    response.send(messageContent);
  } catch (error) {
    logger.error("Error getting Groq Chat Completion:", {
      structuredData: true,
      error,
    });
    response.status(500).send("Error getting Groq Chat Completion");
  }
});
