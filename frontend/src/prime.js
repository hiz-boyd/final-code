// Toggle the mobile menu visibility
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Add an event listener for the menu toggle button
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('show'); // Toggle the 'show' class to display/hide the menu
});

// Close the mobile menu after clicking a link
const menuLinks = document.querySelectorAll('#mobile-menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('show'); // Hide the menu when a link is clicked
  });
});
