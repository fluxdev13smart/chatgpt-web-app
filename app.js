const apiKey = "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";  // Replace with your OpenAI API key

// Get elements from HTML
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Function to display messages in the chat
function displayMessage(message, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.innerText = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Send message to OpenAI API
async function sendMessageToAPI(message) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",  // Using GPT-3.5-turbo (free tier)
      messages: [{ "role": "user", "content": message }]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

// Handle the send button click event
sendButton.addEventListener('click', async () => {
  const message = userInput.value;
  if (message.trim() === '') return;

  // Display the user message
  displayMessage(message, 'user');
  userInput.value = ''; // Clear the input field

  // Get the AI response
  const aiResponse = await sendMessageToAPI(message);

  // Display the AI response
  displayMessage(aiResponse, 'ai');
});
