// login.js
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

  console.log('Login input:', usernameOrEmail); // Debugging

  // Validate login input
  if (!usernameOrEmail || !password) {
    alert('Please fill in all fields.');
    loginSpinner.classList.add('hidden');
    loginText.textContent = 'LOGIN';
    return;
  }

  // Prepare the payload for the backend
  const credentials = {
    username_or_email: usernameOrEmail, // Match backend field name
    password: password,
  };

  console.log('Login credentials:', credentials);

  try {
    console.log('Calling login API...');
    const response = await login(credentials); // Use the login function
    console.log('Login successful:', response);

    // Debugging: Check localStorage for tokens
    console.log('Access token:', localStorage.getItem('access_token'));
    console.log('Refresh token:', localStorage.getItem('refresh_token'));

    // Redirect to dashboard
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