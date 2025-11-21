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


// Carousel
const carousel = document.getElementById('carousel');
const slides = carousel.children;
const slideCount = slides.length;
let index = 1; // Start at the first real slide

// Initialize position
carousel.style.transform = `translateX(-${index * 100}%)`;

function moveToSlide(i) {
  carousel.style.transition = 'transform 0.5s ease-in-out';
  carousel.style.transform = `translateX(-${i * 100}%)`;
  index = i;
}

document.getElementById('next').addEventListener('click', () => {
  moveToSlide(index + 1);
});

document.getElementById('prev').addEventListener('click', () => {
  moveToSlide(index - 1);
});

// Looping logic
carousel.addEventListener('transitionend', () => {
  if (index === slideCount - 1) {
    // Jump to first real slide without animation
    carousel.style.transition = 'none';
    index = 1;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  } else if (index === 0) {
    // Jump to last real slide
    carousel.style.transition = 'none';
    index = slideCount - 2;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }
});


setInterval(() => {
  index = (index + 1) % slides.length;
  carousel.style.transform = `translateX(-${index * 100}%)`;
}, 5000); // every 3 seconds


