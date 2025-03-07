// src/dashboard.js
import { fetchWithAuth } from './api/api.js';

// Fetch and display user data
const displayUserData = async () => {
  try {
    const userData = await fetchWithAuth('user-data/');
    console.log('User data fetched:', userData);

    // Update DOM elements with formatted data
    document.getElementById('totalBalance').textContent = `$${userData.total_balance.toFixed(2)}`;
    document.getElementById('income').textContent = `$${userData.income.toFixed(2)}`;
    document.getElementById('outcome').textContent = `$${userData.outcome.toFixed(2)}`;
    document.getElementById('totalDeposits').textContent = `$${userData.total_deposits.toFixed(2)}`;
    document.getElementById('totalProfits').textContent = `$${userData.total_profits.toFixed(2)}`;
    document.getElementById('referrals').textContent = userData.referrals;
    document.getElementById('full-name').textContent = userData.full_name.toUpperCase();
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    alert('Session expired or invalid. Please log in again.');
    window.location.href = '/login.html'; // Adjust to your login page path
  }
};

// Toggle dropdown menu
const toggleMenu = () => {
  const menu = document.getElementById('menu-listss');
  menu.classList.toggle('hidden');
};

// Handle logout
const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  console.log('Logged out, tokens cleared');
  window.location.href = '/login.html'; // Adjust to your login page path
};

// Toggle change password modal
const toggleChangePasswordModal = () => {
  const modal = document.getElementById('change-password');
  modal.classList.toggle('hidden');
};

// Toggle password visibility
const togglePasswordVisibility = (inputId, iconId) => {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('ri-eye-line', 'ri-eye-off-line');
  } else {
    input.type = 'password';
    icon.classList.replace('ri-eye-off-line', 'ri-eye-line');
  }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display user data
  displayUserData();

  // Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  menuToggle.addEventListener('click', toggleMenu);

  // Dropdown menu options
  const changePasswordOption = document.getElementById('change-password-option');
  const logoutOption = document.getElementById('logout-option');
  changePasswordOption.addEventListener('click', toggleChangePasswordModal);
  logoutOption.addEventListener('click', handleLogout);

  // Change password modal close button
  const closePasswordIcon = document.getElementById('close-password-icon');
  closePasswordIcon.addEventListener('click', toggleChangePasswordModal);

  // Password visibility toggles
  document.getElementById('toggle-old-password').addEventListener('click', () =>
    togglePasswordVisibility('old-password', 'old-eye-icon')
  );
  document.getElementById('toggle-new-password').addEventListener('click', () =>
    togglePasswordVisibility('new-password', 'new-eye-icon')
  );
  document.getElementById('toggle-confirm-password').addEventListener('click', () =>
    togglePasswordVisibility('confirm-password', 'confirm-eye-icon')
  );

  // Change password form submission (placeholder)
  const passwordForm = document.getElementById('password-form');
  passwordForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }

    console.log('Change password submitted:', { oldPassword, newPassword });
    // TODO: Implement fetchWithAuth call to a change-password endpoint
    // Example:
    // try {
    //   await fetchWithAuth('change-password/', {
    //     method: 'POST',
    //     body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    //   });
    //   alert('Password changed successfully!');
    //   toggleChangePasswordModal();
    // } catch (error) {
    //   alert(`Failed to change password: ${error.message}`);
    // }
  });
});