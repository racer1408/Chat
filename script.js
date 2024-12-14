// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvy5DDZctG7E5v-SFHsuRnSh77HQxYIk8",
  authDomain: "chat-app-813cc.firebaseapp.com",
  projectId: "chat-app-813cc",
  storageBucket: "chat-app-813cc.firebasestorage.app",
  messagingSenderId: "124100304916",
  appId: "1:124100304916:web:a0c36971777ffa5dc68701",
  measurementId: "G-HFYLQ5BHBQ",
  databaseURL: "https://chat-app-813cc-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const usernameInput = document.getElementById('username-input');
const setUsernameButton = document.getElementById('set-username');
const usernameDisplay = document.getElementById('username-display');
const chatContainer = document.querySelector('.chat-container');
const usernamePrompt = document.querySelector('.username-prompt');
const inputField = document.querySelector('.input-area input');
const chatArea = document.querySelector('.chat-area');
const sendButton = document.querySelector('.input-area button');

let username = '';

// Set Username
setUsernameButton.addEventListener('click', () => {
  if (usernameInput.value.trim() !== '') {
    username = usernameInput.value.trim();
    usernameDisplay.textContent = username;
    usernamePrompt.style.display = 'none';
    chatContainer.style.display = 'block';
  } else {
    alert('Please enter a valid username.');
  }
});

// Send Message
sendButton.addEventListener('click', () => {
  const message = inputField.value.trim();
  if (message) {
    const timestamp = new Date().toLocaleTimeString(); // Get current time
    push(ref(database, 'messages'), {
      username: username,
      message: message,
      time: timestamp
    });
    inputField.value = ''; // Clear input field
  }
});

// Listen for New Messages
onChildAdded(ref(database, 'messages'), (snapshot) => {
  const { username, message, time } = snapshot.val();
  const newMessage = document.createElement('div');
  newMessage.textContent = `${username} [${time}]: ${message}`;
  chatArea.appendChild(newMessage);
  chatArea.scrollTop = chatArea.scrollHeight; // Auto-scroll to bottom
});