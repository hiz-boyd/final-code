const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

menuToggle.addEventListener("click", () => {
  // Toggle the mobile menu visibility
  mobileMenu.classList.toggle("show");

  // Toggle the icons
  menuToggle.classList.toggle("active");

  // Prevent scrolling when the menu is open
  if (mobileMenu.classList.contains("show")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
});