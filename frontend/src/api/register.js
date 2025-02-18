import { register } from './api.js';

const handleRegister = async (event) => {
  event.preventDefault();
  console.log('Form submission intercepted');

  // Get form data
  const formData = new FormData(event.target);
  const userData = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm-password'), // Match backend field name
    country: formData.get('country'),
    phone_number: formData.get('phone'), // Match backend field name
    first_name: formData.get('first-name'), // Match backend field name
    last_name: formData.get('last-name'), // Match backend field name
  };

  console.log('Form data:', userData);

  try {
    console.log('Calling register API...');
    const response = await register(userData);
    console.log('Registration successful:', response);
    alert('Registration successful!');
    window.location.href = '/login.html'; // Redirect to login page
  } catch (error) {
    console.error('Registration failed:', error);
    alert(`Registration failed: ${error.message}`);
  }
};


const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', handleRegister);
  console.log('Event listener attached to the form');
} else {
  console.error('Register form not found');
}





// const registerForm = document.getElementById('register-form');

// if (registerForm) {
//   registerForm.addEventListener('submit', handleRegister);
//   console.log('Event listener attached to the form');
// } else {
//   console.error('Register form not found');
// }

// function handleRegister(event) {
//   event.preventDefault(); // Prevent default form submission

 
//   const submitButton = event.target.querySelector('button[type="submit"]');
//   const buttonText = submitButton.querySelector('.button-text');
//   const buttonSpinner = submitButton.querySelector('.button-spinner');

//   if (buttonText && buttonSpinner) {
    
//     buttonText.textContent = 'Processing...';
//     buttonSpinner.classList.remove('hidden');
//   } else {
//     console.error('Button text or spinner not found');
//   }


//   setTimeout(() => {
//     buttonText.textContent = 'Register';
//     buttonSpinner.classList.add('hidden');
//   }, 2000);
// }
