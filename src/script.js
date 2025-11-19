const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const hamburgerIcon = document.getElementById("hamburger-icon");
const closeIcon = document.getElementById("close-icon");

menuBtn.addEventListener("click", () => {

  // Show/Hide mobile menu
  mobileMenu.classList.toggle("hidden");

  // Toggle icons visibility
  hamburgerIcon.classList.toggle("opacity-0");
  closeIcon.classList.toggle("opacity-0");

  // Rotate animation
  hamburgerIcon.classList.toggle("rotate-90");
  closeIcon.classList.toggle("rotate-90");
});
