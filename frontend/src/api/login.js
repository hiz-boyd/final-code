
import { login } from './api.js'; // Import the login function from api.js

const handleLogin = async (event) => {
  event.preventDefault();
  console.log('Login form submission intercepted');

  // Show loading spinner
  const loginButton = document.getElementById('login-button');
  const loginSpinner = document.getElementById('login-spinner');
  const loginText = document.getElementById('login-text');
  loginSpinner.classList.remove('hidden');
  loginText.textContent = 'Logging in...';

  // Get form data
  const formData = new FormData(event.target);
  const usernameOrEmail = formData.get('login-input'); // Retrieve email/username
  const password = formData.get('password'); // Retrieve password

  console.log('Login input:', usernameOrEmail); // Debugging: Check the value of loginInput

  // Validate login input
  if (!usernameOrEmail || !password) {
    alert('Please fill in all fields.');
    loginSpinner.classList.add('hidden');
    loginText.textContent = 'LOGIN';
    return;
  }

  // Prepare the payload for the backend
  const credentials = {
    username_or_email: usernameOrEmail, // Match the backend's expected field name
    password: password,
  };

  console.log('Login credentials:', credentials);

  try {
    console.log('Calling login API...');
    const response = await login(credentials); // Use the login function from api.js
    console.log('Login successful:', response);

    // Store the authentication token (modify based on your backend response)
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }

    // Redirect to dashboard or home page
    window.location.href = '/dashboard.html';
  } catch (error) {
    console.error('Login failed:', error);
    alert(`Login failed: ${error.message}`);
  } finally {
    // Hide loading spinner
    loginSpinner.classList.add('hidden');
    loginText.textContent = 'LOGIN';
  }
};

// Initialize form handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', handleLogin);
  console.log('Login event listener attached');
} else {
  console.error('Login form not found');
}