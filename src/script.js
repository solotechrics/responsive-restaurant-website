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

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll("#mobile-menu a");
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    hamburgerIcon.classList.remove("opacity-0");
    closeIcon.classList.add("opacity-0");
    hamburgerIcon.classList.remove("rotate-90");
    closeIcon.classList.remove("rotate-90");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href !== "") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});


// Carousel
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  const slides = carousel.children;
  const slideCount = slides.length;
  if (slideCount === 0) return;

  let index = 1; // Start at the first real slide
  let autoPlayInterval;

  // Initialize position
  carousel.style.transform = `translateX(-${index * 100}%)`;

  function moveToSlide(i) {
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${i * 100}%)`;
    index = i;
  }

  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      moveToSlide(index + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      moveToSlide(index - 1);
    });
  }

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

  // Auto-play carousel
  autoPlayInterval = setInterval(() => {
    moveToSlide(index + 1);
  }, 5000);

  // Pause on hover
  const carouselParent = carousel.parentElement;
  if (carouselParent) {
    carouselParent.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    carouselParent.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(() => {
        moveToSlide(index + 1);
      }, 5000);
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const wrappers = document.querySelectorAll(".tab-wrapper");

  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // stop any default jump/submit

      const tabId = button.getAttribute("data-tab");

      // Hide all tabs
      wrappers.forEach(wrapper => {
        wrapper.classList.add("hidden");
        const content = wrapper.querySelector("div");
        if (content) {
          content.classList.remove("opacity-100", "scale-100");
          content.classList.add("opacity-0", "scale-95");
          
          // Remove animation classes from menu cards
          const menuCards = wrapper.querySelectorAll(".menu-cards");
          menuCards.forEach(card => {
            card.classList.remove("menu-card-enter");
          });
        }
      });

      // Show selected tab
      const activeWrapper = document.getElementById(tabId);
      if (activeWrapper) {
        activeWrapper.classList.remove("hidden");

        // Animate fade + scale in
        const activeContent = activeWrapper.querySelector("div");
        if (activeContent) {
          setTimeout(() => {
            activeContent.classList.remove("opacity-0", "scale-95");
            activeContent.classList.add("opacity-100", "scale-100");
            
            // Add zoom/ease animation to each menu card with stagger effect
            const menuCards = activeWrapper.querySelectorAll(".menu-cards");
            menuCards.forEach((card, index) => {
              // Remove any existing animation class
              card.classList.remove("menu-card-enter");
              // Reset to initial state
              card.style.opacity = "0";
              card.style.transform = "scale(0.8) translateY(20px)";
              
              // Force reflow to ensure reset is applied
              void card.offsetWidth;
              
              // Add animation class with stagger
              setTimeout(() => {
                card.classList.add("menu-card-enter");
                card.style.opacity = "";
                card.style.transform = "";
              }, index * 50); // Stagger animation by 50ms per card
            });
          }, 10);
        }
      }

      // Reset all buttons
      buttons.forEach(btn => {
        btn.classList.remove("bg-yellow-100", "text-black");
        btn.classList.add("bg-gray-800", "text-white");
      });

      // Highlight selected button
      button.classList.remove("bg-gray-800", "text-white");
      button.classList.add("bg-yellow-100", "text-black");
    });
  });

  // Trigger animation for initial "all" tab on page load
  setTimeout(() => {
    const allTab = document.getElementById("all");
    if (allTab && !allTab.classList.contains("hidden")) {
      const menuCards = allTab.querySelectorAll(".menu-cards");
      menuCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("menu-card-enter");
        }, index * 50);
      });
    }
  }, 100);
});

// Form handling
const bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your reservation request has been received. We will contact you shortly to confirm.");
    bookingForm.reset();
  });
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
}

// Active navigation link highlighting on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu-inner a");

function highlightActiveSection() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightActiveSection);