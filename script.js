// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('open');
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
    });
}

// Simple form validation
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        if (!name || !email || !message) {
            e.preventDefault();
            form.classList.add('error');
            setTimeout(() => form.classList.remove('error'), 1200);
        }
    });
}

// Fade-in on scroll for premium sections
const fadeSections = document.querySelectorAll('.premium-about, .premium-services');
const fadeInObserver = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
fadeSections.forEach(section => fadeInObserver.observe(section));

// Fade-in on scroll for premium sections (continued)
const moreFadeSections = document.querySelectorAll('.premium-why, .premium-examples, .premium-contact');
moreFadeSections.forEach(section => fadeInObserver.observe(section)); 